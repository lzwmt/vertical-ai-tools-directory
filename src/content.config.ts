import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.url().optional()
});

const tools = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tools" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    category: reference("categories"),
    priceLabel: z.string(),
    priceTier: z.enum(["free", "freemium", "paid", "enterprise"]),
    supportsChinese: z.boolean(),
    availableInChina: z.boolean(),
    beginnerFriendly: z.boolean(),
    website: z.url(),
    affiliateUrl: z.url().optional(),
    screenshot: z.string(),
    summary: z.string(),
    pros: z.array(z.string()).min(2),
    cons: z.array(z.string()).min(1),
    bestFor: z.array(z.string()).min(2),
    alternatives: z.array(reference("tools")).default([]),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    seo: seoSchema
  })
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    heroTitle: z.string(),
    heroSummary: z.string(),
    featuredToolSlugs: z.array(z.string()),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
      .default([]),
    seo: seoSchema
  })
});

const comparisons = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/comparisons" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tools: z.array(reference("tools")).min(2),
    winnerSummary: z.string(),
    recommendedFor: z.array(z.string()),
    seo: seoSchema
  })
});

const useCases = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/use-cases" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    featuredTools: z.array(reference("tools")).min(2),
    rankingMethod: z.string(),
    seo: seoSchema
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seo: seoSchema
  })
});

export const collections = {
  tools,
  categories,
  comparisons,
  "use-cases": useCases,
  pages
};
