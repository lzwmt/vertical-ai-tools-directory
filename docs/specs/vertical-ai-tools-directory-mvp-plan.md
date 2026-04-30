# Plan: 垂直 AI 工具导航 MVP

## Goal
基于已确认的 MVP 规格，实现一个可部署到 Cloudflare、以超低成本运行的垂直 AI 工具导航站。项目必须优先满足：
- 内容站 SEO 能力
- 快速上线
- 手动策展可维护
- 免费额度内长期运行

## Locked Decisions
- 细分赛道：中文内容创作者 / 运营人员
- 前端框架：Astro
- 内容管理：Git/MDX + Astro Content Collections
- 数据库：Neon Postgres
- 资源存储：仓库 `public/` 静态资源优先，`Cloudflare R2` 可选
- 邮件：Resend
- 计算与托管：Cloudflare Pages / Workers
- 监控：UptimeRobot

## Architecture Summary
系统采用三层结构：

1. 内容层
- 使用 `src/content` 下的 MDX / data collections 管理工具正文、分类页、对比页、场景页和 about 页面。
- 内容层负责编辑表达、SEO 正文和业务结论。

2. 应用层
- 使用 Astro 页面与组件渲染内容。
- 使用 API 路由 / Pages Functions 处理表单提交、订阅和事件追踪。
- 使用共享 schema 校验 URL 参数、表单数据和内容 frontmatter。

3. 数据层
- Neon Postgres 存储提交、订阅、点击事件，以及少量结构化索引数据。
- 工具截图和其他内容资源默认放在仓库 `public/`；如后续体积或协作需求增长，再切换到 R2。

## Implementation Order
必须按依赖顺序推进，避免后续返工。

### Phase 1: Project Foundation
先搭项目骨架：
- 初始化 Astro + TypeScript + Tailwind + Cloudflare 适配
- 建立目录结构
- 建立 lint / format / typecheck / test 命令
- 建立全局 layout、design tokens、基础 SEO 配置

为什么先做：
- 后续所有页面、内容模型和 API 都依赖基础结构
- 尽早把 Cloudflare 适配和本地开发跑通，避免后置部署风险

### Phase 2: Content System
构建内容模型与样板数据：
- 定义 content collections schema
- 定义工具、分类、对比、场景页 frontmatter 规范
- 建立首批演示内容
- 建立 slug、内部引用和 SEO 元字段约束

为什么第二步做：
- 这是站点最核心的数据源
- 页面实现必须围绕真实内容结构进行，而不是先拍脑袋写模板

### Phase 3: Database and Server Utilities
构建数据库与动态能力底座：
- 建立 Drizzle schema
- 建立 Neon 连接与环境变量加载
- 建立提交、订阅、点击事件表
- 建立 Resend 邮件发送封装
- 建立资源访问抽象，并允许 `public/` 静态资源与 R2 两种来源

为什么在页面前完成：
- 提交页、订阅、CTA 统计依赖数据库和邮件层
- 越早定下 schema，后面页面组件越稳定

### Phase 4: Core User-Facing Pages
依次实现：
- 首页
- 分类页
- 工具详情页
- 对比页
- 场景 / Best-of 页
- About / Methodology 页

顺序理由：
- 首页和分类页决定整体信息架构
- 工具详情页和对比页承接核心转化
- 场景页和方法页主要强化 SEO 与信任

### Phase 5: Interactive Features
实现轻交互能力：
- 搜索
- 筛选
- 工具提交表单
- 邮件订阅表单
- CTA 点击追踪

顺序理由：
- 这些功能建立在页面和数据库之上
- 完成后才能验证真实用户路径

### Phase 6: SEO, Quality and Launch Readiness
完善上线能力：
- sitemap / robots / canonical / OG
- JSON-LD / FAQ 结构化数据
- 404 / 错误页 / 空状态
- Playwright 验收
- Cloudflare 部署配置
- UptimeRobot 监控清单

### Phase 7: Cost Guardrail Verification
上线前单独做成本审计：
- 核查所有服务是否落在免费额度内
- 检查是否误引入付费依赖
- 评估图片体积、邮件频率、数据库写入频率

## Major Components
### Frontend Components
- Site layout
- Navigation
- Search bar
- Filter panel
- Tool card
- Comparison table
- CTA blocks
- Form components

### Content Modules
- Tool schema
- Category schema
- Comparison schema
- Use-case schema
- Shared metadata helpers

### Backend Modules
- DB client
- DB schema
- Submission repository
- Newsletter repository
- Click event repository
- Resend mail service
- Asset path resolver

### SEO Modules
- Metadata builder
- Canonical helper
- Sitemap generator
- Structured data generator

## Risks and Mitigations
### Risk 1: 内容层与数据库层边界不清
风险：
- 一部分字段到底放 MDX 还是放数据库，容易混乱

缓解：
- 明确规则：编辑内容与人工判断放 MDX；运营事件与动态数据放数据库
- 在 schema 文档和类型中把边界固定

### Risk 2: 首期就做“后台”
风险：
- 后台一旦扩张，会吞掉大量时间

缓解：
- 先只做 Git/MDX 编辑流
- 如果必须补管理能力，也只允许做单一录入表单，不做内容编辑器

### Risk 3: Cloudflare 运行环境差异
风险：
- 本地 Node 环境与 Workers 环境有差异

缓解：
- 第一阶段就使用 Cloudflare 适配
- API 层尽量保持 Web Standard 风格

### Risk 4: 搜索功能过度设计
风险：
- 为搜索引入外部服务，破坏低成本约束

缓解：
- 首期采用本地索引或静态 JSON 过滤
- 只有搜索规模和性能明显成为瓶颈时再升级

### Risk 5: 数据库成本意外上升
风险：
- 事件表无限增长或分支长期不清理

缓解：
- 事件表保留最小字段
- 给 Neon 分支设置明确使用规则
- 后续加入简单归档 / 清理策略

## Parallelization Opportunities
以下工作可以并行，但实现前不强制：

1. 视觉基础和内容 schema 可并行
2. 数据库 schema 和页面线框可并行
3. 首页 / 分类页 与 详情页 / 对比页 可并行
4. SEO 模块与表单模块可并行

## Verification Checkpoints
### Checkpoint A: Foundation
通过条件：
- `pnpm dev` 可运行
- `pnpm build` 成功
- Cloudflare 适配配置完成

### Checkpoint B: Content
通过条件：
- content collections 类型校验通过
- 示例内容可生成对应页面

### Checkpoint C: Data
通过条件：
- Neon 连接成功
- migration 可执行
- Resend 封装具备发送能力

### Checkpoint D: User Paths
通过条件：
- 用户可从首页进入分类页、详情页、对比页
- 提交表单和订阅表单能成功落库
- CTA 点击事件能记录

### Checkpoint E: Launch
通过条件：
- E2E 验收通过
- sitemap / robots 正常输出
- 核心页面 Lighthouse 达到目标
- 成本检查通过

## Done Criteria
计划完成的标志不是“代码写完”，而是：
- 本地与 Cloudflare 预览环境都可运行
- 内容、数据、邮件、事件链路都打通
- MVP 所有页面类型可访问
- 至少有基础种子内容
- 核心用户路径有自动化验证
- 不突破免费额度约束
