# Launch Checklist

## Preflight

- 配置 `PUBLIC_SITE_URL`
- 配置 `DATABASE_URL`
- 配置 `RESEND_API_KEY`
- 配置 `RESEND_AUDIENCE_EMAIL`
- 配置 `RESEND_FROM_EMAIL`
- 如果截图放在 R2，再配置 `R2_PUBLIC_BASE_URL`
- 如果截图放在 R2，再确认 `ASSETS_BUCKET` 绑定存在

## Build Verification

- 运行 `pnpm lint`
- 运行 `pnpm test`
- 运行 `pnpm typecheck`
- 运行 `pnpm build`
- 如需 Cloudflare 产物验证，运行 `pnpm build:cloudflare`
- 如果本地环境不支持 `workerd`（例如 macOS `< 13.5`），改在 CI 或 Linux 容器执行上一条

## Runtime Verification

- 访问 `/api/health`，确认返回 `200`
- 检查 `/api/health` 中的 `checks.databaseConfigured`
- 检查 `/api/health` 中的 `checks.resendConfigured`
- 检查 `/api/health` 中的 `checks.assetDeliveryMode`
- 打开首页、分类页、工具详情页、对比页、场景页、提交页进行人工检查

## Data and Email Verification

- 提交 `/submit` 表单，确认跳转到 `?status=success`
- 检查 `submissions` 表是否新增记录
- 提交 newsletter 表单，确认跳转到 `?newsletter=success`
- 检查 `newsletter_subscribers` 表是否新增记录
- 检查 `RESEND_AUDIENCE_EMAIL` 是否收到两类内部通知
- 检查订阅邮箱是否收到确认邮件
- `2026-05-01` 本地真实联调结果：以上检查均已完成一次

## Analytics Verification

- 在工具详情页点击 `访问官网`
- 检查 `outbound_click_events` 表是否新增记录
- 确认点击不会阻塞外链跳转

## Monitoring Verification

- 用 UptimeRobot 或等效服务监控 `/api/health`
- 至少配置 1 个站点首页监控和 1 个健康接口监控
- 告警收件人使用真实运营邮箱，而不是个人临时邮箱

## Launch Decision

- 所有自动化检查通过
- 表单、邮件、点击链路都已实测
- 成本守门已按 `docs/launch/cost-guardrails.md` 复核
- 通过后再切正式域名和对外公开
