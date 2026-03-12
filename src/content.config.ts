import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const careerCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx,json}', base: './src/content/career' }),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    title: z.string(),
    subTitle: z.string().optional(),
    description: z.array(z.string()),
    icon: z.string().optional(),
    color: z.string().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    repoUrl: z.string().optional(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = {
  career: careerCollection,
  projects: projectsCollection,
};
