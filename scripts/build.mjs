import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { basePath, buildPages, loadContent, ogImageFor, webpSize } from './lib/content.mjs';
import { headTags } from './lib/seo.mjs';
import { renderPage } from './lib/page.mjs';
import { llmsTxt, robotsTxt, sitemapXml } from './lib/files.mjs';

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED_DIRS = ['work', 'pt'];

function imageSizer(repoRoot) {
  const cache = new Map();
  return (src) => {
    if (!cache.has(src)) cache.set(src, webpSize(join(repoRoot, src)));
    return cache.get(src);
  };
}

function write(outDir, path, content) {
  const file = join(outDir, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

export function build({ repoRoot = REPO_ROOT, outDir = REPO_ROOT } = {}) {
  const P = loadContent(repoRoot);
  const pages = buildPages(P);
  const size = imageSizer(repoRoot);

  GENERATED_DIRS.forEach((dir) => rmSync(join(outDir, dir), { recursive: true, force: true }));

  const root = basePath(P.SITE);
  for (const page of pages) {
    const head = headTags(P, page, root, ogImageFor(repoRoot, P.SITE, page.job && page.job.slug));
    write(outDir, `${page.path}index.html`, renderPage(P, page, { root, head, size }));
  }
  write(outDir, 'sitemap.xml', sitemapXml(P, pages));
  write(outDir, 'robots.txt', robotsTxt(P));
  write(outDir, 'llms.txt', llmsTxt(P));
  return pages.map((p) => p.path);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const paths = build();
  console.log(`Built ${paths.length} pages + sitemap.xml, robots.txt, llms.txt`);
}
