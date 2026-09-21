/* Portfolio v3 — behaviour
   Hash routes: #/  (home)  ·  #/trabalhos (all work)  ·  #/trabalhos/<slug> (project drawer over the current page)
   Content lives in DICT (per language) and JOBS (language independent). */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/lucas.lucantas38@gmail.com';
  var LANG_STORAGE_KEY = 'pf-lang';
  var FEATURED_SLUG = 'longa';
  var AVATAR_SRC = ''; /* e.g. 'imgs/avatar.jpg' — empty shows the placeholder slot */
  var HEADER_OFFSET_PX = 70;
  var ANCHOR_SCROLL_DELAY_MS = 60;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var DICT = {
    en: {
      navWorks: 'Work', navAbout: 'About', navContact: 'Contact', tabHome: 'Home',
      avatarPh: 'photo',
      heroKicker: 'full-stack · Go · Python · .NET · React',
      heroTitle: 'I build things for the web. And I have fun doing it.',
      heroSub: 'Hi, I am Lucas. I like taking a messy problem, turning it into working software and shipping it. Backend, frontend, whatever the thing needs.',
      ctaWork: 'See my work', ctaHire: 'Say hi',
      workLabel: 'Latest work', seeAllShort: 'all →', seeAll: 'See all work', openJob: 'Open project →',
      worksTitle: 'All work', worksLead: 'Everything I have built and can show. Newest first.',
      backHome: '← home', liveLink: 'Open live', repoLink: 'Source on GitHub ↗', imageLabel: 'Image',
      aboutLabel: 'About', aboutTitle: 'Hi, I am Lucas. I play with code for a living.',
      aboutP1: 'Full-stack engineer. I write Go, Python and .NET on the backend and React / Next.js on the front. I got into this because building things is fun, and it still is.',
      aboutP2: 'I like ambiguous briefs and owning them end to end: find the real problem, pick the honest tradeoffs, ship, and leave code the next person can read.',
      gopherCaption: 'player 1 · lucas',
      heroAlt: 'Pixel-art Lucas wearing TypeScript armor and React pants, holding a Go sword and a MySQL shield',
      invTitle: 'Inventory',
      slots: { weapon: 'weapon', armor: 'armor', pants: 'pants', shield: 'shield', boots: 'boots' },
      contactLabel: 'Contact', contactTitle: 'Have something to build? Let us talk.',
      contactLead: 'Bring me something slow, messy, or half built. Tell me what you want to ship and I will tell you how I would approach it.',
      contactBtn: 'Say hi',
      formTitle: 'Get in touch', formSub: 'Tell me about your project. I usually reply within a day.',
      nameLabel: 'Name', emailLabel: 'Email', msgLabel: 'Message',
      namePh: 'Your name', emailPh: 'you@company.com', msgPh: 'What are you trying to build?',
      sendBtn: 'Send', sendingBtn: 'Sending…', successTitle: 'Message sent',
      successMsg: 'Thanks. I will get back to you soon.', sendAnother: 'Send another', orReach: 'or reach me on',
      errName: 'Please enter your name.', errEmail: 'Please enter a valid email.', errMessage: 'Please add a short message.',
      errSend: 'Could not send right now. Please try again or reach me on LinkedIn.',
      privacyLink: 'privacy', privTitle: 'Privacy',
      privP1: 'This site sets no cookies and runs no analytics.',
      privP2: 'Your language choice is stored in your own browser and never leaves it.',
      privP3: 'The contact form sends your name, email and message to my inbox. I use them only to reply, and I delete them on request.',
      footerNote: '© 2026 Lucas Dantas',
      jobs: {
        longa: { title: 'Longa', subtitle: 'Adaptive training plans for runners', desc: 'A running app that rebuilds your week when life gets in the way.', body1: 'Most training plans are static: miss one week and the schedule is wrong for the rest of the block. Longa builds the plan around your real life and rewrites it when you miss a run, feel flat or move a race.', body2: 'I built it solo, end to end: the plan engine in Go, the API, and the Next.js app. Every adjustment explains itself in plain language so runners trust what they see.', ph: ['week view', 'plan rewrite', 'race day screen'] },
        morada: { title: 'Morada', subtitle: 'Condominium management for admins and residents', desc: 'A proptech app that puts building admins and residents on the same page.', body1: 'Condominium management app for admins and residents. Built feature-first with lint-enforced architecture boundaries and TDD end to end.', body2: 'Each feature owns its screens, rules and data access; the linter blocks imports that cross those lines, so the codebase stays readable as it grows.', ph: ['resident home', 'admin panel', 'notices and bookings'] },
        relay: { title: 'Relay', subtitle: 'Event ingestion for a payments platform', desc: 'The pipe that keeps millions of payment events flowing without piling up.', body1: 'Relay receives events from a payments platform and hands them to downstream services. Under load the old consumer fell behind and queues grew.', body2: 'I rewrote the queue consumer and the backpressure handling in Python, with FastAPI for the control surface and Kafka as the backbone.', ph: ['architecture sketch', 'ops console', 'alerting view'] },
        forge: { title: 'Forge', subtitle: 'Component library and scaffolding CLI', desc: 'A toolbox so a six-person team can start a new page in minutes.', body1: 'A small product team was rebuilding the same buttons, forms and layouts on every page. Forge is the shared library plus a CLI that scaffolds a new page with the right pieces already wired.', body2: 'TypeScript, React and Vite. Documented with live examples so nobody has to ask how a component works.', ph: ['component gallery', 'CLI in action', 'docs page'] }
      }
    },
    pt: {
      navWorks: 'Trabalhos', navAbout: 'Sobre', navContact: 'Contato', tabHome: 'Início',
      avatarPh: 'foto',
      heroKicker: 'full-stack · Go · Python · .NET · React',
      heroTitle: 'Eu construo coisas pra web. E me divirto fazendo.',
      heroSub: 'Oi, eu sou o Lucas. Gosto de pegar um problema bagunçado, transformar em software que funciona e colocar no ar. Backend, frontend, o que a coisa precisar.',
      ctaWork: 'Ver trabalhos', ctaHire: 'Dar um oi',
      workLabel: 'Últimos trabalhos', seeAllShort: 'todos →', seeAll: 'Ver todos os trabalhos', openJob: 'Abrir projeto →',
      worksTitle: 'Todos os trabalhos', worksLead: 'Tudo o que construí e posso mostrar. Do mais novo pro mais antigo.',
      backHome: '← início', liveLink: 'Abrir ao vivo', repoLink: 'Código no GitHub ↗', imageLabel: 'Imagem',
      aboutLabel: 'Sobre', aboutTitle: 'Oi, eu sou o Lucas. Brinco com código pra viver.',
      aboutP1: 'Engenheiro full-stack. Escrevo Go, Python e .NET no backend e React / Next.js no front. Entrei nisso porque construir coisas é divertido, e continua sendo.',
      aboutP2: 'Gosto de briefs ambíguos e de assumi-los de ponta a ponta: descobrir o problema real, fazer trade-offs honestos, entregar e deixar um código que a próxima pessoa consegue ler.',
      gopherCaption: 'jogador 1 · lucas',
      heroAlt: 'Lucas em pixel art com armadura de TypeScript e calça de React, segurando espada de Go e escudo de MySQL',
      invTitle: 'Inventário',
      slots: { weapon: 'arma', armor: 'armadura', pants: 'calça', shield: 'escudo', boots: 'bota' },
      contactLabel: 'Contato', contactTitle: 'Tem algo pra construir? Vamos conversar.',
      contactLead: 'Me traga algo lento, bagunçado ou pela metade. Conte o que você quer colocar no ar e eu digo como eu abordaria.',
      contactBtn: 'Dar um oi',
      formTitle: 'Entre em contato', formSub: 'Conte sobre seu projeto. Costumo responder em até um dia.',
      nameLabel: 'Nome', emailLabel: 'E-mail', msgLabel: 'Mensagem',
      namePh: 'Seu nome', emailPh: 'voce@empresa.com', msgPh: 'O que você quer construir?',
      sendBtn: 'Enviar', sendingBtn: 'Enviando…', successTitle: 'Mensagem enviada',
      successMsg: 'Obrigado. Retorno em breve.', sendAnother: 'Enviar outra', orReach: 'ou me encontre em',
      errName: 'Digite seu nome.', errEmail: 'Digite um e-mail válido.', errMessage: 'Escreva uma breve mensagem.',
      errSend: 'Não foi possível enviar agora. Tente de novo ou me chame no LinkedIn.',
      privacyLink: 'privacidade', privTitle: 'Privacidade',
      privP1: 'Este site não usa cookies nem analytics.',
      privP2: 'Sua escolha de idioma fica guardada no seu próprio navegador e não sai dele.',
      privP3: 'O formulário de contato envia nome, e-mail e mensagem para minha caixa de entrada. Uso apenas para responder e apago quando pedido.',
      footerNote: '© 2026 Lucas Dantas',
      jobs: {
        longa: { title: 'Longa', subtitle: 'Planos de treino adaptativos para corredores', desc: 'Um app de corrida que refaz sua semana quando a vida atravessa o caminho.', body1: 'A maioria dos planos de treino é estática: perca uma semana e o cronograma fica errado pelo resto do ciclo. O Longa monta o plano em torno da sua vida real e o reescreve quando você perde um treino, está sem energia ou muda uma prova.', body2: 'Construí sozinho, de ponta a ponta: o motor de planos em Go, a API e o app em Next.js. Cada ajuste se explica em linguagem simples, pra que o corredor confie no que vê.', ph: ['visão da semana', 'plano reescrito', 'tela do dia da prova'] },
        morada: { title: 'Morada', subtitle: 'Gestão de condomínios para síndicos e moradores', desc: 'Um app proptech que coloca síndicos e moradores na mesma página.', body1: 'App de gestão de condomínios para síndicos e moradores. Construído feature-first, com fronteiras de arquitetura garantidas por lint e TDD de ponta a ponta.', body2: 'Cada feature é dona das suas telas, regras e acesso a dados; o linter bloqueia imports que cruzam essas linhas, então o código continua legível conforme cresce.', ph: ['home do morador', 'painel do síndico', 'avisos e reservas'] },
        relay: { title: 'Relay', subtitle: 'Ingestão de eventos para uma plataforma de pagamentos', desc: 'O cano que mantém milhões de eventos de pagamento fluindo sem acumular.', body1: 'O Relay recebe eventos de uma plataforma de pagamentos e entrega para os serviços seguintes. Sob carga, o consumidor antigo ficava para trás e as filas cresciam.', body2: 'Reescrevi o consumidor de fila e o controle de backpressure em Python, com FastAPI na superfície de controle e Kafka como espinha dorsal.', ph: ['esboço da arquitetura', 'console de operação', 'tela de alertas'] },
        forge: { title: 'Forge', subtitle: 'Biblioteca de componentes e CLI de scaffolding', desc: 'Uma caixa de ferramentas pra um time de seis pessoas começar uma página nova em minutos.', body1: 'Um time de produto pequeno refazia os mesmos botões, formulários e layouts em toda página. O Forge é a biblioteca compartilhada mais uma CLI que cria uma página nova já com as peças certas ligadas.', body2: 'TypeScript, React e Vite. Documentado com exemplos ao vivo pra ninguém precisar perguntar como um componente funciona.', ph: ['galeria de componentes', 'CLI em ação', 'página de docs'] }
      }
    }
  };

  /* images: optional list of paths, one per carousel slide (first one is the card cover).
     When empty, the placeholder labels from DICT.jobs[slug].ph are shown instead. */
  var JOBS = [
    { slug: 'longa', year: '2026', stack: 'Next.js · Go · PostgreSQL · Redis', live: 'https://tempo.run', repo: 'https://github.com/Lucantas', images: [] },
    { slug: 'morada', year: '2024', stack: 'Go · React · PostgreSQL', live: '', repo: '', images: [] },
    { slug: 'relay', year: '2024', stack: 'Python · FastAPI · Kafka · Docker', live: '', repo: '', images: [] },
    { slug: 'forge', year: '2023', stack: 'TypeScript · React · Vite', live: '', repo: 'https://github.com/Lucantas', images: [] }
  ];

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

  var GEAR = [
    { name: 'Go', lv: 11, kind: 'weapon', sprite: 'sword', colors: { p: '#00ADD8', l: '#9EE6F5' } },
    { name: 'Python', lv: 9, kind: 'weapon', sprite: 'snake', colors: { p: '#3776AB', l: '#FFD43B' } },
    { name: 'C#', lv: 8, kind: 'weapon', sprite: 'crossbow', colors: { p: '#512BD4', l: '#B7A6F5' } },
    { name: 'Node', lv: 7, kind: 'weapon', sprite: 'bow', colors: { p: '#339933', l: '#9BD99B', b: '#9BD99B' } },
    { name: 'TypeScript', lv: 9, kind: 'armor', sprite: 'armor', colors: { p: '#3178C6', l: '#A9CBF0', d: '#235A96' } },
    { name: 'React', lv: 10, kind: 'pants', sprite: 'pants', colors: { p: '#3A4756', l: '#61DAFB', d: '#20232A' } },
    { name: 'MySQL', lv: 8, kind: 'shield', sprite: 'shield', colors: { p: '#00758F', l: '#F29111' } },
    { name: 'PostgreSQL', lv: 8, kind: 'shield', sprite: 'shield', colors: { p: '#336791', l: '#CFE0F0' } },
    { name: 'Docker', lv: 7, kind: 'boots', sprite: 'boots', colors: { p: '#2496ED', l: '#B5D8F8', d: '#1A6DB0' } },
    { name: 'AWS', lv: 6, kind: 'boots', sprite: 'boots', colors: { p: '#FF9900', l: '#FFD9A0', d: '#B86D00' } }
  ];

  /* ---------- state ---------- */
  var state = { lang: 'en', page: 'home', job: null, slide: 0, slideCount: 1, contactOpen: false, privacyOpen: false };
  var pendingAnchor = null;
  var keepPage = false;

  function $(id) { return document.getElementById(id); }
  function t() { return DICT[state.lang]; }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
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

  /* ---------- data ---------- */
  function jobList() {
    var dict = t();
    return JOBS.map(function (j) {
      return Object.assign({}, j, dict.jobs[j.slug], { href: '#/trabalhos/' + j.slug });
    });
  }

  function findJob(slug) {
    return jobList().filter(function (j) { return j.slug === slug; })[0] || null;
  }

  /* ---------- routing ---------- */
  function parseHash() {
    var h = (window.location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    if (parts[0] === 'trabalhos') return { page: 'works', job: parts[1] || null };
    return { page: 'home', job: null };
  }

  function sameHash(a, b) {
    return a.replace(/^#\/?/, '') === b.replace(/^#\/?/, '');
  }

  function scrollToId(id) {
    var node = $(id);
    if (!node) return;
    var top = node.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function navigate(hash, anchor, keep) {
    pendingAnchor = anchor || null;
    keepPage = !!keep;
    if (!sameHash(window.location.hash, hash)) {
      window.location.hash = hash;
      return;
    }
    pendingAnchor = null; keepPage = false;
    if (anchor) scrollToId(anchor); else window.scrollTo({ top: 0 });
  }

  function onHashChange() {
    var route = parseHash();
    var anchor = pendingAnchor; pendingAnchor = null;
    var keep = keepPage; keepPage = false;
    var page = keep ? state.page : route.page;
    var pageChanged = page !== state.page;
    var jobChanged = route.job !== state.job;
    state.page = page;
    state.job = route.job;
    if (jobChanged) state.slide = 0;
    render();
    if (jobChanged && state.job) { $('jobScroll').scrollTop = 0; $('jobClose').focus(); }
    if (anchor) setTimeout(function () { scrollToId(anchor); }, ANCHOR_SCROLL_DELAY_MS);
    else if (pageChanged) window.scrollTo({ top: 0 });
  }

  function closeJob() {
    keepPage = true;
    window.location.hash = state.page === 'works' ? '#/trabalhos' : '#/';
  }

  var NAV_TARGETS = {
    home: function () { navigate('#/'); },
    works: function () { navigate('#/trabalhos'); },
    about: function () { navigate('#/', 'about'); },
    contact: function () { navigate('#/', 'contact'); }
  };

  /* ---------- builders ---------- */
  function imageSlot(src, label) {
    var slot = el('div', 'slot');
    if (src) {
      var img = el('img');
      img.src = src; img.alt = label; img.loading = 'lazy';
      slot.appendChild(img);
    } else {
      slot.appendChild(el('span', null, label));
    }
    return slot;
  }

  function postBar(job) {
    var bar = el('div', 'post-bar');
    var avatar = el('span', 'post-avatar', 'LD');
    avatar.setAttribute('aria-hidden', 'true');
    bar.appendChild(avatar);
    bar.appendChild(el('span', 'post-handle', 'lucantas'));
    bar.appendChild(el('span', 'post-year', job.year));
    return bar;
  }

  function jobLink(job, cls, text) {
    var a = el('a', cls, text);
    a.href = job.href;
    a.addEventListener('click', function (e) { e.preventDefault(); navigate(job.href, null, true); });
    return a;
  }

  function jobCard(job, opts) {
    var card = el('article', 'post' + (opts.featured ? ' featured' : ''));
    var cover = el('div', 'post-cover');
    cover.appendChild(imageSlot(job.images[0], job.ph[0]));
    var body = el('div', 'post-body');
    body.appendChild(el(opts.heading || 'h3', null, job.title));
    body.appendChild(el('p', 'post-sub', job.subtitle));
    if (opts.withDesc) body.appendChild(el('p', 'post-desc', job.desc));
    body.appendChild(jobLink(job, 'post-open', t().openJob));
    if (opts.featured) {
      var col = el('div', 'post-col');
      col.appendChild(postBar(job));
      col.appendChild(body);
      card.appendChild(cover);
      card.appendChild(col);
    } else {
      card.appendChild(postBar(job));
      card.appendChild(cover);
      card.appendChild(body);
    }
    return card;
  }

  /* ---------- renderers ---------- */
  function renderAvatar() {
    var wrap = $('avatarSlot');
    wrap.textContent = '';
    wrap.appendChild(imageSlot(AVATAR_SRC, t().avatarPh));
  }

  function renderFeed() {
    var jobs = jobList();
    var featured = jobs.filter(function (j) { return j.slug === FEATURED_SLUG; })[0] || jobs[0];
    var secondary = jobs.filter(function (j) { return j.slug !== featured.slug; }).slice(0, 2);

    var featWrap = $('featured');
    featWrap.textContent = '';
    featWrap.appendChild(jobCard(featured, { featured: true, withDesc: true }));

    var grid = $('secondaryGrid');
    grid.textContent = '';
    secondary.forEach(function (j) { grid.appendChild(jobCard(j, {})); });

    var works = $('worksGrid');
    works.textContent = '';
    jobs.forEach(function (j) { works.appendChild(jobCard(j, { withDesc: true, heading: 'h2' })); });
  }

  function renderInventory() {
    var grid = $('invGrid');
    var slots = t().slots;
    grid.textContent = '';
    GEAR.forEach(function (g) {
      var item = el('div', 'item');
      item.appendChild(spriteSvg(SPRITES[g.sprite], g.colors, 'item-sprite'));
      item.appendChild(el('span', 'item-name', g.name));
      item.appendChild(el('span', 'item-lv', 'LV ' + g.lv));
      item.appendChild(el('span', 'item-slot', slots[g.kind]));
      grid.appendChild(item);
    });
  }

  function renderHeroSprite() {
    var frame = $('heroSprite');
    frame.textContent = '';
    frame.appendChild(spriteSvg(SPRITES.hero, HERO_PALETTE, 'hero-sprite', t().heroAlt));
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

  function renderDrawer() {
    var scrim = $('jobScrim');
    var job = state.job ? findJob(state.job) : null;
    if (!job) { scrim.classList.remove('open'); return; }
    var dict = t();

    $('jobYear').textContent = job.year;
    $('jobTitle').textContent = job.title;
    $('jobSubtitle').textContent = job.subtitle;
    $('jobBody1').textContent = job.body1;
    $('jobBody2').textContent = job.body2;
    $('jobStack').textContent = job.stack;

    var track = $('jobTrack');
    var dots = $('jobDots');
    track.textContent = ''; dots.textContent = '';
    job.ph.forEach(function (label, i) {
      var slide = el('div', 'carousel-slide');
      slide.appendChild(imageSlot(job.images[i], label));
      track.appendChild(slide);
      var dot = el('button', 'dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', dict.imageLabel + ' ' + (i + 1));
      dot.addEventListener('click', function () { setSlide(i); });
      dots.appendChild(dot);
    });
    state.slideCount = job.ph.length || 1;
    if (state.slide >= state.slideCount) state.slide = 0;
    updateCarousel();

    var links = $('jobLinks');
    links.textContent = '';
    if (job.live) links.appendChild(externalLink(job.live, 'px-btn primary', dict.liveLink));
    if (job.repo) links.appendChild(externalLink(job.repo, 'link-ul', dict.repoLink));
    links.hidden = !job.live && !job.repo;

    var jobs = jobList();
    var idx = jobs.map(function (j) { return j.slug; }).indexOf(job.slug);
    var pager = $('jobPager');
    pager.textContent = '';
    if (idx > 0) pager.appendChild(jobLink(jobs[idx - 1], 'prev', '← ' + jobs[idx - 1].title));
    if (idx < jobs.length - 1) pager.appendChild(jobLink(jobs[idx + 1], 'next', jobs[idx + 1].title + ' →'));

    scrim.classList.add('open');
  }

  function syncLock() {
    var locked = !!(state.job && findJob(state.job)) || state.contactOpen || state.privacyOpen;
    document.body.classList.toggle('locked', locked);
  }

  function render() {
    var home = state.page === 'home';
    $('pageHome').hidden = !home;
    $('pageWorks').hidden = home;
    $('navWorks').classList.toggle('active', !home);
    $('tabHome').classList.toggle('active', home);
    $('tabWorks').classList.toggle('active', !home);
    renderDrawer();
    syncLock();
  }

  /* ---------- language ---------- */
  function applyLang() {
    var dict = t();
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    $('langEn').classList.toggle('active', state.lang === 'en');
    $('langPt').classList.toggle('active', state.lang === 'pt');
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var val = dict[node.getAttribute('data-i18n')];
      if (typeof val === 'string') node.textContent = val;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (node) {
      var val = dict[node.getAttribute('data-i18n-ph')];
      if (typeof val === 'string') node.placeholder = val;
    });
    renderAvatar();
    renderFeed();
    renderInventory();
    renderHeroSprite();
    renderDrawer();
  }

  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    applyLang();
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
    var dict = t();
    var name = $('fName').value.trim();
    var email = $('fEmail').value.trim();
    var message = $('fMsg').value.trim();
    if (!name) { showError(dict.errName); return; }
    if (!EMAIL_RE.test(email)) { showError(dict.errEmail); return; }
    if (!message) { showError(dict.errMessage); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = dict.sendingBtn;
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
      showError(t().errSend);
    }).then(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = t().sendBtn;
    });
  }

  /* ---------- wiring ---------- */
  function bind() {
    document.querySelectorAll('[data-nav]').forEach(function (node) {
      node.addEventListener('click', function (e) {
        e.preventDefault();
        NAV_TARGETS[node.getAttribute('data-nav')]();
      });
    });
    $('logoLink').addEventListener('click', function (e) { e.preventDefault(); NAV_TARGETS.home(); });
    $('navWorks').addEventListener('click', function (e) { e.preventDefault(); NAV_TARGETS.works(); });
    $('navAbout').addEventListener('click', NAV_TARGETS.about);
    $('navContact').addEventListener('click', NAV_TARGETS.contact);
    $('langEn').addEventListener('click', function () { setLang('en'); });
    $('langPt').addEventListener('click', function () { setLang('pt'); });

    document.querySelectorAll('[data-open-contact]').forEach(function (b) { b.addEventListener('click', openContact); });
    document.querySelectorAll('[data-close-contact]').forEach(function (b) { b.addEventListener('click', closeContact); });
    $('contactScrim').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeContact(); });
    $('privacyOpen').addEventListener('click', openPrivacy);
    $('privacyClose').addEventListener('click', closePrivacy);
    $('privacyScrim').addEventListener('click', function (e) { if (e.target === e.currentTarget) closePrivacy(); });

    $('jobClose').addEventListener('click', closeJob);
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
    window.addEventListener('hashchange', onHashChange);
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    if (saved === 'pt' || saved === 'en') state.lang = saved;
    var route = parseHash();
    state.page = route.page;
    state.job = route.job;
    bind();
    applyLang();
    render();
  }

  init();
})();
