#!/usr/bin/env node
// Checks the built site in dist/ for the on-page SEO rules: one H1, canonical, parseable JSON-LD,
// resolving internal links, sitemap entries, homepage FAQ ↔ FAQPage parity, and featured-guide
// feature images. Run after `npm run build`: `npm run verify:seo`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://launchbuddy.app';
const errors = [];
const warnings = [];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const stripTags = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const meta = (html, key) =>
  html.match(new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`))?.[1];

/** Maps a site path (or absolute launchbuddy.app URL) to the file it should resolve to in dist/. */
function distFile(url) {
  const path = decodeURI(url.replace(SITE, '').split(/[?#]/)[0]);
  if (path.endsWith('/')) return join(DIST, path, 'index.html');
  return join(DIST, path);
}

function imageSize(file) {
  const buf = readFileSync(file);
  if (buf.toString('ascii', 1, 4) === 'PNG') return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length) {
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  return undefined;
}

const pages = walk(DIST).filter((file) => file.endsWith('index.html'));
const idsByFile = new Map();
const jsonLdByFile = new Map();

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const name = '/' + relative(DIST, file).replace(/index\.html$/, '');
  idsByFile.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) errors.push(`${name}: ${h1Count} <h1> elements`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) errors.push(`${name}: missing canonical`);
  else if (canonical !== SITE + name) errors.push(`${name}: canonical is ${canonical}`);

  const title = stripTags(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  if (!title) errors.push(`${name}: missing <title>`);
  else if (title.length > 60) warnings.push(`${name}: title is ${title.length} chars`);
  const description = decode(meta(html, 'description') ?? '');
  if (!description) errors.push(`${name}: missing meta description`);
  else if (description.length > 155) warnings.push(`${name}: description is ${description.length} chars`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(
    ([, json]) => {
      try {
        return [JSON.parse(json)];
      } catch (error) {
        errors.push(`${name}: JSON-LD does not parse (${error.message})`);
        return [];
      }
    },
  );
  jsonLdByFile.set(file, blocks);

  const ogImage = meta(html, 'og:image');
  if (!ogImage) errors.push(`${name}: missing og:image`);
  else if (ogImage.startsWith(SITE) && !existsSync(distFile(ogImage))) {
    errors.push(`${name}: og:image ${ogImage} not in dist`);
  }
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const name = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((match) => match[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((match) =>
      match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]),
    ),
  ];
  for (const ref of new Set(refs.map(decode))) {
    const isInternal = (ref.startsWith('/') && !ref.startsWith('//')) || ref.startsWith(SITE) || ref.startsWith('#');
    if (!isInternal) continue;
    const [pathPart, hash] = ref.split('#');
    const target = pathPart === '' ? file : distFile(pathPart);
    if (!existsSync(target)) {
      errors.push(`${name}: broken internal link ${ref}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !idsByFile.get(target)?.has(hash)) {
      errors.push(`${name}: link ${ref} points at a missing #${hash}`);
    }
  }
}

// Sitemap
const sitemapFiles = walk(DIST).filter((file) => /sitemap-\d+\.xml$/.test(file));
if (sitemapFiles.length === 0) errors.push('no sitemap-N.xml in dist');
const locs = sitemapFiles.flatMap((file) =>
  [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);
for (const loc of locs) if (!existsSync(distFile(loc))) errors.push(`sitemap: ${loc} has no file`);
if (!existsSync(join(DIST, 'robots.txt'))) errors.push('robots.txt missing');
else if (!/Sitemap:\s*https:\/\/launchbuddy\.app\/sitemap-index\.xml/.test(readFileSync(join(DIST, 'robots.txt'), 'utf8'))) {
  errors.push('robots.txt does not point at sitemap-index.xml');
}

// Homepage FAQ parity
const homeFile = join(DIST, 'index.html');
const homeHtml = readFileSync(homeFile, 'utf8');
const visibleFaq = [...homeHtml.matchAll(/<details class="faq-item"[^>]*>(.*?)<\/details>/gs)].map(([, item]) => ({
  question: stripTags(item.match(/<h3[^>]*>(.*?)<\/h3>/s)?.[1] ?? ''),
  answer: stripTags(item.match(/<div class="faq-item__answer"[^>]*>\s*<p[^>]*>(.*?)<\/p>/s)?.[1] ?? ''),
}));
const homeFaqLd = jsonLdByFile.get(homeFile).find((block) => block['@type'] === 'FAQPage');
if (!homeFaqLd) errors.push('/: no FAQPage JSON-LD');
else {
  const schemaFaq = homeFaqLd.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));
  if (JSON.stringify(schemaFaq) !== JSON.stringify(visibleFaq)) {
    errors.push('/: visible FAQ and FAQPage JSON-LD differ');
  }
  if (visibleFaq.length < 8 || visibleFaq.length > 10) warnings.push(`/: ${visibleFaq.length} FAQ items (aim for 8–10)`);
}

// FAQPage questions and answers must be visible on the page, and no question should repeat across pages
const seenQuestions = new Map();
for (const [file, blocks] of jsonLdByFile) {
  const name = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const body = html.split('<body')[1] ?? '';
  const visibleText = stripTags(body.replace(/<script.*?<\/script>|<style.*?<\/style>/gs, ' '));
  for (const faq of blocks.filter((block) => block['@type'] === 'FAQPage')) {
    for (const question of faq.mainEntity) {
      if (!visibleText.includes(question.name)) errors.push(`${name}: FAQ question "${question.name}" isn't visible`);
      if (!visibleText.includes(question.acceptedAnswer.text)) {
        errors.push(`${name}: FAQ answer for "${question.name}" isn't visible`);
      }
      if (seenQuestions.has(question.name)) {
        warnings.push(`${name}: FAQ "${question.name}" also on ${seenQuestions.get(question.name)}`);
      } else seenQuestions.set(question.name, name);
    }
  }
}

// Featured guides: one distinct landscape feature image each, wired into hero, og, twitter, Article
const BLOG_SRC = new URL('../src/content/blog/', import.meta.url).pathname;
const featured = readdirSync(BLOG_SRC)
  .filter((file) => /^featured:\s*\d+/m.test(readFileSync(join(BLOG_SRC, file), 'utf8').split('---')[1] ?? ''))
  .map((file) => file.replace(/\.md$/, ''));
const featureImages = new Map();
for (const slug of featured) {
  const name = `/blog/${slug}/`;
  const file = join(DIST, 'blog', slug, 'index.html');
  const html = readFileSync(file, 'utf8');
  const hero = html.match(/<img[^>]*class="post-feature[^"]*"[^>]*>/)?.[0];
  if (!hero) {
    errors.push(`${name}: featured guide has no feature image`);
    continue;
  }
  const attr = (key) => hero.match(new RegExp(`\\s${key}="([^"]*)"`))?.[1];
  const width = Number(attr('width'));
  const height = Number(attr('height'));
  if (!(width > height)) errors.push(`${name}: feature image is not landscape (${width}×${height})`);
  if (attr('loading') === 'lazy') errors.push(`${name}: feature image is lazy-loaded`);
  if (!attr('alt')) errors.push(`${name}: feature image has empty alt`);
  const heroFile = distFile(decode(attr('src') ?? ''));
  if (!existsSync(heroFile)) errors.push(`${name}: feature image ${attr('src')} not in dist`);
  else {
    const size = imageSize(heroFile);
    if (size && size.width / size.height !== width / height) {
      errors.push(`${name}: feature image file is ${size.width}×${size.height}, HTML says ${width}×${height}`);
    }
  }

  const og = meta(html, 'og:image');
  const twitter = meta(html, 'twitter:image');
  const article = jsonLdByFile.get(file).find((block) => block['@type'] === 'BlogPosting')?.image?.[0];
  if (!og || og !== twitter || og !== article) {
    errors.push(`${name}: og:image, twitter:image and Article.image differ (${og} | ${twitter} | ${article})`);
  } else if (!og.includes('/_astro/')) {
    errors.push(`${name}: og:image ${og} is not the guide's own feature image`);
  } else {
    const ogSize = existsSync(distFile(og)) ? imageSize(distFile(og)) : undefined;
    if (!ogSize || ogSize.width <= ogSize.height) errors.push(`${name}: og:image is missing or not landscape`);
    else if (String(ogSize.width) !== meta(html, 'og:image:width') || String(ogSize.height) !== meta(html, 'og:image:height')) {
      errors.push(`${name}: og:image:width/height don't match the file (${ogSize.width}×${ogSize.height})`);
    }
  }

  const source = (attr('src') ?? '').replace(/^\/_astro\/([^.]+)\..*$/, '$1');
  if (featureImages.has(source)) errors.push(`${name}: shares its feature image with ${featureImages.get(source)}`);
  featureImages.set(source, name);
}

console.log(`Checked ${pages.length} pages, ${locs.length} sitemap URLs, ${featured.length} featured guides.`);
for (const warning of warnings) console.log(`warn  ${warning}`);
for (const error of errors) console.log(`error ${error}`);
if (errors.length > 0) {
  console.log(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log('\nAll SEO checks passed.');
