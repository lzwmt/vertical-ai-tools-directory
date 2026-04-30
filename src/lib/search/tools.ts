import type { CollectionEntry } from "astro:content";
import type { ToolFilters } from "@/lib/validation/filters";

export function searchTools(tools: CollectionEntry<"tools">[], filters: ToolFilters) {
  const query = filters.q?.toLowerCase();

  return tools.filter((tool) => {
    if (query) {
      const haystack = [tool.data.name, tool.data.tagline, tool.data.summary, tool.data.tags.join(" ")]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    if (filters.priceTier !== "all" && tool.data.priceTier !== filters.priceTier) {
      return false;
    }

    if (filters.supportsChinese !== "all" && tool.data.supportsChinese !== (filters.supportsChinese === "true")) {
      return false;
    }

    if (filters.availableInChina !== "all" && tool.data.availableInChina !== (filters.availableInChina === "true")) {
      return false;
    }

    if (filters.beginnerFriendly !== "all" && tool.data.beginnerFriendly !== (filters.beginnerFriendly === "true")) {
      return false;
    }

    return true;
  });
}
