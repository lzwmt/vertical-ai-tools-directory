import { getDb } from "@/lib/db/client";
import { newsletterSubscribers, outboundClickEvents, submissions } from "@/lib/db/schema";

export async function createSubmission(input: typeof submissions.$inferInsert) {
  return getDb().insert(submissions).values(input);
}

export async function createNewsletterSubscriber(input: typeof newsletterSubscribers.$inferInsert) {
  return getDb().insert(newsletterSubscribers).values(input).onConflictDoNothing({
    target: newsletterSubscribers.email
  });
}

export async function createOutboundClickEvent(input: typeof outboundClickEvents.$inferInsert) {
  return getDb().insert(outboundClickEvents).values(input);
}
