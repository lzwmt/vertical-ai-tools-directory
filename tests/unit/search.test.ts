import { describe, expect, it } from "vitest";
import { searchTools } from "@/lib/search/tools";

type SearchToolsInput = Parameters<typeof searchTools>[0];

const tools = [
  {
    data: {
      name: "Notion AI",
      tagline: "协作写作",
      summary: "工作流",
      tags: ["知识库"],
      priceTier: "freemium",
      supportsChinese: true,
      availableInChina: true,
      beginnerFriendly: true
    }
  },
  {
    data: {
      name: "Jasper",
      tagline: "营销模板",
      summary: "文案",
      tags: ["品牌"],
      priceTier: "paid",
      supportsChinese: true,
      availableInChina: false,
      beginnerFriendly: true
    }
  }
] as unknown as SearchToolsInput;

describe("searchTools", () => {
  it("filters by query", () => {
    expect(searchTools(tools, { q: "Notion", priceTier: "all", supportsChinese: "all", availableInChina: "all", beginnerFriendly: "all" })).toHaveLength(1);
  });

  it("filters by booleans", () => {
    expect(searchTools(tools, { q: "", priceTier: "all", supportsChinese: "all", availableInChina: "true", beginnerFriendly: "all" })).toHaveLength(1);
  });
});
