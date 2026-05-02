import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  getEntries: vi.fn()
}));

let loadHomepageData: typeof import("@/lib/content/page-data").loadHomepageData;
let loadBestPageData: typeof import("@/lib/content/page-data").loadBestPageData;
let loadToolPageData: typeof import("@/lib/content/page-data").loadToolPageData;

beforeAll(async () => {
  const module = await import("@/lib/content/page-data");
  loadHomepageData = module.loadHomepageData;
  loadBestPageData = module.loadBestPageData;
  loadToolPageData = module.loadToolPageData;
});

describe("page data loaders", () => {
  const toolMap = new Map([
    [
      "chatgpt",
      {
        collection: "tools",
        id: "chatgpt",
        data: {
          slug: "chatgpt",
          name: "ChatGPT",
          featured: true,
          verdict: "ChatGPT is the flexible default.",
          summary: "General AI workspace.",
          seo: {
            title: "ChatGPT 评测",
            description: "ChatGPT description"
          },
          alternatives: [],
          publishedAt: new Date("2026-04-15"),
          updatedAt: new Date("2026-05-01")
        }
      }
    ],
    [
      "notion-ai",
      {
        collection: "tools",
        id: "notion-ai",
        data: {
          slug: "notion-ai",
          name: "Notion AI",
          featured: true,
          verdict: "Notion AI fits team workflows.",
          summary: "Workflow tool.",
          seo: {
            title: "Notion AI 评测",
            description: "Notion AI description"
          },
          alternatives: [{ collection: "tools", id: "chatgpt" }],
          publishedAt: new Date("2026-04-01"),
          updatedAt: new Date("2026-05-01")
        }
      }
    ],
    [
      "claude",
      {
        collection: "tools",
        id: "claude",
        data: {
          slug: "claude",
          name: "Claude",
          featured: false,
          verdict: "Claude handles long-form well.",
          summary: "Long-form assistant.",
          seo: {
            title: "Claude 评测",
            description: "Claude description"
          },
          alternatives: [],
          publishedAt: new Date("2026-04-20"),
          updatedAt: new Date("2026-04-30")
        }
      }
    ]
  ]);

  const bestPages = [
    {
      collection: "use-cases",
      id: "content-workflow",
      data: {
        slug: "content-workflow",
        title: "内容团队工作流自动化",
        featured: true,
        summary: "Workflow page",
        featuredTools: [{ id: "notion-ai" }, { id: "chatgpt" }, { id: "claude" }, { id: "chatgpt" }],
        faq: [{ question: "Q1", answer: "A1" }],
        seo: {
          title: "内容团队 AI 工具清单",
          description: "Workflow description"
        }
      }
    },
    {
      collection: "use-cases",
      id: "social-copy",
      data: {
        slug: "social-copy",
        title: "社媒与增长文案",
        featured: true,
        summary: "Social copy page",
        featuredTools: [{ id: "chatgpt" }, { id: "notion-ai" }],
        faq: [],
        seo: {
          title: "社媒文案工具",
          description: "Social description"
        }
      }
    },
    {
      collection: "use-cases",
      id: "china-friendly-tools",
      data: {
        slug: "china-friendly-tools",
        title: "中国区更易落地的内容工具",
        featured: true,
        summary: "China page",
        featuredTools: [{ id: "notion-ai" }],
        faq: [],
        seo: {
          title: "中国区工具",
          description: "China description"
        }
      }
    },
    {
      collection: "use-cases",
      id: "long-form-writing",
      data: {
        slug: "long-form-writing",
        title: "长文策划与成稿",
        featured: true,
        summary: "Long-form page",
        featuredTools: [{ id: "claude" }],
        faq: [],
        seo: {
          title: "长文工具",
          description: "Long-form description"
        }
      }
    }
  ];

  const deps = {
    getCollection: vi.fn(async (collection: string) => {
      if (collection === "tools") {
        return Array.from(toolMap.values());
      }

      if (collection === "use-cases") {
        return bestPages;
      }

      return [];
    }),
    getEntry: vi.fn(async (collection: string, id: string) => {
      if (collection === "tools") {
        return toolMap.get(id) ?? null;
      }

      if (collection === "use-cases") {
        return bestPages.find((page) => page.id === id) ?? null;
      }

      return null;
    }),
    getEntries: vi.fn(async (references: Array<{ id: string }>) => references.map((reference) => toolMap.get(reference.id)!))
  };

  it("assembles homepage sections from featured best-of pages and recent tools", async () => {
    const data = await loadHomepageData(deps as never);

    expect(data.featuredBestPages).toHaveLength(4);
    expect(data.editorPicks).toHaveLength(2);
    expect(data.recentReviews[0].data.slug).toBe("chatgpt");
    expect(data.leadBestPage.data.slug).toBe("content-workflow");
    expect(data.leadTool.data.slug).toBe("chatgpt");
    expect(data.meta.canonical).toContain("http");
  });

  it("assembles best-of page recommendations and structured data", async () => {
    const data = await loadBestPageData("content-workflow", deps as never);

    expect(data.page.data.slug).toBe("content-workflow");
    expect(data.tools).toHaveLength(4);
    expect(data.structuredData).toHaveLength(2);
    expect(data.meta.canonical).toContain("/best/content-workflow");
  });

  it("assembles tool page alternatives and reverse links", async () => {
    const data = await loadToolPageData("notion-ai", deps as never);

    expect(data.tool.data.slug).toBe("notion-ai");
    expect(data.alternatives).toHaveLength(1);
    expect(data.relatedBestPages.length).toBeGreaterThanOrEqual(2);
    expect(data.reviewedAt.toISOString().slice(0, 10)).toBe("2026-05-01");
    expect(data.meta.canonical).toContain("/tools/notion-ai");
  });
});
