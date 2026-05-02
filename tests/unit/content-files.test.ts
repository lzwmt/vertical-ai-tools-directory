import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readContentDir(path: string) {
  return readdirSync(path)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => ({
      name: file,
      source: readFileSync(join(path, file), "utf8")
    }));
}

describe("priority content files", () => {
  const toolFiles = readContentDir(join(process.cwd(), "src/content/tools"));
  const bestFiles = readContentDir(join(process.cwd(), "src/content/use-cases"));

  it("keeps tool review frontmatter fields required by the priority template", () => {
    for (const file of toolFiles) {
      expect(file.source, `${file.name} should include verdict`).toContain("verdict:");
      expect(file.source, `${file.name} should include notFor`).toContain("notFor:");
      expect(file.source, `${file.name} should include updatedAt`).toContain("updatedAt:");
    }
  });

  it("keeps best-of frontmatter fields required by the priority template", () => {
    for (const file of bestFiles) {
      expect(file.source, `${file.name} should include summary`).toContain("summary:");
      expect(file.source, `${file.name} should include rankingCriteria`).toContain("rankingCriteria:");
      expect(file.source, `${file.name} should include audienceRecommendations`).toContain("audienceRecommendations:");
      expect(file.source, `${file.name} should include faq`).toContain("faq:");
    }
  });
});
