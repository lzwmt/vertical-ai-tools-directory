# 垂直 AI 工具导航 MVP

基于 Astro + Cloudflare + Neon + Drizzle 的内容型工具导航站。

## Commands

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm lint`
- `pnpm format`
- `pnpm test`
- `pnpm test:unit`
- `pnpm test:e2e`
- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:studio`
- `pnpm typecheck`

## Environment

参见 `.env.example`：

- `PUBLIC_SITE_URL`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_EMAIL`
- `RESEND_FROM_EMAIL`
- `R2_PUBLIC_BASE_URL`（可选，仅在截图放 R2 时需要）

## Cloudflare

`wrangler.toml` 已按 Cloudflare Workers SSR 准备好 `main`、`assets`、`compatibility_flags` 和可选 R2 bucket 绑定。

## Screenshot Assets

- 默认建议把工具截图放在 `public/assets/tools/`
- 内容里直接写 `screenshot: /assets/tools/your-tool.webp`
- 只有在截图不想进仓库时，再配置 `R2_PUBLIC_BASE_URL`

## Launch Docs

- `docs/launch/deployment.md`
- `docs/launch/launch-checklist.md`
- `docs/launch/cost-guardrails.md`
