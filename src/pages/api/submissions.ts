import type { APIRoute } from "astro";
import { isDatabaseConfigured } from "@/lib/db/client";
import { createSubmission } from "@/lib/db/repositories";
import { sendOpsNotification } from "@/lib/mail/resend";
import { submissionSchema } from "@/lib/validation/forms";

const failureLocation = "/submit?status=error";
const successLocation = "/submit?status=success";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const parsed = submissionSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return redirect(`${failureLocation}&reason=validation`);
  }

  if (!isDatabaseConfigured()) {
    return redirect(`${failureLocation}&reason=database`);
  }

  await createSubmission(parsed.data);

  try {
    await sendOpsNotification(
      "新工具提交",
      `<p><strong>${parsed.data.toolName}</strong></p><p>${parsed.data.website}</p><p>${parsed.data.contactName} / ${parsed.data.email}</p>`
    );
  } catch (error) {
    console.error("Failed to send submission notification", error);
  }

  return redirect(successLocation);
};
