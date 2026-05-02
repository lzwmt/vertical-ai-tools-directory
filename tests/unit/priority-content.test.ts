import { describe, expect, it } from "vitest";
import {
  findRelatedBestPages,
  getToolFreshnessDate,
  selectFeaturedBestPages,
  selectFeaturedTools,
  selectRecentTools
} from "@/lib/content/priority";

describe("priority content helpers", () => {
  const tools = [
    {
      data: {
        slug: "older-featured",
        featured: true,
        publishedAt: new Date("2026-04-01"),
        updatedAt: new Date("2026-04-10")
      }
    },
    {
      data: {
        slug: "newer-featured",
        featured: true,
        publishedAt: new Date("2026-04-02"),
        updatedAt: new Date("2026-04-20")
      }
    },
    {
      data: {
        slug: "recent-unfeatured",
        featured: false,
        publishedAt: new Date("2026-04-15")
      }
    }
  ];

  const bestPages = [
    {
      data: {
        slug: "workflow",
        featured: true,
        featuredTools: [{ id: "newer-featured" }, { id: "recent-unfeatured" }]
      }
    },
    {
      data: {
        slug: "social",
        featured: true,
        featuredTools: [{ id: "newer-featured" }, { id: "older-featured" }]
      }
    },
    {
      data: {
        slug: "archived",
        featured: false,
        featuredTools: [{ id: "older-featured" }]
      }
    }
  ];

  it("prefers updatedAt over publishedAt when computing freshness", () => {
    expect(getToolFreshnessDate(tools[0]).toISOString()).toContain("2026-04-10");
    expect(getToolFreshnessDate(tools[2]).toISOString()).toContain("2026-04-15");
  });

  it("returns featured tools and recent tools separately", () => {
    expect(selectFeaturedTools(tools, 2).map((tool) => tool.data.slug)).toEqual(["older-featured", "newer-featured"]);
    expect(selectRecentTools(tools, 3).map((tool) => tool.data.slug)).toEqual([
      "newer-featured",
      "recent-unfeatured",
      "older-featured"
    ]);
  });

  it("finds featured best-of pages and reverse links for tools", () => {
    expect(selectFeaturedBestPages(bestPages, 2).map((page) => page.data.slug)).toEqual(["workflow", "social"]);
    expect(findRelatedBestPages("newer-featured", bestPages, 3).map((page) => page.data.slug)).toEqual(["workflow", "social"]);
  });
});
