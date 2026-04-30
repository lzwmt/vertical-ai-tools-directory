# Deployment Notes

## Cloudflare

- 当前仓库已按 Astro 官方推荐的 `Cloudflare Workers` SSR 方式准备 `wrangler.toml`
- 使用 `@astrojs/cloudflare` 适配器，构建输出为 `server`
- `PUBLIC_SITE_URL` 用于 canonical、sitemap 和 robots
- 默认不要求 R2；截图可直接放在仓库 `public/assets/` 下
- 如果选择把截图放到对象存储，再使用 `ASSETS_BUCKET` 和 `R2_PUBLIC_BASE_URL`
- 建议把 `/api/health` 作为 uptime 监控目标之一
- `pnpm build:cloudflare` 依赖本地 `workerd` 运行环境；当前如果开发机低于 macOS `13.5`，建议改在 CI 或 Linux 容器中验证

## Recommended Deploy Path

- Astro 官方当前推荐新项目优先使用 `Cloudflare Workers`，而不是继续新建 `Pages` 项目
- 当前临时站点 URL 可以继续使用 `pages.dev` 做过渡，但正式部署建议迁到 `workers.dev` 或自定义域名
- 本仓库已提供 `pnpm deploy:cloudflare`

## Cloudflare Variables and Secrets

- Plain text variables:
  - `PUBLIC_SITE_URL`
  - `R2_PUBLIC_BASE_URL`（仅在启用 R2 时）
- Secrets:
  - `DATABASE_URL`
  - `RESEND_API_KEY`
- Either variable or secret:
  - `RESEND_AUDIENCE_EMAIL`
  - `RESEND_FROM_EMAIL`

在 Cloudflare Dashboard 中配置路径：

- `Workers & Pages`
- 选择目标 Worker
- `Settings > Variables and Secrets`

## Workers Build Commands

- Build command: `pnpm build:cloudflare`
- Deploy command: `pnpm deploy:cloudflare`
- 如果使用 Dashboard/CI，确保部署前已存在上述 Variables and Secrets

## Neon

- 配置 `DATABASE_URL`
- 先执行 `pnpm db:generate`
- 再执行 `pnpm db:migrate`

## Resend

- 配置 `RESEND_API_KEY`
- 配置 `RESEND_AUDIENCE_EMAIL` 作为内部通知目标
- 配置 `RESEND_FROM_EMAIL` 作为统一发件地址
- Newsletter 订阅成功后会同时发送：
  - 一封内部通知给 `RESEND_AUDIENCE_EMAIL`
  - 一封订阅确认邮件给用户填写的邮箱

## Verification

- 先访问 `/api/health`，确认返回 `200` 和基础 `checks` 状态
- 如果未配置 `R2_PUBLIC_BASE_URL`，`assetDeliveryMode` 返回 `local-or-remote` 属于正常状态
- 提交 `/submit` 表单，确认页面跳转到 `?status=success`
- 提交首页 newsletter 表单，确认页面跳转到 `?newsletter=success`
- 检查数据库中的 `submissions`、`newsletter_subscribers`、`outbound_click_events`
- 检查 `RESEND_AUDIENCE_EMAIL` 是否收到内部通知
- 检查订阅邮箱是否收到确认邮件
- 已于 `2026-05-01` 在本地联调中完成一次真实验证：数据库写入成功，内部通知邮件和订阅确认邮件已收到

更多清单见：

- `docs/launch/launch-checklist.md`
- `docs/launch/cost-guardrails.md`
