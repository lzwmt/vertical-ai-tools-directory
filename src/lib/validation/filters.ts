import { z } from "zod";

export const filterSchema = z.object({
  q: z.string().trim().optional(),
  priceTier: z.enum(["all", "free", "freemium", "paid", "enterprise"]).default("all"),
  supportsChinese: z.enum(["all", "true", "false"]).default("all"),
  availableInChina: z.enum(["all", "true", "false"]).default("all"),
  beginnerFriendly: z.enum(["all", "true", "false"]).default("all")
});

export type ToolFilters = z.infer<typeof filterSchema>;
