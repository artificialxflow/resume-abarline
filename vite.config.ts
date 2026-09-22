import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(rootDir, 'data');

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain; charset=utf-8',
};

function attachDataMiddleware(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((req, res, next) => {
    if (!req.url || !req.url.startsWith('/data/')) return next();
    const rel = decodeURIComponent(req.url.slice('/data/'.length).split('?')[0]);
    const file = path.resolve(dataDir, rel);
    const safeRel = path.relative(dataDir, file);
    if (safeRel.startsWith('..') || path.isAbsolute(safeRel)) return next();
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
    const stat = fs.statSync(file);
    res.statusCode = 200;
    res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Content-Length', String(stat.size));
    res.setHeader('Cache-Control', 'public, max-age=3600');
    fs.createReadStream(file).pipe(res);
  });
}

function dataStaticPlugin() {
  return {
    name: 'abarline-data-static',
    configureServer(server: ViteDevServer) {
      attachDataMiddleware(server);
    },
    configurePreviewServer(server: PreviewServer) {
      attachDataMiddleware(server);
    },
    writeBundle() {
      const outDir = path.resolve(rootDir, 'dist', 'data');
      fs.cpSync(dataDir, outDir, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), dataStaticPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
