DROP INDEX "newsletter_subscribers_email_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_email_unique" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "outbound_click_created_at_idx" ON "outbound_click_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "submissions_category_idx" ON "submissions" USING btree ("category");