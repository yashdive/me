import { useEffect, useState } from 'react';
import { marked } from 'marked';

// Every .md file in /notes becomes a note. The file name is the URL slug.
// Each file starts with a small header:
//   ---
//   title: My title
//   date: 2026-11-17
//   gdoc: https://docs.google.com/document/d/e/.../pub   (optional: show a published Google Doc)
//   draft: true        (optional: only visible while running `npm run dev`)
//   ---
// With `gdoc`, the doc's content is shown live and the rest of the file is ignored.
const files = import.meta.glob('../notes/*.md', { query: '?raw', import: 'default', eager: true });

function parseNote(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const meta = {};
  let body = raw;

  if (match) {
    body = match[2];
    match[1].split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
  }

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    draft: meta.draft === 'true',
    gdoc: meta.gdoc || '',
    html: meta.gdoc ? '' : marked.parse(body),
  };
}

function GoogleDocBody({ url }) {
  const [state, setState] = useState({ status: 'loading', html: '' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', html: '' });
    fetch(`/api/gdoc?url=${encodeURIComponent(url)}`)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(res.statusText))))
      .then((html) => !cancelled && setState({ status: 'ready', html }))
      .catch(() => !cancelled && setState({ status: 'error', html: '' }));
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (state.status === 'loading') {
    return <p className="note-prose note-meta">Loading…</p>;
  }
  if (state.status === 'error') {
    return (
      <p className="note-prose">
        Couldn&apos;t load this note right now.{' '}
        <a href={url} target="_blank" rel="noreferrer">
          Read it on Google Docs
        </a>
        .
      </p>
    );
  }
  return <div className="note-prose" dangerouslySetInnerHTML={{ __html: state.html }} />;
}

export const notes = Object.entries(files)
  .map(([path, raw]) => parseNote(path, raw))
  .filter((note) => import.meta.env.DEV || !note.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const formatDate = (date) => {
  if (!date) return '';
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Note content is the user's own writing (Markdown in the repo, or their own Google Doc,
// cleaned by api/_gdoc-core.js), so rendering it as HTML is intentional.
export default function Notes({ slug }) {
  const note = slug ? notes.find((n) => n.slug === slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen w-full app-root px-4 pb-20 pt-12 md:px-10">
      <div className="mx-auto max-w-[680px]">
        <nav className="mb-14 flex items-center justify-between">
          <a href="#home" className="heading-4 text-primary lowercase tracking-tight hover-soft">
            yash dive
          </a>
          {note ? (
            <a href="#notes" className="body-text text-muted hover-soft">
              ← all notes
            </a>
          ) : null}
        </nav>

        {note ? (
          <article>
            <p className="note-meta">
              {formatDate(note.date)}
              {note.draft ? ' · draft' : ''}
            </p>
            <h1 className="note-title">{note.title}</h1>
            {note.gdoc ? (
              <GoogleDocBody url={note.gdoc} />
            ) : (
              <div className="note-prose" dangerouslySetInnerHTML={{ __html: note.html }} />
            )}
          </article>
        ) : slug ? (
          <p className="body-text text-muted">
            Couldn&apos;t find that note. <a href="#notes" className="underline">See all notes</a>
          </p>
        ) : (
          <>
            <h1 className="note-title">notes</h1>
            <p className="note-intro">
              Things I studied, liked, or couldn&apos;t stop thinking about, explained in my own
              words (and sometimes drawn).
            </p>

            {notes.length === 0 ? (
              <p className="body-text text-muted">Nothing here yet.</p>
            ) : (
              <ul className="note-list">
                {notes.map((n) => (
                  <li key={n.slug}>
                    <a href={`#notes/${n.slug}`} className="note-list-item">
                      <span className="note-list-title">
                        {n.title}
                        {n.draft ? <span className="note-meta"> · draft</span> : null}
                      </span>
                      <span className="note-meta">{formatDate(n.date)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
