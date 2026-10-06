/* Portfolio v3 — behaviour
   Every view is a real, pre-rendered page (see scripts/build.mjs). This script adds the pixel sprites,
   opens projects in a drawer with pushState, and runs the contact and privacy modals.
   Content lives in js/content.js (window.PORTFOLIO). */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/lucas.lucantas38@gmail.com';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var LEGACY_JOB_HASH = /^#\/trabalhos(?:\/([^/]+))?/;

  /* Pixel maps: '.' is transparent, every other char is a palette key. */
  var SPRITES = {
    sword: [
      '.......oo.......', '......olpo......', '......olpo......', '......olpo......', '......olpo......', '......olpo......', '......olpo......', '......olpo......', '......olpo......', '......olpo......',
      '....oooooooo....', '...ogggggggggo..', '....oooooooo....', '......obbo......', '......obbo......', '.......oo.......'
    ],
    snake: [
      '.......oo.......', '......olpo......', '.......olpo.....', '........olpo....', '.......olpo.....', '......olpo......', '.....olpo.......', '......olpo......', '.......olpo.....', '......olpo......',
      '....oooooooo....', '...ogggggggggo..', '....oooooooo....', '......obbo......', '......obbo......', '.......oo.......'
    ],
    armor: [
      '................', '..oooo.oo.oooo..', '.opppoolloopppo.', '.oppppllllppppo.', '.oppppppppppppo.', '..opppplllpppo..', '..oppppllppppo..', '...oppppppppo...', '...oppplllppo...', '...opppllpppo...',
      '...oppppppppo...', '...oppppppppo...', '...oppddddppo...', '....oppddppo....', '.....oooooo.....', '................'
    ],
    shield: [
      '................', '..oooooooooooo..', '.oppppppppppppo.', '.opppppllpppppo.', '.oppppllllppppo.', '.opppllllllpppo.', '.oppppllllppppo.', '.opppppllpppppo.', '.oppppppppppppo.', '..oppppppppppo..',
      '..oppppppppppo..', '...oppppppppo...', '....oppppppo....', '.....oppppo.....', '......oppo......', '.......oo.......'
    ],
    boots: [
      '................', '................', '...oooooo.......', '...olllllo......', '...oppppo.......', '...oppppo.......', '...oppppo.......', '...oppppo.......', '...oppppo.......', '...opppppooo....',
      '...oppppppppo...', '...oppppppppo...', '...oddddddddo...', '...oooooooooo...', '................', '................'
    ],
    crossbow: [
      '................', '......olpo......', '.oooooooooooooo.', '.opppppllpppppo.', '.oooooolloooooo.', '......obbo......', '......obbo......', '......obbo......', '......obbo......', '......obbo......',
      '.....oobbo......', '.....obbbo......', '......obbo......', '......obbo......', '......oooo......', '................'
    ],
    bow: [
      '................', '....ooo.........', '...oppoo........', '..oppo..l.......', '..opo...l.......', '.oppo...l.......', '.opo....l.......', '.opobbbbbbbbolo.', '.opo....l.......', '.oppo...l.......',
      '..opo...l.......', '..oppo..l.......', '...oppoo........', '....ooo.........', '................', '................'
    ],
    pants: [
      '................', '..oooooooooooo..', '..oddddddddddo..', '..oppppppppppo..', '..oppppppppppo..', '..opppppoppppo..', '..olppo..opplo..', '..olppo..opplo..', '..olppo..opplo..', '..olppo..opplo..',
      '..olppo..opplo..', '..olppo..opplo..', '..olppo..opplo..', '..ooooo..ooooo..', '................', '................'
    ],
    hero: [
      '................................',
      '................................',
      '.............ooooooo.....oo.....',
      '............okkkkkkko...oWwo....',
      '...........okkkkkkkkko..oWwo....',
      '..........okkkkkkkkkkko.oWwo....',
      '..........okosssssssoko.oWwo....',
      '..........okososssosoko.oWwo....',
      '..........okosssssssoko.oWwo....',
      '..........okossooossoko.oWwo....',
      '..........okoooooooooko.oWwo....',
      '..........oko.ossso.oko.oWwo....',
      '..........okAAAAAAAAAko.oWwo....',
      '.ooooooooosaaaaaAaaaaasooWwo....',
      '.ohhhhhhoosaaaaAAAaaaasooWwo....',
      '.ohhmmhhoosaaaaAAAaaaasooWwo....',
      '.ohmmmmhoosaaaaaAaaaaaoggggggo..',
      '.ohhmmhhooaaaaaaaaaaaao.osso....',
      '.ohhhhhho.oaaaaaaaaaaao.obbo....',
      '..ohhhho..oDDDDDDDDDDDo.obbo....',
      '...oooo...orrrrrrrrrrro..oo.....',
      '..........orrrrrorrrrro.........',
      '..........oRrrrrorrrrRo.........',
      '..........oRrrrrorrrrRo.........',
      '..........orrrrrorrrrro.........',
      '..........orrrrrorrrrro.........',
      '..........oTTTTToTTTTTo.........',
      '..........otttttottttto.........',
      '........otttttttottttttto.......',
      '........ooooooooooooooooo.......',
      '................................',
      '................................'
    ]
  };

  var BASE_PALETTE = { o: '#1B1B1F', g: '#C9A227', b: '#6B4A2B' };
  var HERO_PALETTE = { k: '#2A1A12', s: '#5C3A21', a: '#3178C6', A: '#A9CBF0', D: '#235A96', r: '#3A4756', R: '#61DAFB', t: '#2496ED', T: '#B5D8F8', W: '#9EE6F5', w: '#00ADD8', h: '#00758F', m: '#F29111' };

  var doc = document.documentElement;
  var ROOT_URL = new URL(doc.getAttribute('data-root'), window.location.origin);
  var LANG = doc.getAttribute('data-lang');
  var VIEW = doc.getAttribute('data-view');
  var DICT = P.DICT[LANG];
  var JOBS = P.visibleJobs(LANG);

  var state = { job: doc.getAttribute('data-job') || null, slide: 0, slideCount: 1, contactOpen: false, privacyOpen: false };
  var baseUrl = state.job ? pageUrl(P.ROUTES[LANG].works) : window.location.href.split('#')[0];
  var baseTitle = state.job ? DICT.metaTitleWorks : document.title;

  function $(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function pageUrl(path) { return new URL(path, ROOT_URL).href; }

  function findJob(slug) {
    return JOBS.filter(function (j) { return j.slug === slug; })[0] || null;
  }

  function jobFromLocation() {
    var rel = window.location.pathname.slice(ROOT_URL.pathname.length);
    var prefix = P.ROUTES[LANG].works;
    if (rel.indexOf(prefix) !== 0) return null;
    return rel.slice(prefix.length).split('/')[0] || null;
  }

  /* ---------- sprites ---------- */
  function spriteSvg(map, colors, className, label) {
    var pal = Object.assign({}, BASE_PALETTE, colors);
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + map[0].length + ' ' + map.length);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('class', className);
    if (label) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', label); }
    else svg.setAttribute('aria-hidden', 'true');
    map.forEach(function (row, y) {
      row.split('').forEach(function (ch, x) {
        if (ch === '.' || !pal[ch]) return;
        var rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y);
        rect.setAttribute('width', 1); rect.setAttribute('height', 1);
        rect.setAttribute('fill', pal[ch]);
        svg.appendChild(rect);
      });
    });
    return svg;
  }

  function renderSprites() {
    var frame = $('heroSprite');
    if (frame) frame.appendChild(spriteSvg(SPRITES.hero, HERO_PALETTE, 'hero-sprite', frame.getAttribute('data-label')));
    document.querySelectorAll('[data-gear]').forEach(function (item) {
      var g = P.GEAR[Number(item.getAttribute('data-gear'))];
      item.insertBefore(spriteSvg(SPRITES[g.sprite], g.colors, 'item-sprite'), item.firstChild);
    });
  }

  /* ---------- drawer ---------- */
  function imageSlot(job, i) {
    var slot = el('div', 'slot');
    var label = job.ph[i];
    if (job.images[i]) {
      var img = el('img');
      img.src = pageUrl(job.images[i]); img.alt = job.title + ': ' + label; img.loading = 'lazy';
      slot.appendChild(img);
    } else {
      slot.appendChild(el('span', null, label));
    }
    return slot;
  }

  function updateCarousel() {
    $('jobTrack').style.transform = 'translateX(-' + (state.slide * 100) + '%)';
    Array.prototype.forEach.call($('jobDots').children, function (dot, i) {
      dot.classList.toggle('active', i === state.slide);
    });
    $('slideCounter').textContent = (state.slide + 1) + ' / ' + state.slideCount;
  }

  function setSlide(i) {
    state.slide = (i + state.slideCount) % state.slideCount;
    updateCarousel();
  }

  function externalLink(href, cls, text) {
    var a = el('a', cls, text);
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    return a;
  }

  function pagerLink(job, cls, text) {
    var a = el('a', cls, text);
    a.href = pageUrl(P.jobPath(LANG, job.slug));
    a.setAttribute('data-slug', job.slug);
    return a;
  }

  function fillDrawer(job) {
    $('jobYear').textContent = job.year;
    $('jobTitle').textContent = job.title;
    $('jobSubtitle').textContent = job.subtitle;
    var facts = $('jobFacts');
    facts.textContent = '';
    (job.facts || []).forEach(function (f) { facts.appendChild(el('li', '', f)); });
    $('jobBody1').textContent = job.body1;
    $('jobBody2').textContent = job.body2;
    var body3 = $('jobBody3');
    body3.textContent = job.body3 || '';
    body3.hidden = !job.body3;
    $('jobStack').textContent = job.stack;

    var track = $('jobTrack');
    var dots = $('jobDots');
    track.textContent = ''; dots.textContent = '';
    job.ph.forEach(function (label, i) {
      var slide = el('div', 'carousel-slide');
      slide.appendChild(imageSlot(job, i));
      track.appendChild(slide);
      var dot = el('button', 'dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', DICT.imageLabel + ' ' + (i + 1));
      dot.addEventListener('click', function () { setSlide(i); });
      dots.appendChild(dot);
    });
    state.slideCount = job.ph.length || 1;
    updateCarousel();

    var links = $('jobLinks');
    links.textContent = '';
    if (job.live) links.appendChild(externalLink(job.live, 'px-btn primary', DICT.liveLink));
    if (job.repo) links.appendChild(externalLink(job.repo, 'link-ul', DICT.repoLink));
    links.hidden = !job.live && !job.repo;

    var idx = JOBS.indexOf(job);
    var pager = $('jobPager');
    pager.textContent = '';
    if (idx > 0) pager.appendChild(pagerLink(JOBS[idx - 1], 'prev', '← ' + JOBS[idx - 1].title));
    if (idx < JOBS.length - 1) pager.appendChild(pagerLink(JOBS[idx + 1], 'next', JOBS[idx + 1].title + ' →'));
  }

  function syncLangLinks() {
    document.querySelectorAll('[data-lang-link]').forEach(function (a) {
      var lang = a.getAttribute('data-lang-link');
      a.href = pageUrl(state.job ? P.jobPath(lang, state.job) : P.ROUTES[lang][VIEW]);
    });
  }

  function syncLock() {
    document.body.classList.toggle('locked', !!state.job || state.contactOpen || state.privacyOpen);
  }

  function showJob(slug) {
    var job = slug ? findJob(slug) : null;
    state.job = job ? job.slug : null;
    state.slide = 0;
    if (job) {
      fillDrawer(job);
      document.title = P.jobPageTitle(LANG, job);
      $('jobScroll').scrollTop = 0;
      $('jobScrim').classList.add('open');
      $('jobClose').focus();
    } else {
      document.title = baseTitle;
      $('jobScrim').classList.remove('open');
    }
    syncLangLinks();
    syncLock();
  }

  function openJob(slug) {
    if (!findJob(slug)) return;
    window.history.pushState({ job: slug }, '', pageUrl(P.jobPath(LANG, slug)));
    showJob(slug);
  }

  function closeJob() {
    window.history.pushState({ job: null }, '', baseUrl);
    showJob(null);
  }

  function isPlainClick(e) {
    return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
  }

  function onDocumentClick(e) {
    if (!isPlainClick(e)) return;
    var pagerTarget = e.target.closest('#jobPager a[data-slug]');
    var card = e.target.closest('.post[data-slug]');
    var slug = pagerTarget ? pagerTarget.getAttribute('data-slug') : card && card.getAttribute('data-slug');
    if (!slug) return;
    e.preventDefault();
    openJob(slug);
  }

  function redirectLegacyHash() {
    var match = window.location.hash.match(LEGACY_JOB_HASH);
    if (!match) return false;
    var slug = match[1] && findJob(match[1]) ? match[1] : null;
    window.location.replace(pageUrl(slug ? P.jobPath(LANG, slug) : P.ROUTES[LANG].works));
    return true;
  }

  /* ---------- contact + privacy modals ---------- */
  var form, formSuccess, formError, submitBtn;

  function showForm() {
    form.hidden = false;
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
  }

  function openContact() {
    showForm();
    state.contactOpen = true;
    $('contactScrim').classList.add('open');
    syncLock();
    $('fName').focus();
  }

  function closeContact() {
    state.contactOpen = false;
    $('contactScrim').classList.remove('open');
    syncLock();
  }

  function openPrivacy() {
    state.privacyOpen = true;
    $('privacyScrim').classList.add('open');
    syncLock();
    $('privacyClose').focus();
  }

  function closePrivacy() {
    state.privacyOpen = false;
    $('privacyScrim').classList.remove('open');
    syncLock();
  }

  function showError(msg) {
    formError.textContent = msg;
    formError.classList.add('show');
  }

  function submitForm(e) {
    e.preventDefault();
    var name = $('fName').value.trim();
    var email = $('fEmail').value.trim();
    var message = $('fMsg').value.trim();
    if (!name) { showError(DICT.errName); return; }
    if (!EMAIL_RE.test(email)) { showError(DICT.errEmail); return; }
    if (!message) { showError(DICT.errMessage); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = DICT.sendingBtn;
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: name, email: email, message: message, _subject: 'Portfolio contact from ' + name })
    }).then(function (res) {
      if (!res.ok) throw new Error('send failed');
      return res.json();
    }).then(function (data) {
      if (data.success !== 'true' && data.success !== true) throw new Error('send rejected');
      form.reset();
      form.hidden = true;
      formSuccess.classList.add('show');
    }).catch(function () {
      showError(DICT.errSend);
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = DICT.sendBtn;
    });
  }

  /* ---------- wiring ---------- */
  function bind() {
    document.addEventListener('click', onDocumentClick);
    document.querySelectorAll('[data-open-contact]').forEach(function (b) { b.addEventListener('click', openContact); });
    document.querySelectorAll('[data-close-contact]').forEach(function (b) { b.addEventListener('click', closeContact); });
    $('contactScrim').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeContact(); });
    $('privacyOpen').addEventListener('click', openPrivacy);
    $('privacyClose').addEventListener('click', closePrivacy);
    $('privacyScrim').addEventListener('click', function (e) { if (e.target === e.currentTarget) closePrivacy(); });

    $('jobClose').addEventListener('click', function (e) {
      if (!isPlainClick(e)) return;
      e.preventDefault();
      closeJob();
    });
    $('jobClose').addEventListener('keydown', function (e) {
      if (e.key !== ' ') return;
      e.preventDefault();
      closeJob();
    });
    $('jobScrim').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeJob(); });
    $('slidePrev').addEventListener('click', function () { setSlide(state.slide - 1); });
    $('slideNext').addEventListener('click', function () { setSlide(state.slide + 1); });

    form = $('contactForm');
    formSuccess = $('formSuccess');
    formError = $('formError');
    submitBtn = $('formSubmit');
    form.addEventListener('submit', submitForm);
    ['fName', 'fEmail', 'fMsg'].forEach(function (id) {
      $(id).addEventListener('input', function () { formError.classList.remove('show'); });
    });
    $('sendAnother').addEventListener('click', showForm);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (state.contactOpen) closeContact();
      else if (state.privacyOpen) closePrivacy();
      else if (state.job) closeJob();
    });
    window.addEventListener('popstate', function () { showJob(jobFromLocation()); });
  }

  function init() {
    if (redirectLegacyHash()) return;
    renderSprites();
    bind();
    if (state.job) showJob(state.job);
  }

  init();
})();
