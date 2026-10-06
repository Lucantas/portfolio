import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, posix } from 'node:path';
import { build, REPO_ROOT } from './build.mjs';
import { basePath, loadContent } from './lib/content.mjs';

const P = loadContent(REPO_ROOT);
const base = basePath(P.SITE);
let outDir;
let paths;

function read(path) {
  return readFileSync(join(outDir, path), 'utf8');
}

function page(path) {
  return read(`${path}index.html`);
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1] : null;
}

before(() => {
  outDir = mkdtempSync(join(tmpdir(), 'portfolio-build-'));
  paths = build({ outDir });
});

test('generates home, work list and one page per visible project in both languages', () => {
  const slugs = P.visibleJobs('en').map((j) => j.slug);
  const expected = ['', 'work/', 'pt/', 'pt/trabalhos/']
    .concat(slugs.map((s) => `work/${s}/`), slugs.map((s) => `pt/trabalhos/${s}/`));

  assert.deepEqual([...paths].sort(), expected.sort());
  expected.forEach((p) => assert.ok(existsSync(join(outDir, p, 'index.html')), p));
});

test('hidden projects get no page', () => {
  const hidden = P.JOBS.filter((j) => j.hidden).map((j) => j.slug);

  hidden.forEach((slug) => assert.ok(!paths.some((p) => p.includes(slug)), slug));
});

test('every page has its own canonical, hreflang pair and x-default', () => {
  for (const path of paths) {
    const html = page(path);

    assert.equal(attr(html, /<link rel="canonical" href="([^"]+)">/), P.SITE.url + path);
    assert.match(html, /hreflang="en" href="[^"]+"/);
    assert.match(html, /hreflang="pt-BR" href="[^"]+"/);
    assert.match(html, /hreflang="x-default" href="[^"]+"/);
  }
});

test('every page has a single h1, a title and a description of search-friendly length', () => {
  for (const path of paths) {
    const html = page(path);
    const description = attr(html, /<meta name="description" content="([^"]+)">/);

    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.ok(attr(html, /<title>([^<]+)<\/title>/), path);
    assert.ok(description.length >= 50 && description.length <= 200, `${path}: ${description.length}`);
  }
});

test('every page carries Open Graph tags with an absolute image', () => {
  for (const path of paths) {
    const html = page(path);
    const image = attr(html, /<meta property="og:image" content="([^"]+)">/);

    assert.ok(image.startsWith(P.SITE.url), path);
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  }
});

test('JSON-LD parses and describes the person on every page', () => {
  for (const path of paths) {
    const raw = attr(page(path), /<script type="application\/ld\+json">(.+?)<\/script>/s);
    const data = JSON.parse(raw);
    const person = data['@graph'].find((n) => n['@type'] === 'Person');

    assert.equal(person.name, P.SITE.name);
    assert.ok(person.sameAs.includes(P.SITE.github));
  }
});

test('project page ships the full write-up in the HTML, not only via JavaScript', () => {
  const job = P.visibleJobs('pt').find((j) => j.slug === 'diariosg');
  const html = page('pt/trabalhos/diariosg/');
  const plain = html.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

  assert.ok(plain.includes(job.body1));
  assert.ok(plain.includes(job.body3));
  assert.match(html, /<h1 id="jobTitle">Diário SG<\/h1>/);
  assert.match(html, /<html lang="pt-BR"/);
});

test('home page lists the projects as crawlable links', () => {
  const html = page('');

  P.visibleJobs('en').slice(0, 3).forEach((job) => assert.ok(html.includes(`href="${base}work/${job.slug}/"`), job.slug));
});

test('images declare width and height', () => {
  for (const path of paths) {
    const tags = page(path).match(/<img [^>]+>/g) || [];

    tags.forEach((tag) => assert.match(tag, /width="\d+" height="\d+"/, `${path}: ${tag}`));
  }
});

test('every relative link and asset resolves to a file', () => {
  for (const path of paths) {
    const refs = [...page(path).matchAll(/(?:href|src)="([^"#]*)(?:#[^"]*)?"/g)].map((m) => m[1]);

    refs.filter((ref) => ref && !/^[a-z]+:/i.test(ref)).forEach((ref) => {
      assert.ok(ref.startsWith(base), `${path} -> ${ref} is not under ${base}`);
      const target = posix.normalize(ref.slice(base.length) || '.');
      const file = target.endsWith('/') || target === '.' ? join(target, 'index.html') : target;
      assert.ok(existsSync(join(outDir, file)) || existsSync(join(REPO_ROOT, file)), `${path} -> ${ref}`);
    });
  }
});

test('sitemap lists every page with alternates', () => {
  const xml = read('sitemap.xml');

  paths.forEach((p) => assert.ok(xml.includes(`<loc>${P.SITE.url}${p}</loc>`), p));
  assert.equal((xml.match(/<url>/g) || []).length, paths.length);
});

test('robots.txt points to the sitemap', () => {
  assert.match(read('robots.txt'), new RegExp(`Sitemap: ${P.SITE.url}sitemap.xml`));
});

test('llms.txt summarises who Lucas is and links every project', () => {
  const txt = read('llms.txt');

  assert.match(txt, /^# Lucas Dantas\n\n> /);
  P.visibleJobs('en').forEach((job) => assert.ok(txt.includes(`](${P.SITE.url}work/${job.slug}/)`), job.slug));
});
