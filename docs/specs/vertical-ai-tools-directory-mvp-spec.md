# Spec: 垂直 AI 工具导航 MVP

## Assumptions
1. 这是一个面向桌面和移动浏览器的 Web 应用，不做原生 App。
2. 第一阶段只做公开站点和内部管理入口，不做普通访客登录系统。
3. MVP 以“中文内容创作者 / 运营人员”作为默认细分用户群，除非你改。
4. 站点优先服务中文用户，默认中文界面，后续再考虑双语。
5. 我们优先采用超低运维、超低成本、适合内容型 SEO 站点的架构，而不是重后台系统。
6. 数据库使用 `Neon Postgres`；截图与静态内容资源首选仓库 `public/`，后续如资源规模增长再切换到 `Cloudflare R2`。
7. 内容录入以人工策展为主，不做抓取驱动内容生产。
8. 目标是先实现 MVP，不在第一阶段做复杂推荐算法、评论系统或大规模自动化。
9. 除域名外，MVP 基础设施默认应保持在免费额度内运行。

如果以上假设有误，需要先修正再进入实现。

## Objective
构建一个面向中文内容创作者和运营人员的垂直 AI 工具导航站，帮助用户按场景发现、比较并选择 AI 工具，并为后续联盟分佣、赞助展示和咨询服务打下基础。

基础设施目标：
- 除域名注册费用外，MVP 长期运行成本尽量保持为 `¥0/月`
- 在免费额度内支持真实线上流量、表单提交、邮件发送与基础监控
- 优先选择 egress 成本为 0、免费额度稳定、供应商锁定成本可接受的服务

首期 MVP 需要覆盖：
- 首页
- 分类页
- 工具详情页
- 对比页
- 场景 / Best-of 页
- 工具提交页
- 关于 / 评估方法页
- 基础邮件订阅
- 内部内容录入工作流

核心用户故事：
- 作为内容运营，我可以按场景、价格、中文支持等条件筛选工具。
- 作为内容创作者，我可以在单个详情页快速判断工具是否适合我。
- 作为比较型用户，我可以在对比页直接看到不同工具的适用人群、价格与优缺点。
- 作为工具方，我可以提交工具并留下联系方式。
- 作为站点运营者，我可以录入、更新和下线工具内容，而不依赖复杂 CMS。

## Product Scope
### In Scope
- 内容驱动的工具导航站
- 结构化工具数据模型
- 可索引、可筛选的分类和详情页
- 基础搜索
- 外链点击统计
- 表单型工具提交
- 基础邮件订阅采集
- 手动策展工作流
- 基础 SEO 能力：metadata、sitemap、robots、FAQ 结构化内容

### Out of Scope
- 用户账户系统
- 公开评论、评分、UGC
- 个性化推荐算法
- 自动抓取更新工具库
- 浏览器插件
- 复杂支付系统

## Recommended Tech Stack
- Framework: Astro + TypeScript
- Rendering: 以静态生成为主，局部 SSR / API 路由处理动态表单和管理动作
- Deployment: Cloudflare Pages / Workers
- Database: Neon Postgres
- ORM / SQL layer: Drizzle ORM
- Styling: Tailwind CSS
- Content authoring: MDX + Astro Content Collections
- Asset storage: `public/` static assets first, `Cloudflare R2` optional
- Email: Resend
- Monitoring: UptimeRobot
- Runtime validation: Zod
- Analytics: 自建 outbound click event + Cloudflare Web Analytics 或 Plausible 级别轻量方案
- Testing: Vitest + Playwright
- Package manager: pnpm

选择 Astro 的理由：
- 官方文档明确支持部署到 Cloudflare Pages / Workers，且非常适合内容型站点。
- Astro 的 content collections 适合管理结构化内容和编辑型页面。
- 默认最小化客户端 JavaScript，有利于 SEO 和性能。

成本理由：
- `Cloudflare Pages` 免费层适合内容站，带宽压力比部分同类平台更小。
- `Cloudflare Workers` 免费额度足够承载表单、点击追踪、Webhook 和轻量 cron。
- `Neon` 适合低成本 Postgres 场景，并支持 dev / staging / prod 分支式工作流。
- Astro 和 Cloudflare Pages 对本地静态资源支持直接且低成本，适合 MVP 首期把截图放在仓库 `public/` 中。
- `Cloudflare R2` 免费额度和 0 egress 对后续扩容图片与截图资源仍然友好。
- `Resend` 免费额度足够覆盖 MVP 提交通知和订阅确认。
- `UptimeRobot` 足以覆盖生产站点和关键接口存活监控。

## Infrastructure Budget
目标预算：
- 域名：约 `¥5-12/年`
- 前端托管：`¥0`
- 后端 API：`¥0`
- 数据库：`¥0`
- 文件存储：`¥0`
- 邮件发送：`¥0`
- 监控：`¥0`

默认服务组合：
- 域名：Cloudflare Registrar `.xyz`，或 Spaceship 低价后缀
- 前端：Cloudflare Pages
- API：Cloudflare Workers / Pages Functions
- 数据库：Neon Postgres
- 文件存储：`public/` 静态资源优先，`Cloudflare R2` 作为可选扩展
- 邮件：Resend
- 监控：UptimeRobot

服务选择原则：
- 不引入付费 CMS
- 不引入需要最低消费的搜索服务
- 不引入需要长期运行实例的传统后端
- 不引入图片代理或高带宽计费链路

## Commands
以下命令是本项目推荐的标准命令接口，正式脚手架创建后必须保持可执行：

```bash
Install: pnpm install
Dev: pnpm dev
Build: pnpm build
Preview: pnpm preview
Lint: pnpm lint
Format: pnpm format
Test: pnpm test
Test:unit: pnpm test:unit
Test:e2e: pnpm test:e2e
DB generate: pnpm db:generate
DB migrate: pnpm db:migrate
DB studio: pnpm db:studio
Typecheck: pnpm typecheck
```

## Project Structure
建议采用以下结构：

```text
docs/
  specs/                    -> 规格文档、计划、任务拆分
  adr/                      -> 关键架构决策记录

public/                     -> 静态资源

src/
  content/
    categories/             -> 分类内容（MDX / data）
    tools/                  -> 工具详情内容
    comparisons/            -> 对比页内容
    use-cases/              -> 场景页内容
    pages/                  -> about / methodology 等静态内容
  components/
    site/                   -> 页面级展示组件
    ui/                     -> 可复用 UI 组件
    forms/                  -> 提交与订阅表单
  layouts/                  -> 全站布局
  lib/
    db/                     -> Drizzle schema、查询层
    seo/                    -> metadata、schema.org、sitemap
    search/                 -> 搜索索引和过滤逻辑
    analytics/              -> 事件记录
    validation/             -> Zod schema
    config/                 -> 站点配置
  pages/
    index.astro             -> 首页
    categories/
    tools/
    compare/
    best/
    use-cases/
    submit.astro
    about.astro
    api/                    -> 表单提交、点击追踪等接口
  styles/                   -> 全局样式与设计 token

tests/
  unit/                     -> 单元测试
  integration/              -> 数据与页面组合测试

e2e/                        -> Playwright 端到端测试

drizzle/                    -> migration 文件

astro.config.mjs
drizzle.config.ts
wrangler.toml
package.json
```

## Data Model
MVP 核心实体：
- `tool`
- `category`
- `tag`
- `use_case`
- `comparison_page`
- `submission`
- `outbound_click_event`
- `newsletter_subscriber`

推荐分层：
- 编辑型正文内容放在 `src/content/*`
- 可筛选的结构化元数据放在 Postgres
- 页面生成时将内容层与数据库层聚合

这样做的原因：
- 编辑内容更易维护和版本控制
- 表单、统计和运营数据更适合数据库
- 后续从手动录入升级到轻 CMS 时迁移成本更低
- 避免一开始就为 CMS、搜索、后台系统付费

## Code Style
约定：
- 使用 TypeScript 严格模式
- 组件、schema、查询函数命名要体现业务语义，不使用模糊缩写
- 页面数据获取逻辑和展示逻辑分离
- 表单输入、URL params、环境变量都必须经过校验
- 每个模块导出尽量少而明确

风格示例：

```ts
import { z } from "zod";

export const toolFilterSchema = z.object({
  category: z.string().optional(),
  pricing: z.enum(["free", "freemium", "paid"]).optional(),
  supportsChinese: z.coerce.boolean().optional(),
  availableInChina: z.coerce.boolean().optional(),
});

export type ToolFilterInput = z.infer<typeof toolFilterSchema>;

export function parseToolFilters(input: URLSearchParams): ToolFilterInput {
  return toolFilterSchema.parse({
    category: input.get("category") ?? undefined,
    pricing: input.get("pricing") ?? undefined,
    supportsChinese: input.get("supportsChinese") ?? undefined,
    availableInChina: input.get("availableInChina") ?? undefined,
  });
}
```

## Testing Strategy
- Unit tests: Vitest
  - 校验 schema、过滤逻辑、SEO 生成逻辑、URL 构造逻辑
- Integration tests: Vitest
  - 校验内容层与数据库查询层的聚合结果
  - 校验工具页、分类页、对比页的数据装配
- E2E tests: Playwright
  - 首页搜索跳转
  - 分类筛选
  - 工具详情页 CTA 点击
  - 工具提交表单成功路径
  - 邮件订阅成功路径

最低验证要求：
- 关键业务逻辑必须有单元测试
- 每个 MVP 页面类型至少有一个端到端覆盖
- PR 合并前至少通过 `typecheck`、`lint`、`test`

## Boundaries
- Always:
  - 任何用户输入都做 schema 校验
  - 所有页面必须支持移动端和桌面端
  - 所有新增页面必须有基础 SEO metadata
  - 变更前先更新 spec / plan / tasks
  - 提交前运行 `pnpm typecheck && pnpm test`
  - 默认优先免费服务与静态优先方案
- Ask first:
  - 修改数据库核心模型
  - 新增重量级依赖或引入 SaaS CMS
  - 调整部署目标或放弃 Cloudflare 栈
  - 增加用户登录 / 权限系统
  - 引入任何会造成固定月成本的第三方服务
- Never:
  - 提交密钥、数据库 URL、第三方凭证
  - 删除测试来掩盖问题
  - 在没有规格更新的情况下擅自扩 scope
  - 把抓取内容当作 MVP 主内容来源
  - 为了省开发时间而默认引入高成本托管方案

## Success Criteria
满足以下条件，视为 MVP 可交付：

1. 用户可以浏览首页、分类页、工具详情页、对比页、场景页和提交页。
2. 分类页支持按价格、中文支持、中国区可访问性、是否适合新手等至少 4 个维度筛选。
3. 工具详情页展示完整结构化信息，包括优缺点、适用人群、替代方案和 CTA。
4. 对比页支持并排展示至少两款工具的核心差异。
5. 用户可以提交工具，数据能被持久化并可供后台查看。
6. 用户可以完成邮件订阅，订阅数据能被持久化。
7. 站点记录 outbound click event，并能按工具维度聚合点击数据。
8. 内容运营者可以在不直接改数据库记录的前提下，完成核心内容录入或更新。
9. 站点具备 sitemap、robots、canonical、Open Graph 和基础结构化数据。
10. Lighthouse 在主要内容页达到可接受基线：
    - Performance >= 85
    - SEO >= 90
    - Accessibility >= 90
11. 部署链路可在 Cloudflare 上完成预览和生产发布。
12. 站点默认运行应落在所选服务免费额度内，不依赖任何固定月付基础设施。

## Execution Phases
### Phase 0: 规格确认
- 锁定细分用户与首批内容范围
- 锁定技术路线
- 明确录入工作流

### Phase 1: 项目骨架
- 初始化 Astro + TypeScript + Tailwind + Cloudflare 适配
- 建立目录结构、质量命令、基础 layout

### Phase 2: 内容与数据模型
- 建立 content collections
- 建立 Drizzle schema 与 migrations
- 建立种子数据策略

### Phase 3: 核心页面
- 首页
- 分类页
- 工具详情页
- 对比页
- 场景页
- about / methodology

### Phase 4: 动态能力
- 提交表单
- 邮件订阅
- 外链点击统计
- 基础内部管理工作流

### Phase 5: SEO 与上线准备
- metadata
- sitemap / robots
- 重定向、404、监控、基础分析
- E2E 验收

### Phase 6: 成本守门
- 检查各服务免费额度占用
- 校验图片、邮件、数据库和 API 使用量估算
- 确认没有引入隐藏固定成本

## Risks
- 混合内容层 + 数据库层会增加一点建模复杂度
  - 缓解：先定义稳定的 slug 和引用关系
- 如果后台工作流做得过重，会拖慢 MVP
  - 缓解：首期只做最小录入表单或 Git-based 内容流
- 如果赛道不够窄，SEO 和转化会变弱
  - 缓解：上线前必须锁定首批分类与场景

## Open Questions
以下问题需要你确认，确认后我再进入 `PLAN` 阶段：

1. 首发细分赛道暂定为“中文内容创作者 / 运营人员”。
2. 内容录入模式锁定为 `Git/MDX 为主，数据库存结构化数据和表单数据`。
3. 首期框架锁定为 `Astro`。
4. 数据库锁定为 `Neon`，不再保留 `Supabase` 作为默认实现。
5. 邮件订阅与通知在 MVP 中真实接入 `Resend`。
6. 首期后台不做重 CMS，优先手动内容文件维护，后续只允许扩展到极简内部录入入口。
7. 首期变现优先级定为：`SEO/点击验证 -> 联盟分佣验证 -> 赞助位`。
8. 下一阶段进入 `PLAN` 和 `TASKS`，暂不进入编码实现。

## References
- Cloudflare 官方 Astro 部署文档：<https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/>
- Cloudflare 官方 Astro on Workers 文档：<https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/>
- Astro Content Collections 文档：<https://docs.astro.build/en/guides/content-collections/>
