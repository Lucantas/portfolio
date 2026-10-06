import { LANGS, counterpartPath, escapeHtml as e } from './content.mjs';

const HREFLANG = { en: 'en', pt: 'pt-BR' };

export function absoluteUrl(site, path) {
  return site.url + path;
}

function personNode(P, lang) {
  const { SITE } = P;
  const node = {
    '@type': 'Person',
    '@id': `${SITE.url}#person`,
    name: SITE.name,
    url: SITE.url,
    jobTitle: P.DICT[lang].jobTitle,
    description: P.DICT[lang].aboutP1,
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: P.GEAR.map((g) => g.name).concat(['.NET', 'Next.js', 'React Native', 'Terraform', 'Google Cloud']),
    address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country }
  };
  if (SITE.avatar) node.image = absoluteUrl(SITE, SITE.avatar);
  return node;
}

function breadcrumb(P, page) {
  const { SITE } = P;
  const dict = P.DICT[page.lang];
  const routes = P.ROUTES[page.lang];
  const items = [
    { name: dict.tabHome, url: absoluteUrl(SITE, routes.home) },
    { name: dict.navWorks, url: absoluteUrl(SITE, routes.works) }
  ];
  if (page.job) items.push({ name: page.job.title, url: absoluteUrl(SITE, page.path) });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url }))
  };
}

function projectNode(P, page, url) {
  const { SITE } = P;
  const job = page.job;
  const node = {
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: job.title,
    headline: `${job.title}: ${job.subtitle}`,
    description: job.desc,
    abstract: [job.body1, job.body2, job.body3].filter(Boolean).join(' '),
    url,
    inLanguage: HREFLANG[page.lang],
    dateCreated: job.year,
    keywords: job.stack.split(' · '),
    image: job.images.map((src) => absoluteUrl(SITE, src)),
    creator: { '@id': `${SITE.url}#person` }
  };
  const external = [job.live, job.repo].filter(Boolean);
  if (external.length) node.sameAs = external;
  return node;
}

export function jsonLd(P, page) {
  const { SITE } = P;
  const url = absoluteUrl(SITE, page.path);
  const lang = HREFLANG[page.lang];
  const graph = [personNode(P, page.lang)];

  if (page.view === 'home') {
    graph.push(
      { '@type': 'WebSite', '@id': `${SITE.url}#website`, url: SITE.url, name: SITE.name, inLanguage: LANGS.map((l) => HREFLANG[l]), author: { '@id': `${SITE.url}#person` } },
      { '@type': 'ProfilePage', '@id': `${url}#page`, url, name: P.DICT[page.lang].metaTitleHome, inLanguage: lang, mainEntity: { '@id': `${SITE.url}#person` } }
    );
  } else if (page.job) {
    graph.push(projectNode(P, page, url), breadcrumb(P, page));
  } else {
    const jobs = P.visibleJobs(page.lang);
    graph.push(
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: P.DICT[page.lang].metaTitleWorks,
        inLanguage: lang,
        author: { '@id': `${SITE.url}#person` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: jobs.map((job, i) => ({ '@type': 'ListItem', position: i + 1, name: job.title, url: absoluteUrl(SITE, P.jobPath(page.lang, job.slug)) }))
        }
      },
      breadcrumb(P, page)
    );
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  return json.replace(/</g, '\\u003c');
}

export function pageMeta(P, page) {
  const dict = P.DICT[page.lang];
  if (page.job) return { title: P.jobPageTitle(page.lang, page.job), description: page.job.desc };
  if (page.view === 'works') return { title: dict.metaTitleWorks, description: dict.metaDescWorks };
  return { title: dict.metaTitleHome, description: dict.metaDescHome };
}

export function headTags(P, page, root, ogImage) {
  const { SITE, ROUTES } = P;
  const { title, description } = pageMeta(P, page);
  const url = absoluteUrl(SITE, page.path);
  const otherLang = LANGS.find((l) => l !== page.lang);
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${e(absoluteUrl(SITE, counterpartPath(P, page, l)))}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${e(absoluteUrl(SITE, counterpartPath(P, page, 'en')))}">`);
  const ogAlt = page.job ? `${page.job.title}: ${page.job.ph[0]}` : title;

  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${e(title)}</title>`,
    `<meta name="description" content="${e(description)}">`,
    `<meta name="author" content="${e(SITE.name)}">`,
    `<link rel="canonical" href="${e(url)}">`,
    ...alternates,
    `<meta property="og:type" content="${page.view === 'home' ? 'profile' : 'website'}">`,
    `<meta property="og:site_name" content="${e(SITE.name)}">`,
    `<meta property="og:title" content="${e(title)}">`,
    `<meta property="og:description" content="${e(description)}">`,
    `<meta property="og:url" content="${e(url)}">`,
    `<meta property="og:locale" content="${ROUTES[page.lang].locale}">`,
    `<meta property="og:locale:alternate" content="${ROUTES[otherLang].locale}">`,
    `<meta property="og:image" content="${e(absoluteUrl(SITE, ogImage.src))}">`,
    `<meta property="og:image:width" content="${ogImage.width}">`,
    `<meta property="og:image:height" content="${ogImage.height}">`,
    `<meta property="og:image:alt" content="${e(ogAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="theme-color" content="#F6F1E7">',
    `<link rel="icon" href="${root}imgs/favicon.ico">`,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">',
    `<link rel="stylesheet" href="${root}css/site.css">`,
    `<script type="application/ld+json">${jsonLd(P, page)}</script>`
  ].join('\n');
}
