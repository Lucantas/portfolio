import { LANGS, counterpartPath, escapeHtml as e } from './content.mjs';
import { absoluteUrl } from './seo.mjs';

const HREFLANG = { en: 'en', pt: 'pt-BR' };

export function sitemapXml(P, pages) {
  const urls = pages.map((page) => {
    const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${e(absoluteUrl(P.SITE, counterpartPath(P, page, l)))}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${e(absoluteUrl(P.SITE, counterpartPath(P, page, 'en')))}"/>`);
    return `  <url>\n    <loc>${e(absoluteUrl(P.SITE, page.path))}</loc>\n${alternates.join('\n')}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

export function robotsTxt(P) {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl(P.SITE, 'sitemap.xml')}
`;
}

export function llmsTxt(P) {
  const { SITE, DICT } = P;
  const dict = DICT.en;
  const jobs = P.visibleJobs('en');
  const projectLinks = jobs.map((job) => {
    const extra = [job.live && `live: ${job.live}`, job.repo && `source: ${job.repo}`].filter(Boolean).join(', ');
    return `- [${job.title}](${absoluteUrl(SITE, P.jobPath('en', job.slug))}): ${job.desc} Stack: ${job.stack}.${extra ? ` (${extra})` : ''}`;
  });
  const experience = dict.xp.map((x) => [`### ${x.role} · ${x.company} (${x.period})`, '', ...x.points.map((pt) => `- ${pt}`), x.stack ? `\nStack: ${x.stack}` : ''].join('\n').trimEnd());
  const details = jobs.map((job) => [`### ${job.title}: ${job.subtitle}`, '', job.body1, '', job.body2, job.body3 ? `\n${job.body3}` : ''].join('\n').trimEnd());
  return `# ${SITE.name}

> ${dict.jobTitle} based in ${SITE.locality}, ${SITE.region}, Brazil. ${dict.availability}.

${dict.heroSub}

${dict.aboutP1}

${dict.aboutP2}

The site is available in English (${SITE.url}) and Brazilian Portuguese (${absoluteUrl(SITE, P.ROUTES.pt.home)}).

## Experience

${experience.join('\n\n')}

## Projects

${projectLinks.join('\n')}

## Contact

- Email: ${SITE.email}
- [Résumé (PDF)](${absoluteUrl(SITE, dict.resumeFile)})
- [GitHub](${SITE.github})
- [LinkedIn](${SITE.linkedin})
- [All work](${absoluteUrl(SITE, P.ROUTES.en.works)})

## Project details

${details.join('\n\n')}
`;
}
