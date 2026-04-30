import { drizzle } from "drizzle-orm/neon-http";
import { getDatabaseUrl } from "@/lib/config/env";

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}

export function getDb() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return drizzle(url);
}
