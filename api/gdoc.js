import { fetchGoogleDoc } from './_gdoc-core.js';

// Vercel serverless function: GET /api/gdoc?url=<published Google Doc URL>
export default async function handler(req, res) {
  try {
    const html = await fetchGoogleDoc(req.query.url);
    // Cache at Vercel's edge for 5 minutes, then refresh in the background.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}
