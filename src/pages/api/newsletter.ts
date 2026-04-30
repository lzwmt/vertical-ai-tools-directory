import type { APIRoute } from "astro";
import { isDatabaseConfigured } from "@/lib/db/client";
import { createNewsletterSubscriber } from "@/lib/db/repositories";
import { sendNewsletterConfirmation, sendOpsNotification } from "@/lib/mail/resend";
import { newsletterSchema } from "@/lib/validation/forms";

const failureLocation = "/?newsletter=error";
const successLocation = "/?newsletter=success";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return redirect(`${failureLocation}&reason=validation`);
  }

  if (!isDatabaseConfigured()) {
    return redirect(`${failureLocation}&reason=database`);
  }

  await createNewsletterSubscriber({ ...parsed.data, confirmed: false });

  try {
    await sendOpsNotification("新邮件订阅", `<p>${parsed.data.email}</p><p>${parsed.data.source}</p>`);
  } catch (error) {
    console.error("Failed to send newsletter notification", error);
  }

  try {
    await sendNewsletterConfirmation(parsed.data.email);
  } catch (error) {
    console.error("Failed to send newsletter confirmation", error);
  }

  return redirect(successLocation);
};
