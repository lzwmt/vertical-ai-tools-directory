import { describe, expect, it } from "vitest";
import { newsletterSchema, outboundClickSchema, submissionSchema } from "@/lib/validation/forms";

describe("submissionSchema", () => {
  it("normalizes valid submissions", () => {
    const parsed = submissionSchema.parse({
      toolName: "  New Tool  ",
      website: "https://example.com",
      category: " 写作 ",
      contactName: " Alice ",
      email: "TEAM@EXAMPLE.COM ",
      notes: "   "
    });

    expect(parsed).toEqual({
      toolName: "New Tool",
      website: "https://example.com",
      category: "写作",
      contactName: "Alice",
      email: "team@example.com",
      notes: undefined
    });
  });

  it("rejects invalid urls", () => {
    expect(() =>
      submissionSchema.parse({
        toolName: "New Tool",
        website: "not-a-url",
        category: "写作",
        contactName: "Alice",
        email: "team@example.com"
      })
    ).toThrow();
  });
});

describe("newsletterSchema", () => {
  it("applies a default source and lowercases the email", () => {
    const parsed = newsletterSchema.parse({
      email: "EDITOR@EXAMPLE.COM "
    });

    expect(parsed).toEqual({
      email: "editor@example.com",
      source: "site"
    });
  });
});

describe("outboundClickSchema", () => {
  it("accepts valid click payloads", () => {
    expect(
      outboundClickSchema.parse({
        toolSlug: "notion-ai",
        targetUrl: "https://www.notion.so/product/ai",
        sourcePage: "/tools/notion-ai"
      })
    ).toMatchObject({
      toolSlug: "notion-ai"
    });
  });
});
