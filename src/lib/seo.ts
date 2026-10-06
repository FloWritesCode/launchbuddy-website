import type { CollectionEntry } from 'astro:content';
import {
  APP_STORE_LISTING_URL,
  APP_STORE_NAME,
  APP_STORE_RATING,
  APP_STORE_REVIEW_COUNT,
  AUTHOR_NAME,
  AUTHOR_URL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  X_URL,
} from './site';

type JsonLd = Record<string, unknown>;
type Post = CollectionEntry<'blog'>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;
const LOGO_PATH = '/images/launchbuddy-icon-512.png';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const postPath = (post: Post) => `/blog/${post.id}/`;

export const authorJsonLd = (): JsonLd => ({
  '@type': 'Person',
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
});

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl(LOGO_PATH), width: 512, height: 512 },
    founder: authorJsonLd(),
    sameAs: [X_URL, APP_STORE_LISTING_URL],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function softwareApplicationJsonLd(screenshots: string[] = []): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: SITE_NAME,
    alternateName: APP_STORE_NAME,
    description: DEFAULT_DESCRIPTION,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'Release management',
    operatingSystem: 'iOS, iPadOS, macOS',
    url: SITE_URL,
    installUrl: APP_STORE_LISTING_URL,
    downloadUrl: APP_STORE_LISTING_URL,
    image: absoluteUrl(LOGO_PATH),
    ...(screenshots.length > 0 && { screenshot: screenshots.map(absoluteUrl) }),
    author: authorJsonLd(),
    publisher: { '@id': ORGANIZATION_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: 'free',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: APP_STORE_RATING,
      ratingCount: String(APP_STORE_REVIEW_COUNT),
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: Post, imageUrl: string): JsonLd {
  const url = absoluteUrl(postPath(post));
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    image: [absoluteUrl(imageUrl)],
    datePublished: post.data.pubDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    author: authorJsonLd(),
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: absoluteUrl(LOGO_PATH), width: 512, height: 512 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    isPartOf: { '@id': WEBSITE_ID },
  };
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const htmlToText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, code: string) => {
      if (code.startsWith('#x')) return String.fromCodePoint(parseInt(code.slice(2), 16));
      if (code.startsWith('#')) return String.fromCodePoint(Number(code.slice(1)));
      return ENTITIES[code] ?? entity;
    })
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Reads the "Frequently asked questions" section from a post's rendered HTML, so the schema text
 * matches what readers see (including typographic quotes). Each H3 is a question and the answer is
 * the paragraph right after it; posts often end the last answer with a CTA that isn't part of it.
 */
export function extractFaq(html: string | undefined): { question: string; answer: string }[] {
  if (!html) return [];
  const section = html
    .split(/<h2[^>]*>\s*Frequently asked questions\s*<\/h2>/i)[1]
    ?.split(/<h2[\s>]/)[0];
  if (!section) return [];

  const faqPattern = /<h3[^>]*>((?:(?!<\/h3>).)*)<\/h3>\s*<p>((?:(?!<\/p>).)*)<\/p>/gs;
  return [...section.matchAll(faqPattern)].map(([, question, answer]) => ({
    question: htmlToText(question),
    answer: htmlToText(answer),
  }));
}

const STOPWORDS = new Set([
  'a', 'an', 'and', 'app', 'apps', 'for', 'how', 'in', 'ios', 'of', 'on', 'the', 'to', 'vs', 'with', 'your',
]);

const slugTokens = (slug: string) => new Set(slug.split('-').filter((token) => !STOPWORDS.has(token)));

const byFeatured = (a: Post, b: Post) => (a.data.featured ?? Infinity) - (b.data.featured ?? Infinity);

export const featuredPosts = (posts: Post[]) =>
  posts.filter((post) => post.data.featured).sort(byFeatured);

/** Explicit `related` slugs first, then posts that share slug words, topped up with featured guides. */
export function relatedPosts(post: Post, posts: Post[], count = 3): Post[] {
  const others = posts.filter((candidate) => candidate.id !== post.id);
  const picked: Post[] = [];
  const add = (candidate: Post | undefined) => {
    if (candidate && picked.length < count && !picked.includes(candidate)) picked.push(candidate);
  };

  post.data.related?.forEach((slug) => add(others.find((candidate) => candidate.id === slug)));

  const tokens = slugTokens(post.id);
  others
    .map((candidate) => ({
      candidate,
      score: [...slugTokens(candidate.id)].filter((token) => tokens.has(token)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        byFeatured(a.candidate, b.candidate) ||
        b.candidate.data.pubDate.valueOf() - a.candidate.data.pubDate.valueOf(),
    )
    .forEach(({ candidate }) => add(candidate));

  featuredPosts(others).forEach(add);
  return picked;
}
