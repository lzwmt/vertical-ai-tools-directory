import { boolean, index, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const submissions = pgTable(
  "submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    toolName: varchar("tool_name", { length: 160 }).notNull(),
    website: text("website").notNull(),
    category: varchar("category", { length: 80 }).notNull(),
    contactName: varchar("contact_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [index("submissions_created_at_idx").on(table.createdAt), index("submissions_category_idx").on(table.category)]
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    source: varchar("source", { length: 80 }).notNull(),
    confirmed: boolean("confirmed").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("newsletter_subscribers_email_unique").on(table.email),
    index("newsletter_subscribers_created_at_idx").on(table.createdAt)
  ]
);

export const outboundClickEvents = pgTable(
  "outbound_click_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    toolSlug: varchar("tool_slug", { length: 160 }).notNull(),
    targetUrl: text("target_url").notNull(),
    sourcePage: varchar("source_page", { length: 240 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [index("outbound_click_tool_slug_idx").on(table.toolSlug), index("outbound_click_created_at_idx").on(table.createdAt)]
);
