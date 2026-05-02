# Tasks: Best-of 与单工具评测优先版

## 说明
这份任务清单服务于 [best-of-and-tool-review-prd.md](/Users/admin/Work/code/ai_tool/docs/prd/best-of-and-tool-review-prd.md)，并参考 [vertical-ai-tools-directory-mvp-tasks.md](/Users/admin/Work/code/ai_tool/docs/specs/vertical-ai-tools-directory-mvp-tasks.md) 的当前进度重整。

状态说明：
- `[x]` 已完成：规划、内容策略、运营策略等已落库
- `[ ]` 待实现：当前这条收敛路线还需要开发或录入的工作；也包含“仓库里已有初版，但还没满足这份优先版验收”的项目
- `后置`：不属于这条优先版路线的首期范围

范围严格限制为：
- 首页
- Best-of 场景页
- 单工具评测页
- About / Methodology 页
- 基础 SEO
- 基础 CTA 外链

不包含：
- 分类筛选
- 对比页
- 提交表单
- 邮件订阅
- 搜索
- 复杂埋点

## 已完成：规格与内容准备

- [x] Task: 完成收敛版 PRD
  - Acceptance: 已明确为什么先做 Best-of 与单工具评测，以及与大 MVP 的范围差异
  - Verify: 文档已存在并可审阅
  - Files: `docs/prd/best-of-and-tool-review-prd.md`

- [x] Task: 完成总规格与总计划
  - Acceptance: 已明确整体产品目标、技术路线、架构和完整 MVP 蓝图
  - Verify: 文档已存在并可审阅
  - Files: `docs/specs/vertical-ai-tools-directory-mvp-spec.md`, `docs/specs/vertical-ai-tools-directory-mvp-plan.md`

- [x] Task: 完成内容采集 SOP 与工具录入模板
  - Acceptance: 已定义采集流程、发布标准、工具页字段和 MDX 模板
  - Verify: 文档已存在并可审阅
  - Files: `docs/content/content-collection-sop.md`, `docs/content/tool-entry-template.md`

- [x] Task: 完成首发内容架构
  - Acceptance: 已定义首批场景页方向、工具池和内容优先级
  - Verify: 文档已存在并可审阅
  - Files: `docs/content/launch-content-architecture.md`

- [x] Task: 完成运营与 AI 辅助方案
  - Acceptance: 已定义运营 SOP、90 天增长计划、AI 工作流、Prompt 模板和自动化边界
  - Verify: 文档已存在并可审阅
  - Files: `docs/operations/operations-sop.md`, `docs/operations/first-90-days-growth-plan.md`, `docs/operations/ai-operations-workflow.md`, `docs/operations/content-prompts.md`, `docs/operations/automation-boundaries.md`

- [x] Task: 完成 Tool Finder 拆解与页面映射
  - Acceptance: 已明确 Best-of 与单工具评测应该怎么借鉴 Tool Finder
  - Verify: 文档已存在并可审阅
  - Files: `docs/competitive/tool-finder-mapping-for-ai-directory.md`

## 已核对：当前仓库基线（2026-05-01）

- [x] Task: 核对当前实现与优先版任务基线
  - Acceptance: 已确认当前仓库哪些能力可复用，哪些仍需按优先版收敛
  - Verify: `pnpm typecheck`, `pnpm build`, `pnpm test:unit`
  - Result: 三项命令当前均通过；站点已具备 Astro 工程、内容集合、首页/工具页/方法论页、`/use-cases` 场景页、基础 robots 与 sitemap、以及单元测试基础设施

## 待实现：第一阶段开发

## Phase 1: 项目骨架

- [x] Task: 初始化 Astro 项目与 Cloudflare 适配
  - Acceptance: 项目可本地运行、可构建，并具备 Cloudflare Pages / Workers 所需基础配置
  - Verify: `pnpm install`, `pnpm dev`, `pnpm build`
  - Files: `package.json`, `astro.config.*`, `tsconfig.json`, `wrangler.toml`

- [x] Task: 建立基础目录结构
  - Acceptance: 建立 `src/content/tools`、`src/content/best` 或 `src/content/use-cases`、`src/content/pages`、`src/components`、`src/layouts`、`src/lib`
  - Verify: 手动检查目录结构
  - Files: `src/`, `docs/`

- [x] Task: 建立全局样式与基础布局
  - Acceptance: 站点具备统一 layout、响应式容器、头部导航、页脚和基础视觉 token
  - Verify: 本地预览首页和内容页布局正常
  - Files: `src/layouts/*`, `src/components/site/*`, `src/styles/*`

## Phase 2: 内容模型

- [x] Task: 定义 content collections schema
  - Acceptance: 为 `tools`、`best` 或 `use-cases`、`pages` 建立 schema，并覆盖 PRD 所需字段
  - Verify: `pnpm typecheck`
  - Files: `src/content.config.*`

- [x] Task: 建立单工具评测页内容模板
  - Acceptance: `tools` collection 支持工具基础信息、中文支持、中国区可访问性、优缺点、适合谁 / 不适合谁、CTA 和更新时间
  - Verify: 创建示例内容后可通过 schema 校验
  - Files: `src/content/tools/*`, `src/content.config.*`

- [x] Task: 建立 Best-of 场景页内容模板
  - Acceptance: `best` 或 `use-cases` collection 支持场景描述、推荐标准、推荐工具列表、分人群建议和 FAQ
  - Verify: 创建示例内容后可通过 schema 校验
  - Files: `src/content/best/*` 或 `src/content/use-cases/*`, `src/content.config.*`

- [x] Task: 建立 About / Methodology 内容模板
  - Acceptance: 支持站点定位、评估标准、收录原则和商业披露内容
  - Verify: 创建示例页面并可本地访问
  - Files: `src/content/pages/*`

## Phase 3: 页面模板

- [x] Task: 实现首页模板
  - Acceptance: 首页包含 Hero、热门场景入口、编辑精选工具、最近更新评测、方法论入口
  - Verify: 手动访问首页并确认模块完整
  - Files: `src/pages/index.astro`, `src/components/site/*`

- [x] Task: 实现 Best-of 场景页模板
  - Acceptance: 页面包含标题、导语、推荐标准、工具推荐列表、分人群建议、FAQ 和相关工具链接
  - Verify: 访问至少 1 个 Best-of 页面并确认结构完整
  - Files: `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`, `src/components/site/*`

- [x] Task: 实现单工具评测页模板
  - Acceptance: 页面包含一句话结论、基础信息、场景适配、优缺点、适合谁 / 不适合谁、替代工具、相关 Best-of 页和 CTA
  - Verify: 访问至少 1 个工具评测页并确认字段完整
  - Files: `src/pages/tools/[slug].astro`, `src/components/site/*`

- [x] Task: 实现 About / Methodology 页面模板
  - Acceptance: 页面完整展示评估方法、本地化判断标准和商业披露
  - Verify: 访问页面并检查内容完整性
  - Files: `src/pages/about.astro` 或 `src/pages/[slug].astro`, `src/components/site/*`

## Phase 4: 首批内容录入

- [x] Task: 准备首批单工具评测样例内容
  - Acceptance: 至少录入 8 个工具评测页
  - Verify: 本地可访问 8 个工具页
  - Files: `src/content/tools/*`

- [x] Task: 准备首批 Best-of 样例内容
  - Acceptance: 至少录入 4 到 5 个 Best-of 页面
  - Verify: 本地可访问 4 到 5 个场景页
  - Files: `src/content/best/*` 或 `src/content/use-cases/*`

- [x] Task: 建立首页推荐逻辑
  - Acceptance: 首页可展示首批重点 Best-of 页面和重点工具评测页
  - Verify: 首页模块数据正常渲染
  - Files: `src/pages/index.astro`, `src/lib/*`

- [x] Task: 建立 Best-of 到工具页的内链
  - Acceptance: 每个 Best-of 页面至少链接 4 个工具评测页
  - Verify: 手动点击检查链接可达
  - Files: `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`, `src/content/best/*`

- [x] Task: 建立工具页回链 Best-of 页
  - Acceptance: 每个工具评测页至少展示 2 个相关 Best-of 页面入口
  - Verify: 手动点击检查链接可达
  - Files: `src/pages/tools/[slug].astro`, `src/content/tools/*`

## Phase 5: SEO 与基础转化

- [x] Task: 建立站点 SEO 基础设施
  - Acceptance: 支持 title、description、canonical、Open Graph 和基础结构化数据
  - Verify: `pnpm build` 后检查页面输出
  - Files: `src/lib/seo/*`, `src/pages/*`

- [x] Task: 为 Best-of 和工具页生成专属 metadata
  - Acceptance: 每个页面类型都能根据内容生成唯一 metadata
  - Verify: 本地查看页面 head 输出
  - Files: `src/lib/seo/*`, `src/pages/tools/[slug].astro`, `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`

- [x] Task: 实现基础 CTA 外链模块
  - Acceptance: 工具页和 Best-of 推荐卡片都具备官网 CTA，且跳转行为正常
  - Verify: 手动点击外链
  - Files: `src/components/site/*`, `src/pages/tools/[slug].astro`, `src/pages/best/[slug].astro` 或 `src/pages/use-cases/[slug].astro`

- [x] Task: 输出 sitemap 和 robots
  - Acceptance: 所有公开页面都可被索引，sitemap 与 robots 正常生成
  - Verify: 构建后检查输出文件
  - Files: `src/pages/robots.txt.ts`, `src/pages/sitemap*.ts`

## Phase 6: 质量验证

- [x] Task: 增加内容 schema 与辅助函数单元测试
  - Acceptance: 工具 frontmatter、Best-of frontmatter、SEO helper 至少有基础单元测试
  - Verify: `pnpm test:unit`
  - Files: `tests/unit/*`

- [x] Task: 增加关键页面渲染测试
  - Acceptance: 至少覆盖首页、1 个工具页、1 个 Best-of 页的数据装配
  - Verify: `pnpm test`
  - Files: `tests/integration/*`

- [x] Task: 增加基础 E2E 验收
  - Acceptance: 覆盖首页进入 Best-of 页、Best-of 页进入工具页、工具页 CTA 点击 3 条核心路径
  - Verify: `pnpm test:e2e`
  - Files: `e2e/*`

- [ ] Task: 执行上线前内容与页面检查
  - Acceptance: 页面无空状态错误、无死链、首批内容完整、移动端可读
  - Verify: 手动检查 + `pnpm build`
  - Files: `src/pages/*`, `src/content/*`

## 后置：不属于当前优先版范围

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
2. content collections schema
3. 单工具评测页模板
4. Best-of 页模板
5. 首页与方法论页
6. 首批内容录入
7. SEO、CTA、测试
