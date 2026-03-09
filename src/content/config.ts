import { defineCollection, z } from 'astro:content';

const careerCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    period: z.string(),
    title: z.string(),
    company: z.string().optional(),
    description: z.array(z.string()),
    icon: z.string().optional(),
    color: z.string().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
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
