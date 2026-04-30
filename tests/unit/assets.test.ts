import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveAssetPath } from "@/lib/assets";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveAssetPath", () => {
  it("returns local asset paths unchanged when no R2 base url is configured", () => {
    vi.stubEnv("R2_PUBLIC_BASE_URL", "");

    expect(resolveAssetPath("/assets/tools/notion-ai.svg")).toBe("/assets/tools/notion-ai.svg");
  });

  it("returns remote asset urls unchanged", () => {
    vi.stubEnv("R2_PUBLIC_BASE_URL", "https://pub-example.r2.dev");

    expect(resolveAssetPath("https://example.com/tool.png")).toBe("https://example.com/tool.png");
  });

  it("prefixes relative asset keys with the configured R2 base url", () => {
    vi.stubEnv("R2_PUBLIC_BASE_URL", "https://pub-example.r2.dev/");

    expect(resolveAssetPath("tools/notion-ai.svg")).toBe("https://pub-example.r2.dev/tools/notion-ai.svg");
  });
});
