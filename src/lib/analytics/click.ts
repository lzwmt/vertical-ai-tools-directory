import type { OutboundClickInput } from "@/lib/validation/forms";
import { createOutboundClickEvent } from "@/lib/db/repositories";

export async function recordOutboundClick(input: OutboundClickInput) {
  return createOutboundClickEvent(input);
}
