// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import rehypeGuideCta from './src/plugins/rehype-guide-cta.mjs';
import {
  APP_STORE_URL,
  FREE_TIER_APPS,
  FREE_TIER_RELEASES,
  PRO_MONTHLY_PRICE,
} from './src/lib/site.ts';

const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

/** Last-modified date per blog URL, from `updatedDate` or `pubDate` frontmatter. */
const blogLastmod = new Map(
  readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const frontmatter = readFileSync(new URL(file, BLOG_DIR), 'utf8').split('---')[1] ?? '';
      const date = (key) => frontmatter.match(new RegExp(`^${key}:\\s*["']?([\\d-]+)`, 'm'))?.[1];
      return [`/blog/${file.replace(/\.md$/, '')}/`, date('updatedDate') ?? date('pubDate')];
    }),
);
const newestPost = [...blogLastmod.values()].filter(Boolean).sort().at(-1);

// https://astro.build/config
export default defineConfig({
  site: 'https://launchbuddy.app',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lastmod = blogLastmod.get(path) ?? (path === '/blog/' ? newestPost : undefined);
        return lastmod ? { ...item, lastmod: new Date(lastmod).toISOString() } : item;
      },
    }),
  ],

  markdown: {
    rehypePlugins: [
      [
        rehypeGuideCta,
        {
          href: APP_STORE_URL,
          label: 'Download LaunchBuddy free',
          body: `Free for ${FREE_TIER_APPS} apps and ${FREE_TIER_RELEASES} releases, with taskboards, submission checklists, and iCloud sync. Pro starts at ${PRO_MONTHLY_PRICE} a month.`,
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
