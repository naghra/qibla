import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

async function loadDotEnv() {
  try {
    const content = await readFile(path.join(rootDir, '.env'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env optional
  }
}

await loadDotEnv();

const siteOrigin = (process.env.VITE_SITE_ORIGIN || '').replace(/\/$/, '');

const lines = [
  'User-agent: *',
  'Allow: /',
  '',
];

if (siteOrigin) {
  lines.push(`Sitemap: ${siteOrigin}/sitemap.xml`);
  lines.push('');
}

await writeFile(path.join(distDir, 'robots.txt'), lines.join('\n'), 'utf8');
console.log(`Wrote dist/robots.txt${siteOrigin ? ` (sitemap: ${siteOrigin})` : ''}`);
