# Tasks: 垂直 AI 工具导航 MVP

## 说明
这份任务清单基于原始 MVP 任务重新整理，状态分为：
- `[x]` 已完成：文档、规格、内容策略、竞品拆解等已经落库
- `[ ]` 待实现：真正还需要开发或录入的工作
- `后置`：保留在大 MVP 中，但不建议作为当前第一阶段优先实现

当前项目实际进度已经完成了大量“规格与运营准备”，所以这份清单不再把它们当成未开始任务。

## 已完成：规格与策略层

- [x] Task: 明确 MVP 规格与技术路线
  - Acceptance: 完成产品目标、技术栈、边界、成功标准定义
  - Verify: 规格文档已存在并可审阅
  - Files: `docs/specs/vertical-ai-tools-directory-mvp-spec.md`

- [x] Task: 完成 MVP 实施计划
  - Acceptance: 已定义架构、实施顺序、依赖关系、风险与验证节点
  - Verify: 计划文档已存在并可审阅
  - Files: `docs/specs/vertical-ai-tools-directory-mvp-plan.md`

- [x] Task: 完成原始大 MVP 任务拆分
  - Acceptance: 已有完整任务树可作为总蓝图
  - Verify: 本文档已更新
  - Files: `docs/specs/vertical-ai-tools-directory-mvp-tasks.md`

- [x] Task: 收敛首发版本为 Best-of 与单工具评测优先
  - Acceptance: 已形成收敛版 PRD 和专项任务清单
  - Verify: 文档已存在并可审阅
  - Files: `docs/prd/best-of-and-tool-review-prd.md`, `docs/specs/best-of-and-tool-review-tasks.md`

- [x] Task: 完成内容采集 SOP 与工具录入模板
  - Acceptance: 已定义采集流程、发布标准和 MDX 录入模板
  - Verify: 文档已存在并可审阅
  - Files: `docs/content/content-collection-sop.md`, `docs/content/tool-entry-template.md`

- [x] Task: 完成首发内容架构
  - Acceptance: 已定义首批分类、Best-of 主题、对比页方向和工具池
  - Verify: 文档已存在并可审阅
  - Files: `docs/content/launch-content-architecture.md`

- [x] Task: 完成运营与 AI 辅助流程设计
  - Acceptance: 已定义运营 SOP、前 90 天计划、AI 工作流、Prompt 模板和自动化边界
  - Verify: 文档已存在并可审阅
  - Files: `docs/operations/operations-sop.md`, `docs/operations/first-90-days-growth-plan.md`, `docs/operations/ai-operations-workflow.md`, `docs/operations/content-prompts.md`, `docs/operations/automation-boundaries.md`

- [x] Task: 完成 Tool Finder 竞品拆解与映射
  - Acceptance: 已明确可借鉴的页面体系与不应照搬的部分
  - Verify: 文档已存在并可审阅
  - Files: `docs/competitive/tool-finder-mapping-for-ai-directory.md`

## 待实现：第一阶段开发

### Phase 1: 项目骨架

- [ ] Task: 初始化 Astro 项目骨架与 Cloudflare 适配
  - Acceptance: 仓库具备 Astro + TypeScript + Tailwind + Cloudflare 基础配置，能本地启动并成功构建
  - Verify: `pnpm install`, `pnpm dev`, `pnpm build`
  - Files: `package.json`, `astro.config.*`, `tsconfig.json`, `wrangler.toml`, `src/*`

- [ ] Task: 建立项目目录结构与基础开发命令
  - Acceptance: `src/content`、`src/components`、`src/lib`、`tests`、`e2e`、`docs` 结构清晰；lint、format、typecheck、test 命令可调用
  - Verify: `pnpm lint`, `pnpm typecheck`, `pnpm test`
  - Files: `package.json`, `src/`, `tests/`, `e2e/`

- [ ] Task: 建立全站 layout、导航和设计基础
  - Acceptance: 具备统一页面布局、基础导航、页脚、响应式容器和全局样式 token
  - Verify: 手动检查首页与任意内容页在桌面和移动宽度下正常显示
  - Files: `src/layouts/*`, `src/components/site/*`, `src/styles/*`

### Phase 2: 内容系统

- [ ] Task: 定义 Astro content collections schema
  - Acceptance: 为 `tools`、`categories`、`comparisons`、`use-cases`、`pages` 建立 schema，并支持 frontmatter 校验
  - Verify: `pnpm typecheck`
  - Files: `src/content.config.*`, `src/content/*`

- [ ] Task: 建立 MDX 内容模板与首批样例内容
  - Acceptance: 至少有 2 个工具、1 个分类、1 个对比页、1 个场景页、1 个 about/methodology 页示例
  - Verify: `pnpm dev` 下可访问对应页面
  - Files: `src/content/tools/*`, `src/content/categories/*`, `src/content/comparisons/*`, `src/content/use-cases/*`, `src/content/pages/*`

### Phase 3: 数据层与基础服务

- [ ] Task: 建立数据库连接层和 Drizzle 配置
  - Acceptance: Neon 连接、Drizzle 配置、环境变量读取与基础 DB client 可用
  - Verify: `pnpm db:generate`
  - Files: `drizzle.config.ts`, `src/lib/db/*`, `.env.example`

- [ ] Task: 定义 MVP 数据库 schema
  - Acceptance: 至少包含 `submissions`、`newsletter_subscribers`、`outbound_click_events` 三张表和必要索引
  - Verify: `pnpm db:generate`, `pnpm db:migrate`
  - Files: `src/lib/db/schema.ts`, `drizzle/*`

- [ ] Task: 建立站点配置和 SEO 工具模块
  - Acceptance: 具备站点 metadata、canonical、Open Graph、robots、sitemap 所需的基础工具函数
  - Verify: `pnpm build`，检查生成结果
  - Files: `src/lib/config/*`, `src/lib/seo/*`, `src/pages/robots.txt.ts`, `src/pages/sitemap*.ts`

### Phase 4: 当前最优先页面

- [ ] Task: 实现首页
  - Acceptance: 首页包含 Hero、场景入口、精选工具、最近评测和方法论入口
  - Verify: 手动检查页面结构与导航跳转
  - Files: `src/pages/index.astro`, `src/components/site/*`

- [ ] Task: 实现单工具评测页
  - Acceptance: 工具详情页展示完整工具信息、优缺点、适合人群、替代方案、截图和 CTA
  - Verify: 访问至少一个工具详情页并检查字段完整性
  - Files: `src/pages/tools/[slug].astro`, `src/components/site/*`

- [ ] Task: 实现 Best-of 场景页
  - Acceptance: 场景页包含导语、推荐标准、推荐工具列表、分人群建议和内部链接
  - Verify: 访问至少一个场景页
  - Files: `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`, `src/components/site/*`

- [ ] Task: 实现 About / Methodology 页面
  - Acceptance: 页面明确说明评估框架、收录原则和赞助披露方式
  - Verify: 手动检查页面内容完整性
  - Files: `src/pages/about.astro` 或 `src/pages/about/[slug].astro`, `src/content/pages/*`

### Phase 5: 首批内容录入

- [ ] Task: 录入首批单工具评测内容
  - Acceptance: 至少完成 8 个工具评测页
  - Verify: 本地可访问 8 个工具页
  - Files: `src/content/tools/*`

- [ ] Task: 录入首批 Best-of 内容
  - Acceptance: 至少完成 4 到 5 个 Best-of 页面
  - Verify: 本地可访问 4 到 5 个场景页
  - Files: `src/content/best/*` 或 `src/content/use-cases/*`

- [ ] Task: 建立首页推荐与站内内链
  - Acceptance: 首页展示重点 Best-of 与重点工具页；Best-of 与工具页之间互相回链
  - Verify: 手动点击检查链接可达
  - Files: `src/pages/index.astro`, `src/pages/tools/[slug].astro`, `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`

### Phase 6: 基础转化与质量

- [ ] Task: 实现基础 CTA 外链模块
  - Acceptance: 工具页和 Best-of 推荐卡片都具备官网 CTA，且跳转行为正常
  - Verify: 手动点击外链
  - Files: `src/components/site/*`, `src/pages/tools/[slug].astro`, `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`

- [ ] Task: 增加内容 schema 与辅助函数测试
  - Acceptance: 工具 frontmatter、Best-of frontmatter、SEO helper 至少有基础测试
  - Verify: `pnpm test:unit`
  - Files: `tests/unit/*`

- [ ] Task: 增加关键页面渲染测试与基础 E2E
  - Acceptance: 覆盖首页、1 个工具页、1 个 Best-of 页，以及首页 -> Best-of -> 工具页的核心路径
  - Verify: `pnpm test`, `pnpm test:e2e`
  - Files: `tests/integration/*`, `e2e/*`

- [ ] Task: 完成上线前内容与页面检查
  - Acceptance: 页面无死链、移动端可读、SEO metadata 正常输出
  - Verify: 手动检查 + `pnpm build`
  - Files: `src/pages/*`, `src/content/*`

## 后置：第二阶段恢复的大 MVP 能力

后置功能仍保留在完整路线中，但不建议压到当前第一阶段一起做：

- 后置: 分类页与筛选系统
- 后置: 对比页
- 后置: 替代品独立页
- 后置: 搜索
- 后置: 工具提交表单
- 后置: 邮件订阅
- 后置: outbound click 事件记录
- 后置: 极简内部管理入口
- 后置: R2 资源迁移与更大规模截图存储

## 当前推荐执行顺序

1. 项目骨架
2. content collections
3. 单工具评测页模板
4. Best-of 页模板
5. 首页与方法论页
6. 首批内容录入
7. SEO、CTA、测试
8. 再决定是否恢复分类页 / 对比页 / 提交页
