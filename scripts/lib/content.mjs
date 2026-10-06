import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

export const LANGS = ['en', 'pt'];

export function loadContent(repoRoot) {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(repoRoot, 'js/content.js'), 'utf8'), sandbox);
  return sandbox.PORTFOLIO;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function webpSize(file) {
  const buf = readFileSync(file);
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  throw new Error(`Unsupported WebP chunk ${chunk} in ${file}`);
}

export function ogImageFor(repoRoot, site, slug) {
  const projectImage = `imgs/og/${slug}.jpg`;
  if (slug && existsSync(join(repoRoot, projectImage))) return { src: projectImage, width: 1200, height: 630 };
  return site.ogImage;
}

export function buildPages(P) {
  const pages = [];
  for (const lang of LANGS) {
    const routes = P.ROUTES[lang];
    pages.push({ lang, view: 'home', job: null, path: routes.home });
    pages.push({ lang, view: 'works', job: null, path: routes.works });
    for (const job of P.visibleJobs(lang)) {
      pages.push({ lang, view: 'works', job, path: P.jobPath(lang, job.slug) });
    }
  }
  return pages;
}

export function counterpartPath(P, page, lang) {
  if (page.job) return P.jobPath(lang, page.job.slug);
  return P.ROUTES[lang][page.view];
}

export function basePath(site) {
  return new URL(site.url).pathname;
}
