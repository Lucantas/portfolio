(function (root) {
  'use strict';

  var DICT = {
    en: {
      metaTitleHome: 'Lucas Dantas | Backend Engineer · Go, AWS & Payments',
      metaDescHome: 'Lucas Dantas, backend engineer in Rio de Janeiro, Brazil. Payments, billing and subscriptions in Go on AWS. Open to remote roles.',
      metaTitleWorks: 'Work | Lucas Dantas, Backend Engineer',
      metaDescWorks: 'Projects built end to end by Lucas Dantas: Longa (adaptive running plans), Morada (condominium management) and Diário SG (searchable official gazettes).',
      metaTitleJob: '{title}: {subtitle} | Lucas Dantas',
      jobTitle: 'Backend Engineer',
      langName: 'English',
      navWorks: 'Work', navXp: 'Experience', tabXp: 'Career', navAbout: 'About', navContact: 'Contact', tabHome: 'Home',
      heroKicker: 'backend · Go · AWS · payments',
      availability: 'Open to senior backend roles · remote · UTC−3',
      heroTitle: 'I build fast, cheap-to-run backends in Go.',
      heroSub: 'At Personare I moved ~15 payment and cart APIs off a PHP monolith to Go on AWS Lambda. Infrastructure costs dropped about 30% and read routes went from ~3s to ~5 ms. Checkout now handles ~10M requests and ~11k paid orders a month.',
      ctaWork: 'See my work', ctaResume: 'Résumé (PDF)', ctaHire: 'Say hi',
      resumeFile: 'resume.pdf',
      xpLabel: 'Experience', xpTitle: 'Where I\'ve worked',
      xpStats: [
        { value: '~15', label: 'payment & cart APIs moved to Go' },
        { value: '~5 ms', label: 'p50 on read routes, down from ~3s' },
        { value: '−30%', label: 'infrastructure cost' }
      ],
      xp: [
        { role: 'Software Engineer', company: 'Personare', url: 'https://www.personare.com.br', period: 'Jun 2022 – present', place: 'Rio de Janeiro', points: [
          'Acted as backend lead on an engineering team of up to 10, reporting directly to the CTO. Bootstrapped the Go backend monorepo and its conventions (spec-first workflow, dependency boundaries, 80% coverage gates, OpenAPI contract tests), which the team adopted as its standard.',
          'Ran the spike, wrote the stories and led the migration of ~15 payment and cart APIs from a PHP monolith to Go on AWS Lambda in 8 weeks, redesigning a rigid API contract with no rollback needed. Checkout now serves ~10M requests and ~11k paid orders a month across card, Pix, PayPal, Apple Pay and Google Pay.',
          'Moved post-purchase work (confirmation email, analytics, Salesforce sync) off the critical path onto EventBridge and SQS with DLQs, so a downstream failure never blocks a purchase. Added idempotency to retried flows and a transactional outbox.',
          'Designed and shipped invoice issuing on Brazil\'s national e-invoice system (NFS-e) ahead of its 2026 legal deadline: ~11k invoices a month, 115k+ so far, 0.03% left pending.',
          'Root-caused a 27% drop in an email alert product sending ~2.2M emails a day within 3 hours of detection, recalculated 1.25M users and wrote the postmortem.',
          'Introduced alarms as code across 12+ services, where detection used to depend on users complaining, then removed ~107 noisy alarms so the rest get acted on.',
          'Hardened payment security: a legacy card vault stopped retaining PAN and CVV, fixed open-redirect and authorization flaws, and led the same-day patch of a critical PHP-FPM RCE.',
          'Moved a legacy WordPress commerce service from a single EC2 host to ECS Fargate and Aurora Serverless v2 with Terraform, runbooks and a rehearsed rollback.',
          'Initiated and co-led the new internal admin (Next.js, plus Go on 15 Lambdas with an audit trail) that gives Support, Marketing and Product self-service.',
          'On the Go astrology APIs (100M+ invocations a month), built the eclipses endpoint and migrated the Professional Chart from PHP with tests that diff it against the legacy output.'
        ], stack: 'Go · Node.js · TypeScript · Next.js · React · AWS Lambda/SAM · AppSync GraphQL · CloudWatch · Terraform · MySQL · PostgreSQL · DynamoDB · Docker' },
        { role: 'Software Developer', company: 'Mundiware', url: '', period: 'Nov 2017 – Jun 2022', place: 'Rio de Janeiro', points: [
          'Started as a web design technician and became a software developer within a year.',
          'Migrated the ad management system behind the print classifieds of 5+ newspapers and the online classifieds of 3+ from Visual Basic to .NET Core with a web front end.',
          'Built the TV ad management module.',
          'Built ETLs that bring ads from several suppliers into the online classifieds automatically.',
          'Extended the company\'s in-house template language with features that made web development easier and rendering lighter.',
          'Trained two web designers.'
        ], stack: 'C# · .NET Core · SQL Server · Visual Basic' },
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
        diariosg: { title: 'Diário SG', subtitle: 'São Gonçalo\'s official gazettes, made searchable', facts: ['Solo, end to end', '~162,000 acts indexed', 'MCP server with 12 tools'], desc: 'Splits São Gonçalo\'s official gazettes into searchable acts, tracks City Council bills, checks each company against other public data and emails alerts.', body1: 'São Gonçalo publishes two official gazettes, one from City Hall and one from the City Council, as long PDFs that hardly anyone reads. I built a pipeline that downloads each edition, runs OCR on scanned pages, splits it into acts like appointments, contracts, tenders and decrees, and indexes them for Portuguese full-text search. The index holds 5,286 editions since 2010, about 162,000 acts. A second collector pulls nearly 50,000 City Council bills from 2014 on, works out each one\'s stage from its procedural history and links a bill to the law it became, so you can see which ones have sat in committee for months.', body2: 'You can search by name, CNPJ or subject and filter by act type, gazette, agency and theme, like the environment. A company\'s page puts the acts that cite it next to its federal tax registry record, CGU sanctions, TCE-RJ payments, City Hall spending commitments and PNCP contracts. Dashboards rank the largest suppliers and flag patterns worth a second look, like a no-bid purchase split into smaller ones or a newly opened company that gets an environmental licence. Save a term, CNPJ or process number, or just a set of filters, and you get an email when a new edition mentions it, or follow any search over RSS.', body3: 'There\'s also an MCP server. Each person generates a key and plugs the gazette into Claude, ChatGPT or Cursor, with 12 tools to search, read and cross-check acts. It\'s written in Go with clean architecture and events between the scraper and the worker, and Postgres handles search with unaccent and trigram indexes. Caching the OCR output took reindexing a month from almost 10 minutes to 5 seconds. It runs live at diariosg.com.br on free tiers: collection and data loads on scheduled GitHub Actions, the API and site on Render, Postgres on Neon. To fit the 1 GB database limit I swapped a 224 MB trigram index for a 20 MB one over the numbers in each act, with the same search results. Terraform keeps a Google Cloud version ready.', ph: ['home page with the new visual identity', 'search filters in a dialog', 'environmental licence search with filters', 'company: tax registry record and gazette summary', 'company: City Hall spending commitments', 'email alert with filters, and RSS', 'City Council bills stalled in committee', 'a bill and the law it became', 'pattern: newly opened company gets an environmental licence', 'largest suppliers', 'MCP tools for your AI', 'search, filters and company page on mobile'] },
        forge: { title: 'Forge', subtitle: 'Component library and scaffolding CLI', desc: 'A toolbox so a small team can start a new page in minutes.', body1: 'A small product team was rebuilding the same buttons and forms on every page. Forge is the shared library plus a CLI that scaffolds a new page with the right pieces already wired.', body2: 'TypeScript, React and Vite. Documented with live examples so nobody has to ask how a component works.', ph: ['component gallery', 'CLI in action', 'docs page'] }
      }
    },
    pt: {
      metaTitleHome: 'Lucas Dantas | Engenheiro backend · Go, AWS e pagamentos',
      metaDescHome: 'Lucas Dantas, engenheiro backend no Rio de Janeiro. Pagamentos, faturamento e assinaturas em Go na AWS. Aberto a vagas remotas.',
      metaTitleWorks: 'Trabalhos | Lucas Dantas, engenheiro backend',
      metaDescWorks: 'Projetos de Lucas Dantas, de ponta a ponta: Longa (planos de corrida adaptativos), Morada (gestão de condomínios) e Diário SG (Diários Oficiais pesquisáveis).',
      metaTitleJob: '{title}: {subtitle} | Lucas Dantas',
      jobTitle: 'Engenheiro backend',
      langName: 'Português',
      navWorks: 'Trabalhos', navXp: 'Experiência', tabXp: 'Carreira', navAbout: 'Sobre', navContact: 'Contato', tabHome: 'Início',
      heroKicker: 'backend · Go · AWS · pagamentos',
      availability: 'Aberto a vagas sênior de backend · remoto · UTC−3',
      heroTitle: 'Construo backends em Go rápidos e baratos de rodar.',
      heroSub: 'Na Personare, tirei ~15 APIs de pagamento e carrinho de um monólito PHP e levei para Go na AWS Lambda. O custo de infraestrutura caiu cerca de 30% e as rotas de leitura foram de ~3s para ~5 ms. Hoje o checkout atende ~10 milhões de requisições e ~11 mil pedidos pagos por mês.',
      ctaWork: 'Ver trabalhos', ctaResume: 'Currículo (PDF)', ctaHire: 'Dar um oi',
      resumeFile: 'curriculo.pdf',
      xpLabel: 'Experiência', xpTitle: 'Onde trabalhei',
      xpStats: [
        { value: '~15', label: 'APIs de pagamento e carrinho migradas para Go' },
        { value: '~5 ms', label: 'p50 nas rotas de leitura, antes ~3s' },
        { value: '−30%', label: 'custo de infraestrutura' }
      ],
      xp: [
        { role: 'Engenheiro de Software', company: 'Personare', url: 'https://www.personare.com.br', period: 'jun 2022 – atual', place: 'Rio de Janeiro', points: [
          'Atuei como referência de backend num time de engenharia de até 10 pessoas, reportando direto ao CTO. Criei o monorepo de backend em Go e suas convenções (spec antes do código, fronteiras de dependência, gate de 80% de cobertura, testes de contrato OpenAPI), adotadas pelo time como padrão.',
          'Conduzi o spike, escrevi as histórias e liderei a migração de ~15 APIs de pagamento e carrinho de um monólito PHP para Go na AWS Lambda em 8 semanas, redesenhando um contrato de API engessado, sem precisar de rollback. Hoje o checkout atende ~10 milhões de requisições e ~11 mil pedidos pagos por mês, com cartão, Pix, PayPal, Apple Pay e Google Pay.',
          'Tirei o pós-compra (e-mail de confirmação, analytics, envio ao Salesforce) do caminho crítico com EventBridge e SQS com DLQs: uma falha nesses fluxos nunca bloqueia a compra. Adicionei idempotência aos fluxos com retry e um transactional outbox.',
          'Desenhei e entreguei a emissão de NFS-e no sistema nacional antes do prazo legal de 2026: ~11 mil notas por mês, mais de 115 mil emitidas, 0,03% pendentes.',
          'Achei em 3 horas a causa de uma queda de 27% num produto de alertas que envia ~2,2 milhões de e-mails por dia, recalculei 1,25 milhão de usuários e escrevi o postmortem.',
          'Criei alarmes como código em mais de 12 serviços onde a detecção dependia do usuário reclamar, e depois removi ~107 alarmes ruidosos para que os restantes fossem levados a sério.',
          'Reforcei a segurança de pagamentos: um cofre de cartões legado parou de reter PAN e CVV, corrigi falhas de open redirect e de autorização e conduzi no mesmo dia a correção de uma RCE crítica no PHP-FPM.',
          'Migrei um e-commerce em WordPress de um único EC2 para ECS Fargate e Aurora Serverless v2 com Terraform, runbooks e rollback ensaiado.',
          'Propus e co-liderei o novo admin interno (Next.js, mais Go em 15 Lambdas com trilha de auditoria), que dá autonomia a Suporte, Marketing e Produto.',
          'Nas APIs de astrologia em Go (mais de 100 milhões de invocações por mês), criei o endpoint de eclipses e migrei o Mapa Profissional do PHP com testes que comparam a saída com a do legado.'
        ], stack: 'Go · Node.js · TypeScript · Next.js · React · AWS Lambda/SAM · AppSync GraphQL · CloudWatch · Terraform · MySQL · PostgreSQL · DynamoDB · Docker' },
        { role: 'Programador', company: 'Mundiware', url: '', period: 'nov 2017 – jun 2022', place: 'Rio de Janeiro', points: [
          'Entrei como técnico em web design e virei programador em menos de um ano.',
          'Migrei o sistema de gestão de anúncios usado pelos classificados impressos de mais de 5 jornais e pelos classificados online de mais de 3, de Visual Basic para .NET Core com front-end web.',
          'Criei o módulo de gestão de anúncios para televisão.',
          'Construí ETLs que levam anúncios de vários fornecedores para os classificados online de forma automática.',
          'Evoluí a linguagem de template própria da empresa com recursos que facilitaram o desenvolvimento web e deixaram as renderizações mais leves.',
          'Treinei dois web designers.'
        ], stack: 'C# · .NET Core · SQL Server · Visual Basic' },
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
        diariosg: { title: 'Diário SG', subtitle: 'Os Diários Oficiais de São Gonçalo, pesquisáveis', facts: ['Sozinho, de ponta a ponta', '~162 mil atos indexados', 'Servidor MCP com 12 ferramentas'], desc: 'Separa os Diários Oficiais de São Gonçalo em atos pesquisáveis, acompanha as proposições da Câmara, cruza cada empresa com outras bases públicas e manda alertas por e-mail.', body1: 'São Gonçalo publica dois Diários Oficiais, o da Prefeitura e o da Câmara, em PDFs longos que quase ninguém lê. Montei um pipeline que baixa cada edição, passa as páginas escaneadas por OCR, separa os atos (nomeações, contratos, licitações, decretos) e indexa tudo para busca em português. A base tem 5.286 edições desde 2010 e cerca de 162 mil atos. Um segundo coletor traz quase 50 mil proposições da Câmara desde 2014, calcula a fase de cada uma pela tramitação e liga o projeto à lei que saiu dele, então dá para ver o que está parado em comissão há meses.', body2: 'Dá para buscar por nome, CNPJ ou assunto e filtrar por tipo de ato, diário, órgão e tema, como meio ambiente. A página de uma empresa junta os atos que citam ela com o cadastro na Receita, sanções da CGU, pagamentos do TCE-RJ, empenhos do portal da Prefeitura e contratos no PNCP. Os painéis listam os maiores fornecedores e apontam padrões que pedem uma segunda olhada, como dispensa de licitação fracionada ou empresa recém-aberta que ganha licença ambiental. Salve um termo, um CNPJ, um processo ou só um conjunto de filtros e você recebe um e-mail quando ele aparecer numa edição nova. Quem prefere pode assinar qualquer busca por RSS.', body3: 'Também tem um servidor MCP: cada pessoa gera a própria chave e liga o Diário no Claude, no ChatGPT ou no Cursor, com 12 ferramentas para buscar, ler e cruzar atos. É escrito em Go com arquitetura limpa e eventos entre o scraper e o worker, e a busca fica no Postgres com unaccent e índices de trigrama. Guardar o texto do OCR fez reindexar um mês cair de quase 10 minutos para 5 segundos. Está no ar em diariosg.com.br em planos gratuitos: coleta e cargas agendadas no GitHub Actions, API e site no Render, Postgres no Neon. Para caber no limite de 1 GB do banco, troquei um índice de trigrama de 224 MB por um de 20 MB só com os números de cada ato, com os mesmos resultados de busca. O Terraform deixa pronta uma versão no Google Cloud.', ph: ['página inicial com a identidade nova', 'filtros da busca em diálogo', 'busca de licenças ambientais com filtros', 'empresa: cadastro na Receita e resumo nos Diários', 'empresa: empenhos no portal da Prefeitura', 'alerta por e-mail com filtros e RSS', 'proposições da Câmara paradas em comissão', 'projeto de lei e a lei que resultou dele', 'padrão: empresa nova recebe licença ambiental', 'maiores fornecedores', 'ferramentas MCP para a sua IA', 'busca, filtros e empresa no celular'] },
        forge: { title: 'Forge', subtitle: 'Biblioteca de componentes e CLI de scaffolding', desc: 'Uma caixa de ferramentas pra um time pequeno começar uma página nova em minutos.', body1: 'Um time de produto pequeno refazia os mesmos botões e formulários em toda página. O Forge é a biblioteca compartilhada mais uma CLI que cria uma página nova já com as peças certas ligadas.', body2: 'TypeScript, React e Vite. Documentado com exemplos ao vivo pra ninguém precisar perguntar como um componente funciona.', ph: ['galeria de componentes', 'CLI em ação', 'página de docs'] }
      }
    }
  };

  var JOBS = [
    { slug: 'longa', year: '2026', stack: 'React Native · Go · PostgreSQL · Fly.io', live: 'https://app.longa.run', repo: '', images: ['imgs/longa/01-week-view.webp', 'imgs/longa/02-full-plan.webp', 'imgs/longa/03-plan-rewrite.webp', 'imgs/longa/04-mobile.webp'] },
    { slug: 'morada', year: '2026', stack: 'React · TypeScript · Hono · PostgreSQL', live: 'https://morada-a6g.pages.dev', repo: 'https://github.com/Lucantas/morada-app', images: ['imgs/morada/01-resident-mobile.webp', 'imgs/morada/02-admin-mobile.webp'] },
    { slug: 'diariosg', year: '2026', stack: 'Go · React · Postgres · MCP · GitHub Actions · Render', live: 'https://diariosg.com.br', repo: 'https://github.com/Lucantas/diario-sg', images: ['imgs/diariosg/01-inicio.webp', 'imgs/diariosg/02-filtros.webp', 'imgs/diariosg/03-busca.webp', 'imgs/diariosg/04-empresa-cadastro.webp', 'imgs/diariosg/05-empresa-pagamentos.webp', 'imgs/diariosg/06-alerta.webp', 'imgs/diariosg/07-proposicoes.webp', 'imgs/diariosg/08-proposicao.webp', 'imgs/diariosg/09-padroes.webp', 'imgs/diariosg/10-fornecedores.webp', 'imgs/diariosg/11-mcp.webp', 'imgs/diariosg/12-mobile.webp'] },
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
    email: 'lucantas.dev@gmail.com',
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
