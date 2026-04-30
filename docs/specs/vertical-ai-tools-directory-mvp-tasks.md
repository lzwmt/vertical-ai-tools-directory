# Tasks: 垂直 AI 工具导航 MVP

- [x] Task: 初始化 Astro 项目骨架与 Cloudflare 适配
  - Acceptance: 仓库具备 Astro + TypeScript + Tailwind + Cloudflare 基础配置，能本地启动并成功构建
  - Verify: `pnpm install`、`pnpm dev`、`pnpm build`
  - Files: `package.json`, `astro.config.*`, `tsconfig.json`, `wrangler.toml`, `src/*`

- [x] Task: 建立项目目录结构与基础开发命令
  - Acceptance: `src/content`、`src/components`、`src/lib`、`tests`、`e2e`、`docs` 结构清晰；lint、format、typecheck、test 命令可调用
  - Verify: `pnpm lint`, `pnpm typecheck`, `pnpm test`
  - Files: `package.json`, `src/`, `tests/`, `e2e/`

- [x] Task: 建立全站 layout、导航和设计基础
  - Acceptance: 具备统一页面布局、基础导航、页脚、响应式容器和全局样式 token
  - Verify: 手动检查首页与任意内容页在桌面和移动宽度下正常显示
  - Files: `src/layouts/*`, `src/components/site/*`, `src/styles/*`

- [x] Task: 定义 Astro content collections schema
  - Acceptance: 为 `tools`、`categories`、`comparisons`、`use-cases`、`pages` 建立 schema，并支持 frontmatter 校验
  - Verify: `pnpm typecheck`
  - Files: `src/content.config.*`, `src/content/*`

- [x] Task: 建立 MDX 内容模板与首批样例内容
  - Acceptance: 至少有 2 个工具、1 个分类、1 个对比页、1 个场景页、1 个 about/methodology 页示例
  - Verify: `pnpm dev` 下可访问对应页面
  - Files: `src/content/tools/*`, `src/content/categories/*`, `src/content/comparisons/*`, `src/content/use-cases/*`, `src/content/pages/*`

- [x] Task: 建立数据库连接层和 Drizzle 配置
  - Acceptance: Neon 连接、Drizzle 配置、环境变量读取与基础 DB client 可用
  - Verify: `pnpm db:generate`
  - Files: `drizzle.config.ts`, `src/lib/db/*`, `.env.example`

- [x] Task: 定义 MVP 数据库 schema
  - Acceptance: 至少包含 `submissions`、`newsletter_subscribers`、`outbound_click_events` 三张表和必要索引
  - Verify: `pnpm db:generate`, `pnpm db:migrate`
  - Files: `src/lib/db/schema.ts`, `drizzle/*`
  - Progress: schema、索引和 migration 文件已生成；`pnpm db:migrate` 仍需在真实 `DATABASE_URL` 环境下执行一次

- [x] Task: 建立站点配置和 SEO 工具模块
  - Acceptance: 具备站点 metadata、canonical、Open Graph、robots、sitemap 所需的基础工具函数
  - Verify: `pnpm build`，检查生成结果
  - Files: `src/lib/config/*`, `src/lib/seo/*`, `src/pages/robots.txt.ts`, `src/pages/sitemap*.ts`

- [x] Task: 实现首页
  - Acceptance: 首页包含 Hero、搜索入口、精选分类、编辑精选、最新对比、场景入口和订阅 CTA
  - Verify: 手动检查页面结构与导航跳转
  - Files: `src/pages/index.astro`, `src/components/site/*`

- [x] Task: 实现分类页
  - Acceptance: 分类页支持分类说明、工具列表、推荐模块、相关对比链接和 FAQ 区块
  - Verify: 访问至少一个分类页并检查渲染内容
  - Files: `src/pages/categories/[slug].astro`, `src/components/site/*`

- [x] Task: 实现工具详情页
  - Acceptance: 工具详情页展示完整工具信息、优缺点、适用人群、替代方案、截图和 CTA
  - Verify: 访问至少一个工具详情页并检查字段完整性
  - Files: `src/pages/tools/[slug].astro`, `src/components/site/*`

- [x] Task: 实现对比页
  - Acceptance: 对比页具备并排对比表、推荐摘要、价格对比和 CTA 区块
  - Verify: 访问至少一个对比页
  - Files: `src/pages/compare/[slug].astro`, `src/components/site/*`

- [x] Task: 实现场景 / Best-of 页
  - Acceptance: 场景页包含导语、排序逻辑说明、精选推荐和内部链接
  - Verify: 访问至少一个场景页
  - Files: `src/pages/use-cases/[slug].astro`, `src/pages/best/[slug].astro`, `src/components/site/*`

- [x] Task: 实现 About / Methodology 页面
  - Acceptance: 页面明确说明评估框架、收录原则和赞助披露方式
  - Verify: 手动检查页面内容完整性
  - Files: `src/pages/about.astro` 或 `src/pages/about/[slug].astro`, `src/content/pages/*`

- [x] Task: 实现基础搜索能力
  - Acceptance: 用户可按工具名搜索，并返回匹配结果；不引入外部搜索服务
  - Verify: 手动输入示例工具名并确认结果
  - Files: `src/lib/search/*`, `src/components/forms/*`, `src/pages/*`

- [x] Task: 实现分类筛选能力
  - Acceptance: 支持按价格、中文支持、中国区可访问性、适合新手等维度筛选
  - Verify: 手动切换筛选条件并观察结果变化
  - Files: `src/lib/validation/*`, `src/lib/search/*`, `src/components/forms/*`, `src/pages/categories/[slug].astro`

- [x] Task: 实现工具提交表单和入库逻辑
  - Acceptance: 表单具备校验、可成功写入数据库，并返回清晰成功 / 失败反馈
  - Verify: 提交一次表单并检查数据库记录
  - Files: `src/pages/submit.astro`, `src/pages/api/submissions.ts`, `src/lib/db/*`, `src/lib/validation/*`
  - Progress: 页面、API、共享校验和成功/失败反馈已完成，并已于 `2026-05-01` 通过真实 Neon 数据库写入验证

- [x] Task: 实现邮件订阅表单与 Resend 发送链路
  - Acceptance: 订阅信息可写入数据库，并通过 Resend 发送订阅确认或内部通知
  - Verify: 提交订阅表单并确认数据库记录与邮件发送
  - Files: `src/components/forms/*`, `src/pages/api/newsletter.ts`, `src/lib/mail/*`, `src/lib/db/*`
  - Progress: 订阅表单、入库逻辑、内部通知、订阅确认邮件封装和页面反馈已完成，并已于 `2026-05-01` 通过真实 `DATABASE_URL` + `RESEND_*` 验证

- [x] Task: 实现 outbound click 事件记录
  - Acceptance: 工具 CTA 点击会记录工具维度事件，且不阻塞用户跳转
  - Verify: 点击 CTA 后检查数据库事件记录
  - Files: `src/pages/api/click.ts`, `src/lib/analytics/*`, `src/components/site/*`
  - Progress: CTA 埋点、`sendBeacon`/`keepalive fetch` 上报和 API 已完成，并已于 `2026-05-01` 通过真实数据库事件写入验证

- [x] Task: 建立 R2 资源使用约定
  - Acceptance: 工具截图与静态内容资源有明确存放策略和访问路径约定，且不强依赖 R2
  - Verify: 通过配置或示例内容确认资源可访问
  - Files: `src/lib/assets/*`, `docs/*`, `.env.example`
  - Progress: 已明确默认使用仓库 `public/` 静态资源，`R2_PUBLIC_BASE_URL` 和 `ASSETS_BUCKET` 均为可选扩展

- [x] Task: 补充单元测试和集成测试
  - Acceptance: schema 校验、筛选逻辑、SEO helper、表单校验至少具备基础测试
  - Verify: `pnpm test:unit`
  - Files: `tests/unit/*`, `tests/integration/*`
  - Progress: 单元测试已覆盖 schema 校验、筛选逻辑、SEO helper 和表单校验；集成测试已覆盖 `submissions`、`newsletter`、`click` API 的关键成功/失败分支

- [x] Task: 补充端到端测试
  - Acceptance: 覆盖首页导航、分类筛选、工具详情 CTA、提交表单、邮件订阅
  - Verify: `pnpm test:e2e`
  - Files: `e2e/*`

- [x] Task: 完成 Cloudflare 部署配置与环境变量文档
  - Acceptance: 预览和生产部署所需变量、绑定和步骤文档化，部署配置可用
  - Verify: `pnpm build`，手动检查部署配置
  - Files: `wrangler.toml`, `.env.example`, `README.md` 或 `docs/launch/*`

- [ ] Task: 完成成本守门与上线检查
  - Acceptance: 核心服务均在免费额度约束内，且无隐藏固定成本
  - Verify: 手动审查 `Cloudflare Pages`, `Workers`, `Neon`, `R2`, `Resend`, `UptimeRobot` 配置
  - Files: `docs/launch/*`, `docs/specs/*`
  - Progress: 已补充上线检查清单、`/api/health` 监控落点、官方价格页成本守门文档和 UptimeRobot 免费版非商业限制说明；仍需在真实账号控制台完成一次上线前人工复核
