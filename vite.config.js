import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fetchGoogleDoc } from './api/_gdoc-core.js';

// In production, /api/gdoc is a Vercel function (api/gdoc.js).
// This serves the same thing during `npm run dev`.
const googleDocDevApi = {
  name: 'google-doc-dev-api',
  configureServer(server) {
    server.middlewares.use('/api/gdoc', async (req, res) => {
      const url = new URL(req.url, 'http://localhost').searchParams.get('url');
      try {
        const html = await fetchGoogleDoc(url);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
      } catch (error) {
        res.statusCode = error.status || 500;
        res.end(error.message);
      }
    });
  },
};

export default defineConfig({
  plugins: [react(), googleDocDevApi],
});
