import { LANGS, counterpartPath, escapeHtml as e } from './content.mjs';

function href(root, path) {
  return root + path;
}

function img(ctx, src, alt, eager) {
  const { width, height } = ctx.size(src);
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<img src="${ctx.root}${e(src)}" alt="${e(alt)}" width="${width}" height="${height}" ${loading}>`;
}

function slot(ctx, job, i, eager) {
  const label = job.ph[i];
  const inner = job.images[i] ? img(ctx, job.images[i], `${job.title}: ${label}`, eager) : `<span>${e(label)}</span>`;
  return `<div class="slot">${inner}</div>`;
}

function postBar(ctx, job) {
  return `<div class="post-bar"><span class="post-avatar" aria-hidden="true">LD</span><span class="post-handle">${e(ctx.P.SITE.handle)}</span><span class="post-year">${e(job.year)}</span></div>`;
}

function jobCard(ctx, job, opts) {
  const heading = opts.heading || 'h3';
  const cover = `<div class="post-cover">${slot(ctx, job, 0, false)}</div>`;
  const body = [
    '<div class="post-body">',
    `<${heading}>${e(job.title)}</${heading}>`,
    `<p class="post-sub">${e(job.subtitle)}</p>`,
    opts.withDesc ? `<p class="post-desc">${e(job.desc)}</p>` : '',
    `<a class="post-open" href="${href(ctx.root, ctx.P.jobPath(ctx.lang, job.slug))}">${e(ctx.dict.openJob)}</a>`,
    '</div>'
  ].join('');
  const cls = `post clickable${opts.featured ? ' featured' : ''}`;
  const inner = opts.featured
    ? `${cover}<div class="post-col">${postBar(ctx, job)}${body}</div>`
    : `${postBar(ctx, job)}${cover}${body}`;
  return `<article class="${cls}" data-slug="${e(job.slug)}">${inner}</article>`;
}

function kicker(text) {
  return text.split(' · ').map((part) => `<span class="kicker-part"><span class="kicker-mark" aria-hidden="true"></span>${e(part)}</span>`).join('');
}

function header(ctx) {
  const { dict, root, routes, page } = ctx;
  const langLinks = LANGS.map((l) => {
    const active = l === ctx.lang;
    const label = ctx.P.DICT[l].langName;
    return `<a href="${href(root, counterpartPath(ctx.P, page, l))}" hreflang="${ctx.P.ROUTES[l].htmlLang}" lang="${ctx.P.ROUTES[l].htmlLang}" aria-label="${e(label)}" data-lang-link="${l}"${active ? ' class="active" aria-current="true"' : ''}>${l.toUpperCase()}</a>`;
  }).join('\n        ');
  return `<header class="site-header">
  <nav class="site-nav" aria-label="Main">
    <a href="${href(root, routes.home)}" class="logo"><span class="logo-mark" aria-hidden="true"></span>LUCAS DANTAS</a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="${href(root, routes.works)}" class="nav-link${page.view === 'works' ? ' active' : ''}">${e(dict.navWorks)}</a>
        <a href="${href(root, routes.home)}#about" class="nav-link">${e(dict.navAbout)}</a>
        <a href="${href(root, routes.home)}#contact" class="nav-link">${e(dict.navContact)}</a>
      </div>
      <div class="lang-seg" role="group" aria-label="Language">
        ${langLinks}
      </div>
    </div>
  </nav>
</header>`;
}

function contactLinks(ctx) {
  const { SITE } = ctx.P;
  return `<a href="${SITE.github}" target="_blank" rel="noopener me">github ↗</a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener me">linkedin ↗</a>`;
}

function avatar(ctx) {
  const src = ctx.P.SITE.avatar;
  if (!src) return '<div class="avatar" hidden></div>';
  return `<div class="avatar"><div class="slot">${img(ctx, src, ctx.P.SITE.name, true)}</div></div>`;
}

function inventory(ctx) {
  return ctx.P.GEAR.map((g, i) => `<div class="item" data-gear="${i}"><span class="item-name">${e(g.name)}</span><span class="item-lv">LV ${g.lv}</span><span class="item-slot">${e(ctx.dict.slots[g.kind])}</span></div>`).join('\n          ');
}

function homeMain(ctx) {
  const { dict, root, routes, jobs } = ctx;
  const featured = jobs.find((j) => j.slug === ctx.P.SITE.featured) || jobs[0];
  const secondary = jobs.filter((j) => j.slug !== featured.slug).slice(0, 2);
  const worksHref = href(root, routes.works);
  return `<section id="hero" class="wrap hero">
    <div class="hero-row">
      ${avatar(ctx)}
      <div class="hero-copy">
        <div class="kicker">${kicker(dict.heroKicker)}</div>
        <h1><span>${e(dict.heroTitle)}</span><span class="cursor" aria-hidden="true"></span></h1>
        <p class="hero-sub">${e(dict.heroSub)}</p>
        <div class="hero-ctas">
          <a href="${worksHref}" class="px-btn primary">${e(dict.ctaWork)}</a>
          <button type="button" class="px-btn ghost" data-open-contact>${e(dict.ctaHire)}</button>
        </div>
      </div>
    </div>
  </section>

  <section id="work" class="wrap feed">
    <div class="feed-head">
      <h2>${e(dict.workLabel)}</h2>
      <a href="${worksHref}" class="feed-all">${e(dict.seeAllShort)}</a>
    </div>
    <div id="featured">${jobCard(ctx, featured, { featured: true, withDesc: true })}</div>
    <div class="post-grid">${secondary.map((j) => jobCard(ctx, j, {})).join('')}</div>
    <div class="feed-more">
      <a href="${worksHref}" class="px-btn ghost">${e(dict.seeAll)}</a>
    </div>
  </section>

  <section id="about" class="about">
    <div class="wrap about-inner">
      <div class="about-grid">
        <div class="about-copy">
          <div class="kicker">${e(dict.aboutLabel)}</div>
          <h2>${e(dict.aboutTitle)}</h2>
          <p>${e(dict.aboutP1)}</p>
          <p>${e(dict.aboutP2)}</p>
        </div>
        <div class="hero-frame-wrap">
          <div class="hero-frame">
            <div id="heroSprite" data-label="${e(dict.heroAlt)}"></div>
            <span class="hero-caption">${e(dict.gopherCaption)}</span>
          </div>
        </div>
      </div>
      <div class="inventory">
        <h3>${e(dict.invTitle)}</h3>
        <div class="inv-grid">
          ${inventory(ctx)}
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="wrap contact">
    <div class="kicker">${e(dict.contactLabel)}</div>
    <h2>${e(dict.contactTitle)}</h2>
    <p class="contact-lead">${e(dict.contactLead)}</p>
    <div class="contact-row">
      <button type="button" class="px-btn primary" data-open-contact>${e(dict.contactBtn)}</button>
      ${contactLinks(ctx).replace(/<a /g, '<a class="link-ul" ')}
    </div>
  </section>`;
}

function worksMain(ctx) {
  const { dict, root, routes, jobs } = ctx;
  return `<section class="wrap works">
    <a href="${href(root, routes.home)}" class="back-link">${e(dict.backHome)}</a>
    ${ctx.page.job ? `<h2 class="works-title">${e(dict.worksTitle)}</h2>` : `<h1>${e(dict.worksTitle)}</h1>`}
    <p class="works-lead">${e(dict.worksLead)}</p>
    <div class="works-grid">${jobs.map((j) => jobCard(ctx, j, { withDesc: true, heading: 'h2' })).join('')}</div>
  </section>`;
}

function drawerContent(ctx, job) {
  if (!job) return { year: '', title: '', subtitle: '', bodies: ['', '', ''], stack: '', slides: '', dots: '', counter: '', links: '', pager: '' };
  const { dict, root } = ctx;
  const idx = ctx.jobs.findIndex((j) => j.slug === job.slug);
  const prev = ctx.jobs[idx - 1];
  const next = ctx.jobs[idx + 1];
  const links = [
    job.live ? `<a href="${e(job.live)}" class="px-btn primary" target="_blank" rel="noopener">${e(dict.liveLink)}</a>` : '',
    job.repo ? `<a href="${e(job.repo)}" class="link-ul" target="_blank" rel="noopener">${e(dict.repoLink)}</a>` : ''
  ].join('');
  return {
    year: e(job.year),
    title: e(job.title),
    subtitle: e(job.subtitle),
    bodies: [job.body1, job.body2, job.body3 || ''].map(e),
    stack: e(job.stack),
    slides: job.ph.map((_, i) => `<div class="carousel-slide">${slot(ctx, job, i, i === 0)}</div>`).join(''),
    dots: job.ph.map((_, i) => `<button type="button" class="dot${i === 0 ? ' active' : ''}" aria-label="${e(dict.imageLabel)} ${i + 1}"></button>`).join(''),
    counter: `1 / ${job.ph.length}`,
    links,
    pager: [
      prev ? `<a class="prev" href="${href(root, ctx.P.jobPath(ctx.lang, prev.slug))}" data-slug="${e(prev.slug)}">← ${e(prev.title)}</a>` : '',
      next ? `<a class="next" href="${href(root, ctx.P.jobPath(ctx.lang, next.slug))}" data-slug="${e(next.slug)}">${e(next.title)} →</a>` : ''
    ].join('')
  };
}

function drawer(ctx) {
  const job = ctx.page.job;
  const c = drawerContent(ctx, job);
  return `<div class="drawer-scrim${job ? ' open' : ''}" id="jobScrim">
  <div class="drawer" role="dialog" aria-modal="true" aria-labelledby="jobTitle">
    <div class="drawer-bar">
      <span class="post-avatar" aria-hidden="true">LD</span>
      <span class="post-handle">${e(ctx.P.SITE.handle)}</span>
      <span class="post-year" id="jobYear">${c.year}</span>
      <a href="${href(ctx.root, ctx.routes.works)}" class="x-btn" id="jobClose" role="button" aria-label="Close">X</a>
    </div>
    <div class="drawer-scroll" id="jobScroll">
      <div class="carousel"><div class="carousel-track" id="jobTrack">${c.slides}</div></div>
      <div class="carousel-nav">
        <button type="button" class="arrow" id="slidePrev" aria-label="Previous">&lt;</button>
        <div class="dots"><span class="dots" id="jobDots">${c.dots}</span><span class="slide-counter" id="slideCounter">${c.counter}</span></div>
        <button type="button" class="arrow" id="slideNext" aria-label="Next">&gt;</button>
      </div>
      <div class="drawer-body">
        <${job ? 'h1' : 'h2'} id="jobTitle">${c.title}</${job ? 'h1' : 'h2'}>
        <p class="drawer-sub" id="jobSubtitle">${c.subtitle}</p>
        <p class="drawer-p" id="jobBody1">${c.bodies[0]}</p>
        <p class="drawer-p" id="jobBody2">${c.bodies[1]}</p>
        <p class="drawer-p" id="jobBody3"${c.bodies[2] ? '' : ' hidden'}>${c.bodies[2]}</p>
        <div class="drawer-stack" id="jobStack">${c.stack}</div>
        <div class="drawer-links" id="jobLinks"${c.links ? '' : ' hidden'}>${c.links}</div>
        <div class="drawer-pager" id="jobPager">${c.pager}</div>
      </div>
    </div>
  </div>
</div>`;
}

function tabbar(ctx) {
  const { dict, root, routes, page } = ctx;
  const tab = (path, label, active) => `<a class="tab${active ? ' active' : ''}" href="${path}"><span class="tab-dot" aria-hidden="true"></span><span class="tab-label">${e(label)}</span></a>`;
  const home = href(root, routes.home);
  return `<nav class="tabbar" aria-label="Menu">
  ${tab(home, dict.tabHome, page.view === 'home')}
  ${tab(href(root, routes.works), dict.navWorks, page.view === 'works')}
  ${tab(`${home}#about`, dict.navAbout, false)}
  ${tab(`${home}#contact`, dict.navContact, false)}
</nav>`;
}

function modals(ctx) {
  const { dict } = ctx;
  return `<div class="scrim" id="contactScrim">
  <div class="panel" role="dialog" aria-modal="true" aria-labelledby="formTitle">
    <div class="panel-head">
      <div>
        <h3 id="formTitle">${e(dict.formTitle)}</h3>
        <p class="panel-sub">${e(dict.formSub)}</p>
      </div>
      <button type="button" class="x-btn" data-close-contact aria-label="Close">X</button>
    </div>
    <form class="form" id="contactForm" novalidate>
      <label class="field">
        <span>${e(dict.nameLabel)}</span>
        <input type="text" id="fName" name="name" autocomplete="name" placeholder="${e(dict.namePh)}">
      </label>
      <label class="field">
        <span>${e(dict.emailLabel)}</span>
        <input type="email" id="fEmail" name="email" autocomplete="email" placeholder="${e(dict.emailPh)}">
      </label>
      <label class="field">
        <span>${e(dict.msgLabel)}</span>
        <textarea id="fMsg" name="message" rows="4" placeholder="${e(dict.msgPh)}"></textarea>
      </label>
      <div class="form-error" id="formError" role="alert"></div>
      <button type="submit" class="px-btn primary" id="formSubmit">${e(dict.sendBtn)}</button>
    </form>
    <div class="form-success" id="formSuccess">
      <h3>${e(dict.successTitle)}</h3>
      <p>${e(dict.successMsg)}</p>
      <button type="button" class="btn-plain" id="sendAnother">${e(dict.sendAnother)}</button>
    </div>
    <div class="panel-foot">
      <span>${e(dict.orReach)}</span>
      ${contactLinks(ctx)}
    </div>
  </div>
</div>

<div class="scrim" id="privacyScrim">
  <div class="panel privacy" role="dialog" aria-modal="true" aria-labelledby="privTitle">
    <div class="panel-head">
      <h3 id="privTitle">${e(dict.privTitle)}</h3>
      <button type="button" class="x-btn" id="privacyClose" aria-label="Close">X</button>
    </div>
    <p>${e(dict.privP1)}</p>
    <p>${e(dict.privP2)}</p>
    <p>${e(dict.privP3)}</p>
  </div>
</div>`;
}

export function renderPage(P, page, { root, head, size }) {
  const dict = P.DICT[page.lang];
  const ctx = { P, page, root, size, lang: page.lang, dict, routes: P.ROUTES[page.lang], jobs: P.visibleJobs(page.lang) };
  const job = page.job ? page.job.slug : '';
  return `<!DOCTYPE html>
<html lang="${P.ROUTES[page.lang].htmlLang}" data-root="${root}" data-lang="${page.lang}" data-view="${page.view}" data-job="${job}">
<head>
${head}
</head>
<body${job ? ' class="locked"' : ''}>

${header(ctx)}

<main>
  ${page.view === 'home' ? homeMain(ctx) : worksMain(ctx)}
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <span class="footer-note">${e(dict.footerNote)}</span>
    <div class="footer-links">
      <button type="button" id="privacyOpen">${e(dict.privacyLink)}</button>
    </div>
  </div>
  <div class="mobile-pad" aria-hidden="true"></div>
</footer>

${tabbar(ctx)}

${modals(ctx)}

${drawer(ctx)}

<script src="${root}js/content.js" defer></script>
<script src="${root}js/app.js" defer></script>
</body>
</html>
`;
}
