import { describe, expect, it } from "vitest";
import { filterSchema } from "@/lib/validation/filters";

describe("filter schema", () => {
  it("provides defaults", () => {
    expect(filterSchema.parse({}).priceTier).toBe("all");
  });
});
