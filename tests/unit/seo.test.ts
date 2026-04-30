import { describe, expect, it } from "vitest";
import { buildCanonical, buildFaqSchema } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds canonical url", () => {
    expect(buildCanonical("/tools/notion-ai")).toContain("/tools/notion-ai");
  });

  it("builds faq schema", () => {
    const schema = buildFaqSchema([{ question: "Q", answer: "A" }]);
    expect(schema.mainEntity).toHaveLength(1);
  });
});
