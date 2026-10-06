import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      /** Position among the featured guides (homepage, blog index, footer). Lower comes first. */
      featured: z.number().int().positive().optional(),
      /** Short label for guide cards and breadcrumbs. */
      shortTitle: z.string().optional(),
      /** One-line card description; falls back to `description`. */
      summary: z.string().optional(),
      /** Landscape feature image in src/assets/guides/, used for the hero, cards, and og:image. */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Slugs of related posts; when omitted, related posts are picked automatically. */
      related: z.array(z.string()).optional(),
      /** Headline for the mid-article call-out on featured guides. */
      cta: z.string().optional(),
    }),
});

export const collections = { blog };
