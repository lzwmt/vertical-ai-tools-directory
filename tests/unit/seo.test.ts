import { describe, expect, it } from "vitest";
import { buildCanonical, buildFaqSchema, buildItemListSchema, buildSoftwareApplicationSchema } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds canonical url", () => {
    expect(buildCanonical("/tools/notion-ai")).toContain("/tools/notion-ai");
  });

  it("builds faq schema", () => {
    const schema = buildFaqSchema([{ question: "Q", answer: "A" }]);
    expect(schema.mainEntity).toHaveLength(1);
  });

  it("builds item list and software application schema", () => {
    const listSchema = buildItemListSchema({
      title: "Best AI Writing Tools",
      items: [{ name: "Notion AI", url: "https://example.com/tools/notion-ai" }]
    });
    const appSchema = buildSoftwareApplicationSchema({
      name: "Notion AI",
      description: "AI writing in Notion",
      url: "https://example.com/tools/notion-ai",
      category: "BusinessApplication"
    });

    expect(listSchema.itemListElement).toHaveLength(1);
    expect(appSchema.offers.url).toBe("https://example.com/tools/notion-ai");
  });
});
