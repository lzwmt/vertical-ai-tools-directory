import { drizzle } from "drizzle-orm/neon-http";

export function isDatabaseConfigured() {
  return Boolean(import.meta.env.DATABASE_URL);
}

export function getDb() {
  const url = import.meta.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return drizzle(url);
}
