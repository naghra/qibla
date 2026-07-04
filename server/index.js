import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function fetchCountryFromIpWho(req) {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null;
    const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : 'https://ipwho.is/';
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success === false) return null;
    return typeof data.country_code === 'string' ? data.country_code : null;
  } catch {
    return null;
  }
}

async function handleGeo(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  let countryCode = await fetchCountryFromIpWho(req);

  res.writeHead(200);
  res.end(JSON.stringify({
    countryCode: countryCode ? countryCode.toUpperCase() : null,
  }));
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
  const full = path.join(DIST_DIR, normalized);
  if (!full.startsWith(DIST_DIR)) return null;
  return full;
}

async function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME_TYPES[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', type);
  if (ext === '.html') {
    res.setHeader('Cache-Control', 'no-cache');
  } else if (['.js', '.css', '.webp', '.svg', '.png', '.jpg', '.jpeg', '.woff', '.woff2'].includes(ext)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  createReadStream(filePath).pipe(res);
}

async function serveSpa(req, res) {
  const indexPath = path.join(DIST_DIR, 'index.html');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  createReadStream(indexPath).pipe(res);
}

async function handleRequest(req, res) {
  try {
    const urlPath = req.url || '/';

    if (urlPath === '/api/geo' || urlPath.startsWith('/api/geo?')) {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
      }
      await handleGeo(req, res);
      return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      res.end('Method Not Allowed');
      return;
    }

    const filePath = safePath(urlPath === '/' ? '/index.html' : urlPath);

    if (filePath) {
      try {
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          await serveFile(res, filePath);
          return;
        }
      } catch {
        // fall through to SPA
      }
    }

    await serveSpa(req, res);
  } catch (err) {
    console.error('Request error:', err);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
}

const server = createServer((req, res) => {
  void handleRequest(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Serving static files from ${DIST_DIR}`);
});
