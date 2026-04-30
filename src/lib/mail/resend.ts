import { Resend } from "resend";
import { getResendApiKey, getResendAudienceEmail, getResendFromEmail } from "@/lib/config/env";

export function isResendConfigured() {
  return Boolean(getResendApiKey() && getResendAudienceEmail() && getResendFromEmail());
}

function getClient() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(apiKey);
}

export async function sendOpsNotification(subject: string, html: string) {
  const audience = getResendAudienceEmail();
  const from = getResendFromEmail();

  if (!audience || !from) {
    return;
  }

  return getClient().emails.send({
    from,
    to: audience,
    subject,
    html
  });
}

export async function sendNewsletterConfirmation(email: string) {
  const from = getResendFromEmail();

  if (!from) {
    return;
  }

  return getClient().emails.send({
    from,
    to: email,
    subject: "已收到你的订阅申请",
    html: `
      <p>你好，</p>
      <p>你的邮件订阅已经记录成功。后续我们会按周发送 AI 工具精选、对比更新和方法论内容。</p>
      <p>如果这不是你本人操作，可以忽略这封邮件。</p>
    `
  });
}
