(function (root) {
  'use strict';

  var DICT = {
    en: {
      metaTitleHome: 'Lucas Dantas | Senior Backend Engineer · Go, AWS, TypeScript',
      metaDescHome: 'Lucas Dantas, senior backend engineer in Rio de Janeiro, Brazil. Go and serverless on AWS, TypeScript and React when the product needs it. Open to remote roles.',
      metaTitleWorks: 'Work | Lucas Dantas, Senior Backend Engineer',
      metaDescWorks: 'Projects built end to end by Lucas Dantas: Longa (adaptive running plans), Morada (condominium management) and Diário SG (searchable official gazettes).',
      metaTitleJob: '{title}: {subtitle} | Lucas Dantas',
      jobTitle: 'Senior Backend Engineer',
      langName: 'English',
      navWorks: 'Work', navXp: 'Experience', tabXp: 'Career', navAbout: 'About', navContact: 'Contact', tabHome: 'Home',
      heroKicker: 'backend · Go · AWS · TypeScript',
      availability: 'Open to senior backend roles · remote · UTC−3',
      heroTitle: 'I build fast, cheap-to-run backends in Go.',
      heroSub: 'At Personare I moved ~15 payment and cart APIs off a PHP monolith to Go on AWS Lambda. Latency went from ~3s to milliseconds and infrastructure costs dropped about 30%, on routes used by millions of people.',
      ctaWork: 'See my work', ctaResume: 'Résumé (PDF)', ctaHire: 'Say hi',
      resumeFile: 'resume.pdf',
      xpLabel: 'Experience', xpTitle: 'Where I\'ve worked',
      xpStats: [
        { value: '~15', label: 'payment & cart APIs moved to Go' },
        { value: '3s → ms', label: 'latency on critical routes' },
        { value: '−30%', label: 'infrastructure cost' }
      ],
      xp: [
        { role: 'Software Engineer', company: 'Personare', url: 'https://www.personare.com.br', period: 'Jun 2022 – present', place: 'Rio de Janeiro', points: [
          'Designed and led the migration of ~15 critical payment and cart APIs from a PHP monolith to Go microservices on AWS SAM/Lambda, from the architecture to running them in production.',
          'Moved the invoice (Nota Fiscal) integration from the city system to the national one, a billing process the company can\'t stop.',
          'Found and fixed security vulnerabilities in the website and the internal admin systems.'
        ], stack: 'Go · Node.js · TypeScript · AWS Lambda/SAM · Terraform · MySQL · PostgreSQL · Docker' },
        { role: 'Software Developer', company: 'Mundiware', url: '', period: 'Nov 2017 – Jun 2022', place: 'Rio de Janeiro', points: [
          'Started as a web design technician and became a software developer within a year. Built web systems and applications on medium and large projects.'
        ], stack: '' },
        { role: 'Freelance Web Developer', company: 'Self-employed', url: '', period: '2015 – 2022', place: 'São Gonçalo, RJ', points: [
          'Websites and web apps for clients in several industries, owning scope, deadlines and delivery on my own.'
        ], stack: '' }
      ],
      workLabel: 'Latest work', seeAllShort: 'all →', seeAll: 'See all work', openJob: 'Open project →',
      worksTitle: 'All work', worksLead: 'Everything I\'ve built and can show. Newest first.',
      backHome: '← home', liveLink: 'Open live', repoLink: 'Source on GitHub ↗', imageLabel: 'Image',
      aboutLabel: 'About', aboutTitle: 'Hi, I\'m Lucas. I play with code for a living.',
      aboutP1: 'Backend engineer since 2017, freelancing since 2015. Go and serverless on AWS are home. I also write TypeScript and React when the product needs it, which is how I ship my side projects end to end. I got into this because building things is fun, and it still is.',
      aboutP2: 'I like ambiguous briefs and owning them end to end. On Longa, for example, I picked a rules engine over ML: less magic, but every plan change can explain itself, and it runs on the device with zero inference cost.',
      gopherCaption: 'player 1 · lucas',
      heroAlt: 'Pixel-art Lucas wearing TypeScript armor and React pants, holding a Go sword and a MySQL shield',
      invTitle: 'Inventory',
      slots: { weapon: 'weapon', armor: 'armor', pants: 'pants', shield: 'shield', boots: 'boots' },
      contactLabel: 'Contact', contactTitle: 'Hiring, or have something to build? Let\'s talk.',
      contactLead: 'I\'m open to senior backend roles, full-time or contract, and to freelance projects. I work remotely from Brazil (UTC−3), in English or Portuguese.',
      contactBtn: 'Say hi',
      formTitle: 'Get in touch', formSub: 'Tell me about the role or the project. I usually reply within a day.',
      nameLabel: 'Name', emailLabel: 'Email', msgLabel: 'Message',
      namePh: 'Your name', emailPh: 'you@company.com', msgPh: 'What are you trying to build?',
      sendBtn: 'Send', sendingBtn: 'Sending…', successTitle: 'Message sent',
      successMsg: 'Thanks. I\'ll get back to you soon.', sendAnother: 'Send another', orReach: 'or reach me on',
      errName: 'Please enter your name.', errEmail: 'Please enter a valid email.', errMessage: 'Please add a short message.',
      errSend: 'Couldn\'t send right now. Please try again or reach me on LinkedIn.',
      privacyLink: 'privacy', privTitle: 'Privacy',
      privP1: 'This site sets no cookies and runs no analytics.',
      privP2: 'The language lives in the page address. Nothing is stored in your browser.',
      privP3: 'The contact form sends your name, email and message to my inbox. I use them only to reply, and I delete them on request.',
      footerNote: '© 2026 Lucas Dantas',
      jobs: {
        longa: { title: 'Longa', subtitle: 'Training plans that adapt to how you actually ran', facts: ['Solo, end to end', 'Live on the web', 'Plan engine runs on the device'], desc: 'A running app that rewrites next week around what you actually did.', body1: 'Most training plans are static. Skip runs and the schedule ignores it. Longa builds a plan from a short assessment and, when you log an incomplete long run, a lost week or an injury, rewrites the weeks ahead with less volume and hard sessions turned easy. It never touches the current week or the race date.', body2: 'I built it solo, end to end: an Expo/React Native app that runs on web and Android, a Go API on Fly.io with Postgres, and a dependency-free TypeScript plan engine that runs on the device. Every change explains itself in plain language, so the runner knows why the week looks different.', body3: 'It also records runs by GPS with a map, imports from Health Connect, syncs local-first with last-write-wins and bills through Stripe, in three languages. It\'s live on the web and still pre-launch: Android passes the end-to-end suite but isn\'t in the store yet.', ph: ['current week on desktop', 'full plan and volume', 'plan rewrite with reasons', 'mobile onboarding and log'] },
        morada: { title: 'Morada', subtitle: 'Condominium management for admins and residents', facts: ['Solo, end to end', 'Built for a real building', '900+ tests, 80% coverage gate'], desc: 'A web app where the admin runs the building and residents pay the monthly fee via Pix.', body1: 'I built it for a real small building. The admin registers apartments and residents, issues the monthly fee, records expenses with their proofs and sends notices. Residents see their receipts, pay via Pix, upload the proof and follow the building\'s balance.', body2: 'The ledger is keyed by apartment rather than by person, so a resident can move out and the unit keeps its whole history. It\'s TypeScript end to end: React 19 on Cloudflare Pages, a Hono API on Fly.io, Postgres on Neon and proofs on R2. Everything scales to zero, so it costs about nothing to run.', body3: 'I built it feature-first, with lint enforcing the boundaries in both apps, and test-first the whole way: 900+ tests behind an 80% coverage gate, Playwright end to end in CI, and a check that ties every commit to a written spec. When main goes green it deploys itself.', ph: ['resident on mobile', 'admin on mobile'] },
        diariosg: { title: 'Diário SG', subtitle: 'São Gonçalo\'s official gazettes, made searchable', facts: ['Solo, end to end', '~162,000 acts indexed', 'MCP server with 12 tools'], desc: 'Splits São Gonçalo\'s official gazettes into searchable acts, tracks City Council bills, checks each company against other public data and emails alerts.', body1: 'São Gonçalo publishes two official gazettes, one from City Hall and one from the City Council, as long PDFs that hardly anyone reads. I built a pipeline that downloads each edition, runs OCR on scanned pages, splits it into acts like appointments, contracts, tenders and decrees, and indexes them for Portuguese full-text search. My local index holds 5,286 editions since 2010, about 162,000 acts. A second collector pulls nearly 50,000 City Council bills from 2014 on, works out each one\'s stage from its procedural history and links a bill to the law it became, so you can see which ones have sat in committee for months.', body2: 'You can search by name, CNPJ or subject and filter by act type, gazette, agency and theme, like the environment. A company\'s page puts the acts that cite it next to its federal tax registry record, CGU sanctions, TCE-RJ payments, City Hall spending commitments and PNCP contracts. Dashboards rank the largest suppliers and flag patterns worth a second look, like a no-bid purchase split into smaller ones or a newly opened company that gets an environmental licence. Save a term, CNPJ or process number, or just a set of filters, and you get an email when a new edition mentions it, or follow any search over RSS.', body3: 'There\'s also an MCP server. Each person generates a key and plugs the gazette into Claude, ChatGPT or Cursor, with 12 tools to search, read and cross-check acts. It\'s written in Go with clean architecture and Pub/Sub events between the scraper and the worker, and Postgres handles search with unaccent and trigram indexes. OCR output is cached in the bucket, which took reindexing a month from almost 10 minutes to 5 seconds. Terraform describes the whole Google Cloud stack, but I haven\'t deployed it yet.', ph: ['home page with the new visual identity', 'search filters in a dialog', 'environmental licence search with filters', 'company: tax registry record and gazette summary', 'company: City Hall spending commitments', 'email alert with filters, and RSS', 'City Council bills stalled in committee', 'a bill and the law it became', 'pattern: newly opened company gets an environmental licence', 'largest suppliers', 'MCP tools for your AI', 'search, filters and company page on mobile'] },
        forge: { title: 'Forge', subtitle: 'Component library and scaffolding CLI', desc: 'A toolbox so a small team can start a new page in minutes.', body1: 'A small product team was rebuilding the same buttons and forms on every page. Forge is the shared library plus a CLI that scaffolds a new page with the right pieces already wired.', body2: 'TypeScript, React and Vite. Documented with live examples so nobody has to ask how a component works.', ph: ['component gallery', 'CLI in action', 'docs page'] }
      }
    },
    pt: {
      metaTitleHome: 'Lucas Dantas | Engenheiro backend sênior · Go, AWS, TypeScript',
      metaDescHome: 'Lucas Dantas, engenheiro backend sênior no Rio de Janeiro. Go e serverless na AWS, TypeScript e React quando o produto pede. Aberto a vagas remotas.',
      metaTitleWorks: 'Trabalhos | Lucas Dantas, engenheiro backend sênior',
      metaDescWorks: 'Projetos de Lucas Dantas, de ponta a ponta: Longa (planos de corrida adaptativos), Morada (gestão de condomínios) e Diário SG (Diários Oficiais pesquisáveis).',
      metaTitleJob: '{title}: {subtitle} | Lucas Dantas',
      jobTitle: 'Engenheiro backend sênior',
      langName: 'Português',
      navWorks: 'Trabalhos', navXp: 'Experiência', tabXp: 'Carreira', navAbout: 'Sobre', navContact: 'Contato', tabHome: 'Início',
      heroKicker: 'backend · Go · AWS · TypeScript',
      availability: 'Aberto a vagas sênior de backend · remoto · UTC−3',
      heroTitle: 'Construo backends em Go rápidos e baratos de rodar.',
      heroSub: 'Na Personare, tirei ~15 APIs de pagamento e carrinho de um monólito PHP e levei para Go na AWS Lambda. A latência foi de ~3s para milissegundos e o custo de infraestrutura caiu cerca de 30%, em rotas usadas por milhões de pessoas.',
      ctaWork: 'Ver trabalhos', ctaResume: 'Currículo (PDF)', ctaHire: 'Dar um oi',
      resumeFile: 'curriculo.pdf',
      xpLabel: 'Experiência', xpTitle: 'Onde trabalhei',
      xpStats: [
        { value: '~15', label: 'APIs de pagamento e carrinho migradas para Go' },
        { value: '3s → ms', label: 'latência nas rotas críticas' },
        { value: '−30%', label: 'custo de infraestrutura' }
      ],
      xp: [
        { role: 'Engenheiro de Software', company: 'Personare', url: 'https://www.personare.com.br', period: 'jun 2022 – atual', place: 'Rio de Janeiro', points: [
          'Desenhei e liderei a migração de ~15 APIs críticas de pagamento e carrinho de um monólito PHP para microsserviços em Go com AWS SAM/Lambda, da arquitetura à operação em produção.',
          'Migrei a integração de Notas Fiscais do sistema da prefeitura para o sistema nacional, um processo de faturamento que não pode parar.',
          'Mapeei e corrigi falhas de segurança no site e nos sistemas administrativos internos.'
        ], stack: 'Go · Node.js · TypeScript · AWS Lambda/SAM · Terraform · MySQL · PostgreSQL · Docker' },
        { role: 'Programador', company: 'Mundiware', url: '', period: 'nov 2017 – jun 2022', place: 'Rio de Janeiro', points: [
          'Entrei como técnico em web design e virei programador em menos de um ano. Desenvolvi sistemas e aplicações web em projetos de médio e grande porte.'
        ], stack: '' },
        { role: 'Desenvolvedor web freelancer', company: 'Autônomo', url: '', period: '2015 – 2022', place: 'São Gonçalo, RJ', points: [
          'Sites e aplicações web para clientes de vários segmentos, cuidando sozinho de escopo, prazos e entrega.'
        ], stack: '' }
      ],
      workLabel: 'Últimos trabalhos', seeAllShort: 'todos →', seeAll: 'Ver todos os trabalhos', openJob: 'Abrir projeto →',
      worksTitle: 'Todos os trabalhos', worksLead: 'Tudo o que construí e posso mostrar. Do mais novo pro mais antigo.',
      backHome: '← início', liveLink: 'Abrir ao vivo', repoLink: 'Código no GitHub ↗', imageLabel: 'Imagem',
      aboutLabel: 'Sobre', aboutTitle: 'Oi, eu sou o Lucas. Brinco com código pra viver.',
      aboutP1: 'Engenheiro backend desde 2017, freelancer desde 2015. Go e serverless na AWS são minha casa. Também escrevo TypeScript e React quando o produto pede, e é assim que coloco meus projetos pessoais no ar de ponta a ponta. Entrei nisso porque construir coisas é divertido, e continua sendo.',
      aboutP2: 'Gosto de briefs ambíguos e de assumi-los de ponta a ponta. No Longa, por exemplo, escolhi um motor de regras em vez de ML: menos mágica, mas cada mudança no plano consegue se explicar, e roda no próprio aparelho, sem custo de inferência.',
      gopherCaption: 'jogador 1 · lucas',
      heroAlt: 'Lucas em pixel art com armadura de TypeScript e calça de React, segurando espada de Go e escudo de MySQL',
      invTitle: 'Inventário',
      slots: { weapon: 'arma', armor: 'armadura', pants: 'calça', shield: 'escudo', boots: 'bota' },
      contactLabel: 'Contato', contactTitle: 'Contratando ou tem algo pra construir? Vamos conversar.',
      contactLead: 'Estou aberto a vagas sênior de backend, CLT ou PJ, e a projetos freelance. Trabalho remoto do Brasil (UTC−3), em português ou inglês.',
      contactBtn: 'Dar um oi',
      formTitle: 'Entre em contato', formSub: 'Conte sobre a vaga ou o projeto. Costumo responder em até um dia.',
      nameLabel: 'Nome', emailLabel: 'E-mail', msgLabel: 'Mensagem',
      namePh: 'Seu nome', emailPh: 'voce@empresa.com', msgPh: 'O que você quer construir?',
      sendBtn: 'Enviar', sendingBtn: 'Enviando…', successTitle: 'Mensagem enviada',
      successMsg: 'Obrigado. Retorno em breve.', sendAnother: 'Enviar outra', orReach: 'ou me encontre em',
      errName: 'Digite seu nome.', errEmail: 'Digite um e-mail válido.', errMessage: 'Escreva uma breve mensagem.',
      errSend: 'Não foi possível enviar agora. Tente de novo ou me chame no LinkedIn.',
      privacyLink: 'privacidade', privTitle: 'Privacidade',
      privP1: 'Este site não usa cookies nem analytics.',
      privP2: 'O idioma fica no endereço da página. Nada é guardado no seu navegador.',
      privP3: 'O formulário de contato envia nome, e-mail e mensagem para minha caixa de entrada. Uso apenas para responder e apago quando pedido.',
      footerNote: '© 2026 Lucas Dantas',
      jobs: {
        longa: { title: 'Longa', subtitle: 'Planos de treino que se adaptam ao que você correu', facts: ['Sozinho, de ponta a ponta', 'No ar na web', 'Motor de planos roda no aparelho'], desc: 'Um app de corrida que reescreve a próxima semana a partir do que você fez.', body1: 'A maioria dos planos de treino é estática. Pule treinos e o cronograma ignora. O Longa monta o plano a partir de uma avaliação curta e, quando você registra um longão incompleto, uma semana perdida ou uma lesão, reescreve as semanas seguintes com menos volume e treino forte virando rodagem leve. Ele nunca mexe na semana atual nem na data da prova.', body2: 'Construí sozinho, de ponta a ponta: app Expo/React Native que roda na web e no Android, API em Go no Fly.io com Postgres e um motor de planos em TypeScript puro que roda no próprio aparelho. Cada mudança se explica em linguagem simples, pra que o corredor saiba por que a semana ficou diferente.', body3: 'Ele também grava corridas por GPS com mapa, importa do Health Connect, sincroniza local-first com last-write-wins e cobra pelo Stripe, em três idiomas. Está no ar na web e ainda em pré-lançamento: o Android passa na suíte de ponta a ponta, mas ainda não está na loja.', ph: ['semana atual no desktop', 'plano completo e volume', 'replanejamento explicado', 'onboarding e registro no celular'] },
        morada: { title: 'Morada', subtitle: 'Gestão de condomínios para síndicos e moradores', facts: ['Sozinho, de ponta a ponta', 'Feito para um prédio de verdade', '900+ testes, gate de 80% de cobertura'], desc: 'Um app web onde o síndico administra o prédio e os moradores pagam a taxa via Pix.', body1: 'Fiz para um prédio pequeno de verdade. O síndico cadastra apartamentos e moradores, emite a taxa mensal, registra as contas com comprovante e envia avisos. O morador vê seus recibos, paga via Pix, anexa o comprovante e acompanha o saldo do condomínio.', body2: 'O razão é chaveado pelo apartamento, e não pela pessoa, então o morador pode sair e a unidade mantém todo o histórico. É TypeScript de ponta a ponta: React 19 no Cloudflare Pages, API Hono no Fly.io, Postgres no Neon e comprovantes no R2. Tudo escala a zero, então custa quase nada pra manter.', body3: 'Construí feature-first, com lint garantindo as fronteiras nos dois apps, e com teste primeiro o tempo todo: mais de 900 testes atrás de um gate de 80% de cobertura, Playwright de ponta a ponta no CI e uma checagem que amarra cada commit a uma spec escrita. Quando a main fica verde, ela faz o deploy sozinha.', ph: ['morador no celular', 'síndico no celular'] },
        diariosg: { title: 'Diário SG', subtitle: 'Os Diários Oficiais de São Gonçalo, pesquisáveis', facts: ['Sozinho, de ponta a ponta', '~162 mil atos indexados', 'Servidor MCP com 12 ferramentas'], desc: 'Separa os Diários Oficiais de São Gonçalo em atos pesquisáveis, acompanha as proposições da Câmara, cruza cada empresa com outras bases públicas e manda alertas por e-mail.', body1: 'São Gonçalo publica dois Diários Oficiais, o da Prefeitura e o da Câmara, em PDFs longos que quase ninguém lê. Montei um pipeline que baixa cada edição, passa as páginas escaneadas por OCR, separa os atos (nomeações, contratos, licitações, decretos) e indexa tudo para busca em português. A base local tem 5.286 edições desde 2010 e cerca de 162 mil atos. Um segundo coletor traz quase 50 mil proposições da Câmara desde 2014, calcula a fase de cada uma pela tramitação e liga o projeto à lei que saiu dele, então dá para ver o que está parado em comissão há meses.', body2: 'Dá para buscar por nome, CNPJ ou assunto e filtrar por tipo de ato, diário, órgão e tema, como meio ambiente. A página de uma empresa junta os atos que citam ela com o cadastro na Receita, sanções da CGU, pagamentos do TCE-RJ, empenhos do portal da Prefeitura e contratos no PNCP. Os painéis listam os maiores fornecedores e apontam padrões que pedem uma segunda olhada, como dispensa de licitação fracionada ou empresa recém-aberta que ganha licença ambiental. Salve um termo, um CNPJ, um processo ou só um conjunto de filtros e você recebe um e-mail quando ele aparecer numa edição nova. Quem prefere pode assinar qualquer busca por RSS.', body3: 'Também tem um servidor MCP: cada pessoa gera a própria chave e liga o Diário no Claude, no ChatGPT ou no Cursor, com 12 ferramentas para buscar, ler e cruzar atos. É escrito em Go com arquitetura limpa e eventos no Pub/Sub entre o scraper e o worker, e a busca fica no Postgres com unaccent e índices de trigrama. O texto do OCR fica guardado no bucket, e reindexar um mês caiu de quase 10 minutos para 5 segundos. O Terraform descreve a stack inteira no Google Cloud, mas ainda não subi para produção.', ph: ['página inicial com a identidade nova', 'filtros da busca em diálogo', 'busca de licenças ambientais com filtros', 'empresa: cadastro na Receita e resumo nos Diários', 'empresa: empenhos no portal da Prefeitura', 'alerta por e-mail com filtros e RSS', 'proposições da Câmara paradas em comissão', 'projeto de lei e a lei que resultou dele', 'padrão: empresa nova recebe licença ambiental', 'maiores fornecedores', 'ferramentas MCP para a sua IA', 'busca, filtros e empresa no celular'] },
        forge: { title: 'Forge', subtitle: 'Biblioteca de componentes e CLI de scaffolding', desc: 'Uma caixa de ferramentas pra um time pequeno começar uma página nova em minutos.', body1: 'Um time de produto pequeno refazia os mesmos botões e formulários em toda página. O Forge é a biblioteca compartilhada mais uma CLI que cria uma página nova já com as peças certas ligadas.', body2: 'TypeScript, React e Vite. Documentado com exemplos ao vivo pra ninguém precisar perguntar como um componente funciona.', ph: ['galeria de componentes', 'CLI em ação', 'página de docs'] }
      }
    }
  };

  var JOBS = [
    { slug: 'longa', year: '2026', stack: 'React Native · Go · PostgreSQL · Fly.io', live: 'https://app.longa.run', repo: '', images: ['imgs/longa/01-week-view.webp', 'imgs/longa/02-full-plan.webp', 'imgs/longa/03-plan-rewrite.webp', 'imgs/longa/04-mobile.webp'] },
    { slug: 'morada', year: '2026', stack: 'React · TypeScript · Hono · PostgreSQL', live: 'https://morada-a6g.pages.dev', repo: 'https://github.com/Lucantas/morada-app', images: ['imgs/morada/01-resident-mobile.webp', 'imgs/morada/02-admin-mobile.webp'] },
    { slug: 'diariosg', year: '2026', stack: 'Go · React · Postgres · MCP · GCP · Terraform', live: '', repo: 'https://github.com/Lucantas/diario-sg', images: ['imgs/diariosg/01-inicio.webp', 'imgs/diariosg/02-filtros.webp', 'imgs/diariosg/03-busca.webp', 'imgs/diariosg/04-empresa-cadastro.webp', 'imgs/diariosg/05-empresa-pagamentos.webp', 'imgs/diariosg/06-alerta.webp', 'imgs/diariosg/07-proposicoes.webp', 'imgs/diariosg/08-proposicao.webp', 'imgs/diariosg/09-padroes.webp', 'imgs/diariosg/10-fornecedores.webp', 'imgs/diariosg/11-mcp.webp', 'imgs/diariosg/12-mobile.webp'] },
    { slug: 'forge', hidden: true, year: '2023', stack: 'TypeScript · React · Vite', live: '', repo: 'https://github.com/Lucantas', images: [] }
  ];

  var GEAR = [
    { name: 'Go', kind: 'weapon', sprite: 'sword', colors: { p: '#00ADD8', l: '#9EE6F5' } },
    { name: 'Node.js', kind: 'weapon', sprite: 'bow', colors: { p: '#339933', l: '#9BD99B', b: '#9BD99B' } },
    { name: 'PHP', kind: 'weapon', sprite: 'crossbow', colors: { p: '#777BB4', l: '#C9CBEB' } },
    { name: 'TypeScript', kind: 'armor', sprite: 'armor', colors: { p: '#3178C6', l: '#A9CBF0', d: '#235A96' } },
    { name: 'React', kind: 'pants', sprite: 'pants', colors: { p: '#3A4756', l: '#61DAFB', d: '#20232A' } },
    { name: 'PostgreSQL', kind: 'shield', sprite: 'shield', colors: { p: '#336791', l: '#CFE0F0' } },
    { name: 'MySQL', kind: 'shield', sprite: 'shield', colors: { p: '#00758F', l: '#F29111' } },
    { name: 'AWS', kind: 'boots', sprite: 'boots', colors: { p: '#FF9900', l: '#FFD9A0', d: '#B86D00' } },
    { name: 'Terraform', kind: 'boots', sprite: 'boots', colors: { p: '#7B42BC', l: '#CDB5EA', d: '#56308A' } },
    { name: 'Docker', kind: 'boots', sprite: 'boots', colors: { p: '#2496ED', l: '#B5D8F8', d: '#1A6DB0' } }
  ];

  var SITE = {
    url: 'https://lucantas.github.io/portfolio/',
    name: 'Lucas Dantas',
    handle: 'lucantas',
    avatar: '',
    github: 'https://github.com/Lucantas',
    linkedin: 'https://br.linkedin.com/in/lucantas',
    email: 'lucas.lucantas38@gmail.com',
    locality: 'São Gonçalo',
    region: 'RJ',
    country: 'BR',
    featured: 'longa',
    ogImage: { src: 'imgs/og/site.png', width: 1200, height: 630 }
  };

  var ROUTES = {
    en: { home: '', works: 'work/', locale: 'en_US', htmlLang: 'en' },
    pt: { home: 'pt/', works: 'pt/trabalhos/', locale: 'pt_BR', htmlLang: 'pt-BR' }
  };

  function jobPath(lang, slug) { return ROUTES[lang].works + slug + '/'; }

  function visibleJobs(lang) {
    return JOBS.filter(function (j) { return !j.hidden; }).map(function (j) {
      return Object.assign({}, j, DICT[lang].jobs[j.slug]);
    });
  }

  function jobPageTitle(lang, job) {
    return DICT[lang].metaTitleJob.replace('{title}', job.title).replace('{subtitle}', job.subtitle);
  }

  root.PORTFOLIO = { DICT: DICT, JOBS: JOBS, GEAR: GEAR, SITE: SITE, ROUTES: ROUTES, jobPath: jobPath, visibleJobs: visibleJobs, jobPageTitle: jobPageTitle };
})(typeof window !== 'undefined' ? window : globalThis);
