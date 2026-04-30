import { z } from "zod";

const requiredText = (label: string, min = 2, max = 160) =>
  z
    .string()
    .trim()
    .min(min, `${label}至少需要 ${min} 个字符`)
    .max(max, `${label}不能超过 ${max} 个字符`);

const optionalText = (max = 2000) =>
  z
    .string()
    .trim()
    .max(max, `内容不能超过 ${max} 个字符`)
    .transform((value) => value || undefined)
    .optional();

const normalizedEmail = () =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    z.email("请输入有效邮箱")
  );

export const submissionSchema = z.object({
  toolName: requiredText("工具名"),
  website: z.url("请输入有效的网址"),
  category: requiredText("所属分类", 2, 80),
  contactName: requiredText("联系人", 2, 120),
  email: normalizedEmail(),
  notes: optionalText()
});

export const newsletterSchema = z.object({
  email: normalizedEmail(),
  source: z.string().trim().min(1).max(80).default("site")
});

export const outboundClickSchema = z.object({
  toolSlug: z.string().trim().min(1).max(160),
  targetUrl: z.url("请输入有效的网址"),
  sourcePage: z.string().trim().min(1).max(240)
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type OutboundClickInput = z.infer<typeof outboundClickSchema>;
