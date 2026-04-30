# Cost Guardrails

Last reviewed: `2026-05-01`

## Objective

把 MVP 长期固定成本压在 `¥0/月` 附近，只保留域名年费，并在真实流量到来前避免误触发付费升级。

## Repo-Level Verdict

- Cloudflare Pages / Workers：当前实现以静态页面为主，只有表单、点击埋点和健康检查走 Functions，符合免费层使用方式
- Neon Postgres：当前只承载 `submissions`、`newsletter_subscribers`、`outbound_click_events` 三张轻量表，结构上适合免费层试运行
- 资源存储：当前默认可直接使用仓库 `public/` 静态资源；如后续截图规模增大，再切换到 R2
- Resend：当前邮件仅覆盖工具提交通知、newsletter 内部通知和订阅确认，适合低频发送
- UptimeRobot：可用于基础可用性监控，但免费计划有非商业用途边界，需要在开始商业化前重新确认是否继续使用

## Official Pricing Snapshot

- Cloudflare Workers / Pages Functions：官方文档说明 `Pages Functions` 按 `Workers` 计费，免费计划每日 `100,000` 请求，静态资源请求免费且不限量  
  Source: https://developers.cloudflare.com/workers/platform/pricing/  
  Source: https://developers.cloudflare.com/pages/functions/pricing/

- Cloudflare R2：官方文档说明免费额度包含每月 `10 GB-month` 存储、`1 million` Class A 请求、`10 million` Class B 请求，且公网 egress 免费；但当前 MVP 可不启用  
  Source: https://developers.cloudflare.com/r2/pricing/

- Neon：官方定价页当前展示 Free 计划为 `100 projects`、每项目每月 `100 CU-hrs`、每项目 `0.5 GB` 存储  
  Source: https://neon.com/pricing

- Resend：官方定价页当前展示 Free 计划为每月 `3,000` 封邮件、每日 `100` 封限制  
  Source: https://resend.com/pricing

- UptimeRobot：官方定价页当前展示 Free 计划为 `50 monitors`、`5 min` 监控间隔；帮助中心说明免费计划面向非商业用途  
  Source: https://uptimerobot.com/pricing/  
  Source: https://help.uptimerobot.com/en/articles/11604710-who-is-uptimerobot-s-free-plan-for

## Practical Guardrails

- 不开启 Cloudflare Workers Paid plan；若控制台提示升级，先排查 Functions 请求量和异常重试
- 首页和内容页保持静态优先，避免把搜索、筛选、详情页渲染迁移成每次请求都触发 Functions
- 不把点击事件写成每次页面曝光都上报；当前仅 CTA 点击上报，继续维持
- 控制截图资源体积；无论放在 `public/` 还是 R2，优先压缩为 WebP/JPEG
- Resend 只发送事务型低频邮件，不发送高频营销群发
- UptimeRobot 如进入商业化阶段，优先改用其付费计划或替换为明确支持商业用途的监控方案

## Launch Audit Checklist

- Cloudflare：确认项目仍在 Free 计划，且没有启用付费附加项
- Cloudflare Pages / Workers：确认 `/api/newsletter`、`/api/submissions`、`/api/click`、`/api/health` 都在预期路由下工作
- 如果启用了 R2：确认 bucket 仅存放截图和静态资源，没有接入高频读写工作流
- Neon：确认生产库仅保留 MVP 所需表，未启用额外付费能力
- Resend：确认日发送量预估低于 `100/day`
- UptimeRobot：确认是否仍可按非商业/预发布用途使用；若开始商业化，立即复核计划

## Go / No-Go

- Go：内容站流量低到中等、表单提交低频、邮件为事务型、监控只做基础可用性，且截图可由 `public/` 或低频 R2 资源承载
- No-Go：开始高频营销邮件、大量动态 API 请求、图片处理链路扩张、或站点进入明确商业化阶段但仍依赖 UptimeRobot Free
