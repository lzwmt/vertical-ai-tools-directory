import { getCollection, getEntries, getEntry, type CollectionEntry } from "astro:content";
import { buildCanonical, buildFaqSchema, buildItemListSchema, buildMeta, buildSoftwareApplicationSchema } from "@/lib/seo";
import {
  findRelatedBestPages,
  getToolFreshnessDate,
  selectFeaturedBestPages,
  selectFeaturedTools,
  selectRecentTools
} from "@/lib/content/priority";

type GetCollection = typeof getCollection;
type GetEntry = typeof getEntry;
type GetEntries = typeof getEntries;

interface ContentDeps {
  getCollection: GetCollection;
  getEntry: GetEntry;
  getEntries: GetEntries;
}

const defaultDeps: ContentDeps = {
  getCollection,
  getEntry,
  getEntries
};

export async function loadHomepageData(deps: ContentDeps = defaultDeps) {
  const tools = await deps.getCollection("tools");
  const useCases = await deps.getCollection("use-cases");
  const allFeaturedBestPages = selectFeaturedBestPages(useCases, useCases.length);
  const editorPicks = selectFeaturedTools(tools, 3);
  const recentReviews = selectRecentTools(tools, 4);
  const leadBestPage = allFeaturedBestPages.find((page) => page.data.slug === "engineering-workflow") ?? allFeaturedBestPages[0];
  const featuredBestPages = [leadBestPage, ...allFeaturedBestPages.filter((page) => page.id !== leadBestPage.id)].slice(0, 4);
  const leadTool = recentReviews[0];
  const meta = buildMeta({
    title: "编程与内容团队 AI 工具选型",
    description: "面向中文编程与内容场景的 AI 工具选型站。先按选型路径缩小范围，再进入单工具评测做落地判断。",
    pathname: "/"
  });

  return {
    tools,
    useCases,
    featuredBestPages,
    editorPicks,
    recentReviews,
    leadBestPage,
    leadTool,
    meta
  };
}

export async function loadBestPageData(slug: string, deps: ContentDeps = defaultDeps) {
  const page = await deps.getEntry("use-cases", slug);

  if (!page) {
    throw new Error(`Best page not found for slug: ${slug}`);
  }

  const tools = await deps.getEntries(page.data.featuredTools);
  const meta = buildMeta({
    title: page.data.seo.title,
    description: page.data.seo.description,
    pathname: `/best/${page.data.slug}`
  });
  const structuredData = [
    buildItemListSchema({
      title: page.data.title,
      items: tools.map((tool) => ({
        name: tool.data.name,
        url: buildCanonical(`/tools/${tool.data.slug}`)
      }))
    }),
    ...(page.data.faq.length > 0 ? [buildFaqSchema(page.data.faq)] : [])
  ];

  return {
    page,
    tools,
    meta,
    structuredData
  };
}

export async function loadToolPageData(slug: string, deps: ContentDeps = defaultDeps) {
  const tool = await deps.getEntry("tools", slug);

  if (!tool) {
    throw new Error(`Tool not found for slug: ${slug}`);
  }

  const alternatives = await Promise.all(tool.data.alternatives.map((item) => deps.getEntry(item.collection, item.id)));
  const relatedBestPages = findRelatedBestPages(tool.data.slug, await deps.getCollection("use-cases"), 3);
  const meta = buildMeta({
    title: tool.data.seo.title,
    description: tool.data.seo.description,
    pathname: `/tools/${tool.data.slug}`
  });
  const reviewedAt = getToolFreshnessDate(tool);
  const structuredData = buildSoftwareApplicationSchema({
    name: tool.data.name,
    description: tool.data.summary,
    url: meta.canonical,
    category: "BusinessApplication"
  });

  return {
    tool,
    alternatives: alternatives.filter(Boolean) as CollectionEntry<"tools">[],
    relatedBestPages,
    meta,
    reviewedAt,
    structuredData
  };
}
