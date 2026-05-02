export interface PriorityToolLike {
  data: {
    slug: string;
    featured?: boolean;
    publishedAt: Date;
    updatedAt?: Date;
  };
}

export interface PriorityBestPageLike {
  data: {
    slug: string;
    featured?: boolean;
    featuredTools: Array<{ id: string }>;
  };
}

export function getToolFreshnessDate(tool: PriorityToolLike) {
  return tool.data.updatedAt ?? tool.data.publishedAt;
}

export function sortToolsByFreshness<T extends PriorityToolLike>(tools: T[]) {
  return [...tools].sort((left, right) => getToolFreshnessDate(right).getTime() - getToolFreshnessDate(left).getTime());
}

export function selectFeaturedTools<T extends PriorityToolLike>(tools: T[], limit: number) {
  return tools.filter((tool) => tool.data.featured).slice(0, limit);
}

export function selectRecentTools<T extends PriorityToolLike>(tools: T[], limit: number) {
  return sortToolsByFreshness(tools).slice(0, limit);
}

export function selectFeaturedBestPages<T extends PriorityBestPageLike>(pages: T[], limit: number) {
  return pages.filter((page) => page.data.featured).slice(0, limit);
}

export function findRelatedBestPages<T extends PriorityBestPageLike>(toolSlug: string, pages: T[], limit: number) {
  return pages.filter((page) => page.data.featuredTools.some((tool) => tool.id === toolSlug)).slice(0, limit);
}
