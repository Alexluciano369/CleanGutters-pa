import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const routes = [
  {
    path: '/gutter-services',
    title: 'Gutter Services Eastern PA | Cleaning, Repair & Installation',
    description: 'Gutter cleaning, repair, downspouts, replacement and gutter guards across 13 Eastern Pennsylvania counties. Free inspection and estimate.',
    h1: 'One Local Company for Any Gutter Problem in Eastern Pennsylvania',
    intro: 'Cleaning, leaks, sagging gutters, downspouts, seamless replacement and permanent micro-mesh guards. Alex inspects the whole system and explains the right fix without pressure.',
    service: 'All Gutter Services',
  },
  {
    path: '/gutter-cleaning',
    title: 'Gutter Cleaning Eastern PA | Free Gutter-System Inspection',
    description: 'Professional gutter cleaning and a full gutter-system inspection across Eastern Pennsylvania. No advertised gimmick price, no pressure and no obligation.',
    h1: 'Gutter Cleaning and Inspection Across Eastern Pennsylvania',
    intro: 'We clear gutters and downspouts, then inspect for leaks, loose sections, poor drainage and repeat-clog risks. No advertised cleaning-price gimmick.',
    service: 'Gutter Cleaning and Inspection',
  },
  {
    path: '/gutter-repair',
    title: 'Gutter Repair & Downspouts Eastern PA | CleanGutters Lighting',
    description: 'Fix leaking, sagging or overflowing gutters and damaged downspouts across Eastern Pennsylvania. Full-system inspection and free estimate.',
    h1: 'Gutter Repair and Downspout Service Across Eastern Pennsylvania',
    intro: 'We find and fix leaks, failed seams, poor pitch, loose gutters, damaged downspouts and drainage problems at the source.',
    service: 'Gutter Repair and Downspouts',
  },
  {
    path: '/gutter-installation',
    title: 'Seamless Gutter Installation Eastern PA | CleanGutters Lighting',
    description: 'Custom seamless gutter installation and replacement across Eastern Pennsylvania. Proper pitch, downspout placement and free estimate.',
    h1: 'Seamless Gutter Installation Across Eastern Pennsylvania',
    intro: 'Custom seamless gutters measured for your home, set to the correct pitch and paired with downspouts that move water away from the foundation.',
    service: 'Gutter Installation and Replacement',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | CleanGutters Lighting',
    description: 'Privacy policy for CleanGutters Lighting and cleangutters-pa.com.',
    h1: 'Privacy Policy',
    intro: 'How CleanGutters Lighting handles information submitted through this website.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | CleanGutters Lighting',
    description: 'Terms of service for CleanGutters Lighting and cleangutters-pa.com.',
    h1: 'Terms of Service',
    intro: 'Terms governing the use of this website and estimate requests.',
  },
];

const counties = ['Berks','Bucks','Carbon','Chester','Delaware','Lancaster','Lehigh','Monroe','Montgomery','Northampton','Philadelphia','Pike','Schuylkill'];
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const template = await readFile(join('dist', 'index.html'), 'utf8');

for (const route of routes) {
  const canonical = `https://cleangutters-pa.com${route.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="title" content="[^"]*"\s*\/?>/, `<meta name="title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);

  const fallback = `<main style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:40px 20px;color:#0f172a;line-height:1.6"><p style="font-weight:700;color:#047857">CleanGutters Lighting · Serving Eastern Pennsylvania</p><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.intro)}</p><p><strong>Request your free estimate:</strong> <a href="tel:+18568746640">Call (856) 874-6640</a>. No obligation and no spam.</p></main>`;
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<script type="module"/, `<div id="root">${fallback}</div>\n    <script type="module"`);

  if (route.service) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.service,
      description: route.description,
      url: canonical,
      provider: {
        '@type': 'HomeAndConstructionBusiness',
        name: 'CleanGutters Lighting',
        telephone: '+18568746640',
        url: 'https://cleangutters-pa.com/',
      },
      areaServed: counties.map((county) => ({ '@type': 'AdministrativeArea', name: `${county} County, Pennsylvania` })),
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`);
  }

  await writeFile(join('dist', `${route.path.slice(1)}.html`), html);
}
