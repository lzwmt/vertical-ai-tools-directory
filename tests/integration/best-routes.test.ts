import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn().mockResolvedValue([
    {
      data: {
        slug: "content-workflow"
      }
    }
  ])
}));

const { GET: legacyUseCaseRedirect, getStaticPaths } = await import("@/pages/use-cases/[slug]");

describe("legacy use-cases route", () => {
  it("keeps static paths for legacy slugs", async () => {
    expect(await getStaticPaths({} as never)).toEqual([{ params: { slug: "content-workflow" } }]);
  });

  it("redirects old use-case URLs to the canonical best-of route", async () => {
    const response = await legacyUseCaseRedirect({
      params: {
        slug: "content-workflow"
      },
      redirect: (location: string, status: number) => Response.redirect(`https://example.com${location}`, status)
    } as never);

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://example.com/best/content-workflow");
  });
});
