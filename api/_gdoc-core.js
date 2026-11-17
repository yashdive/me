// Fetches a Google Doc that was shared via File → Share → Publish to web,
// and turns it into clean HTML that the site styles itself.
// Only published-doc URLs are accepted, so this can't be used to fetch arbitrary pages.

const PUBLISHED_DOC = /^https:\/\/docs\.google\.com\/document\/d\/e\/[\w-]+\/pub$/;

export function normalizeDocUrl(input) {
  if (typeof input !== 'string') return null;
  const url = input.trim().split('?')[0].replace(/\/pubhtml$/, '/pub');
  return PUBLISHED_DOC.test(url) ? url : null;
}

function classStyles(css) {
  const bold = new Set();
  const italic = new Set();
  for (const [, name, rules] of css.matchAll(/\.([\w-]+)\{([^}]*)\}/g)) {
    if (/font-weight:\s*(700|bold)/.test(rules)) bold.add(name);
    if (/font-style:\s*italic/.test(rules)) italic.add(name);
  }
  return { bold, italic };
}

function unwrapGoogleLink(href) {
  try {
    const url = new URL(href.replace(/&amp;/g, '&'));
    if (url.hostname === 'www.google.com' && url.pathname === '/url') {
      return url.searchParams.get('q') || href;
    }
  } catch {
    // keep original
  }
  return href;
}

export function cleanGoogleDocHtml(raw) {
  const contentsMatch = raw.match(/<div id="contents">([\s\S]*)<\/div>\s*<div id="footer"/) ||
    raw.match(/<body[^>]*>([\s\S]*)<\/body>/);
  let html = contentsMatch ? contentsMatch[1] : raw;

  const css = (html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || []).join('\n');
  const { bold, italic } = classStyles(css);

  // Turn styled spans into semantic tags before classes are removed.
  html = html.replace(/<span([^>]*)>([\s\S]*?)<\/span>/g, (_, attrs, inner) => {
    const classes = (attrs.match(/class="([^"]*)"/) || [, ''])[1].split(/\s+/);
    let out = inner;
    if (classes.some((c) => italic.has(c))) out = `<em>${out}</em>`;
    if (classes.some((c) => bold.has(c))) out = `<strong>${out}</strong>`;
    return out;
  });

  html = html
    // The page already shows the note's title, so drop Google's Title/Subtitle paragraphs.
    .replace(/<p[^>]*class="[^"]*\b(title|subtitle)\b[^"]*"[^>]*>[\s\S]*?<\/p>/g, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\s(class|style|id|dir|width|height)="[^"]*"/g, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/href="([^"]*)"/g, (_, href) => {
      const real = unwrapGoogleLink(href);
      if (/^\s*javascript:/i.test(real)) return 'href="#"';
      return `href="${real.replace(/"/g, '&quot;')}" target="_blank" rel="noreferrer"`;
    })
    // Google wraps images in fixed-size spans and pads docs with empty paragraphs.
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, '')
    .replace(/<a id="[^"]*"><\/a>/g, '');

  return html.trim();
}

export async function fetchGoogleDoc(input) {
  const url = normalizeDocUrl(input);
  if (!url) {
    const error = new Error('Not a published Google Doc URL');
    error.status = 400;
    throw error;
  }
  const response = await fetch(url, { headers: { 'User-Agent': 'portfolio-notes' } });
  if (!response.ok) {
    const error = new Error(`Google Docs returned ${response.status}`);
    error.status = 502;
    throw error;
  }
  return cleanGoogleDocHtml(await response.text());
}
