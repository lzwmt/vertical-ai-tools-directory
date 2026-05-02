# 无后台内容更新 SOP（给 AI 执行）

## 目标
在没有后台系统的情况下，让 AI 直接通过修改仓库里的内容文件完成站点内容更新。

当前站点定位不是单一的“AI 写作工具目录”，而是一个面向中文编程团队与内容团队的 AI 工具选型站。AI 在执行内容任务时，必须同时覆盖两类场景：

- 编程与技术工作流
  - 代码协作
  - 技术调研
  - 技术文档
  - 知识库问答
- 内容与编辑工作流
  - 选题研究
  - 长文策划
  - 社媒改写
  - 协同写作

本 SOP 默认项目内容通过 `Git + MDX + Astro Content Collections` 维护。AI 的工作对象是仓库文件，不是网页后台。

## 一、唯一事实来源

AI 执行内容更新时，优先级必须如下：

1. `src/content.config.ts`
   - 这是 frontmatter schema 的唯一事实来源。
2. `src/content/` 下现有同类文件
   - 这是当前站点语气、结构和字段写法的参考样例。
3. `docs/content/` 与 `docs/operations/` 下的辅助文档
   - 这些文档只作执行参考，不能覆盖真实 schema。

如果文档示例和 `src/content.config.ts` 冲突，以 `src/content.config.ts` 为准。

## 二、内容文件位置

AI 必须优先在以下目录工作：

- `src/content/tools/`
  - 单工具评测页
- `src/content/use-cases/`
  - 编程或内容场景页
- `src/content/comparisons/`
  - 两个或多个工具的对比页
- `src/content/categories/`
  - 分类页
- `src/content/pages/`
  - About 等静态说明页

当前项目没有稳定使用中的 `src/content/best/`。如无明确要求，不要新建这个目录。

## 三、AI 执行原则

### 必须做

- 先读 schema，再读目标文件，再修改
- 保持 frontmatter 字段完整，且字段名与类型不变
- 优先沿用现有页面语气，不突然切换成营销文案风格
- 修改引用型字段前，先确认目标 slug 已存在
- 修改后检查内部引用是否仍然可解析
- 对真实性不足的结论显式标注 `待人工确认`

### 可以做

- 新建 MDX 文件
- 更新 frontmatter
- 调整正文结构
- 补充 FAQ、适用人群、内链关系
- 更新 About 页面中的站点范围与执行方法说明

### 不要做

- 不要凭空发明 schema 字段
- 不要擅自改 `src/content.config.ts`，除非任务明确要求
- 不要编造价格、套餐、中文支持、中国区可访问性
- 不要把官网宣传语大段复制进正文
- 不要把“模型能力强”直接写成“适合所有团队”
- 不要为了凑数而创建没有足够依据的工具页

## 四、标准工作流

AI 每次执行内容更新时，必须按这个顺序：

1. 识别任务类型
2. 读取 `src/content.config.ts` 中对应 collection schema
3. 找到相同类型的现有样例页
4. 确认要改的是新增还是更新
5. 修改或新建内容文件
6. 检查 slug、引用字段、日期字段、SEO 字段
7. 运行最小必要校验
8. 产出修改摘要与待人工确认项

## 五、支持的任务类型

### 5.1 新增工具页

适用情况：

- 站点决定开始覆盖一个新工具
- 该工具已具备足够信息，能填完整 schema

步骤：

1. 读取 `src/content.config.ts` 中 `tools` collection 的字段要求。
2. 在 `src/content/tools/` 中找 2 到 3 个相近风格样例。
3. 确定 slug、分类、替代品、标签和 SEO 文案。
4. 只有在关键信息足够时才创建文件。
5. 如果 `alternatives` 指向其他工具，必须确认这些工具页已经存在。
6. 保存后检查页面是否满足 schema。

工具页当前必填 frontmatter：

- `name`
- `slug`
- `featured`
- `verdict`
- `tagline`
- `category`
- `priceLabel`
- `priceTier`
- `supportsChinese`
- `availableInChina`
- `beginnerFriendly`
- `website`
- `screenshot`
- `summary`
- `pros`
- `cons`
- `bestFor`
- `notFor`
- `alternatives`
- `tags`
- `publishedAt`
- `seo`

可选字段：

- `affiliateUrl`
- `updatedAt`

执行边界：

- 如果 `priceTier`、`supportsChinese`、`availableInChina` 这类关键字段没有可靠依据，不要硬写。应该停止新增，并在输出里说明被什么信息卡住。

### 5.2 更新已有工具页

适用情况：

- 页面定位仍对，但结论或场景描述需要改
- 站点方向变化后，旧文案只覆盖内容团队，不再覆盖编程团队
- 需要补技术文档、知识库、调研或协作场景描述

步骤：

1. 先读原文件全文。
2. 保留原 slug 和核心事实字段。
3. 优先更新这些部分：
   - `verdict`
   - `tagline`
   - `summary`
   - `pros`
   - `cons`
   - `bestFor`
   - `notFor`
   - `tags`
   - 正文里的结论段与场景适配段
4. 如果改动属于编辑层判断更新，补 `updatedAt`。
5. 不要为了“更像新站点”就硬改未知事实字段。

### 5.3 新增场景页

适用情况：

- 需要补一个新的编程或内容 use-case
- 首页或工具页缺少某条明确的选型路径

步骤：

1. 读取 `src/content.config.ts` 中 `use-cases` collection 的字段要求。
2. 在 `src/content/use-cases/` 中找相邻页面作为样例。
3. 优先做高意图、低歧义场景，不做过泛标题。
4. `featuredTools` 必须全部指向已存在的工具页。
5. `rankingCriteria` 要写成真实可判断标准，而不是空泛赞美。
6. `audienceRecommendations` 必须能回答“谁先试谁”。
7. FAQ 要回答用户最容易犹豫的问题。

当前推荐优先场景：

- 编程协作与技术交付
- 技术文档与知识库协作
- 技术调研与方案比较
- 内容团队工作流自动化
- 长文策划与成稿
- 社媒文案与分发改写

场景页当前必填 frontmatter：

- `title`
- `slug`
- `featured`
- `summary`
- `featuredTools`
- `rankingMethod`
- `rankingCriteria`
- `audienceRecommendations`
- `faq`
- `seo`

### 5.4 更新已有场景页

适用情况：

- 站点方向变化
- featured tools 发生变化
- 排序逻辑需要从“内容创作”扩展到“编程 + 内容”

步骤：

1. 先读原文件。
2. 保留 slug。
3. 优先检查：
   - `summary`
   - `featuredTools`
   - `rankingMethod`
   - `rankingCriteria`
   - `audienceRecommendations`
   - `faq`
4. 如果场景页引用的工具已变化，同步检查这些工具页是否也需要更新。

### 5.5 新增或更新对比页

适用情况：

- 两个工具已经有详情页
- 用户会真实比较它们，而不是运营上硬凑组合

步骤：

1. 读取 `comparisons` collection schema。
2. 确认 `tools` 数组中的引用已存在。
3. `winnerSummary` 必须写成“在什么前提下谁更合适”，不要写绝对赢家。
4. `recommendedFor` 必须是可识别人群，而不是抽象词。

### 5.6 更新分类页

适用情况：

- 分类说明过时
- 某个分类从内容场景扩展到跨团队工作流

步骤：

1. 读取 `categories` collection schema。
2. 修改 `shortDescription`、`heroTitle`、`heroSummary`、`featuredToolSlugs` 和 FAQ。
3. 不要删除仍被工具页引用的 category slug。

### 5.7 更新 About 页面

适用情况：

- 站点定位变化
- 覆盖范围变化
- 内容方法变化

步骤：

1. 找到 `src/content/pages/about.mdx`。
2. 只改动与站点定位、覆盖范围、方法说明相关的段落。
3. 确保页面表述与站点当前已上线内容一致，不要写“已经覆盖”但仓库里并不存在。

## 六、frontmatter 修改规则

AI 修改 frontmatter 时必须遵守：

- 字段名严格保持稳定
- 布尔值写 `true` 或 `false`
- 日期统一 `YYYY-MM-DD`
- 数组字段必须保持数组格式
- 引用字段必须使用已存在的 content entry slug
- 不删除未知但已存在字段
- `seo.title` 与 `seo.description` 不能为空

当前引用字段重点检查：

- `tools.category` 必须引用 `categories`
- `tools.alternatives` 必须引用 `tools`
- `use-cases.featuredTools` 必须引用 `tools`
- `comparisons.tools` 必须引用 `tools`

## 七、正文修改规则

AI 修改正文时必须遵守：

- 先下结论，再解释原因
- 保留现有页面的短段落风格
- 不写成“功能罗列 + 官网页面翻译”
- 每个工具页都要回答“适合谁 / 不适合谁”
- 每个场景页都要回答“这个场景先试谁”
- 编程场景要写清是偏代码协作、技术研究、技术文档还是知识库
- 内容场景要写清是偏研究、成稿、改写还是协作

## 八、文件命名规则

### 工具页

- 路径：`src/content/tools/<slug>.mdx`
- 例子：`src/content/tools/chatgpt.mdx`

### 场景页

- 路径：`src/content/use-cases/<slug>.mdx`
- 例子：`src/content/use-cases/engineering-workflow.mdx`

### 对比页

- 路径：`src/content/comparisons/<slug>.mdx`

### 页面说明

- 路径：`src/content/pages/<slug>.mdx`

## 九、最小校验要求

内容修改后，AI 至少要做以下一项校验：

- 运行与内容相关的测试
- 或运行 type/content 校验

如果没跑校验，必须在输出里说明原因。

## 十、AI 输出格式要求

AI 完成一次内容更新后，应该输出：

```text
任务类型：
- 新增工具页 / 更新工具页 / 新增场景页 / 更新场景页 / 更新分类页 / 更新 About 页 / 新增对比页 / 更新对比页

修改文件：
- 路径 1
- 路径 2

本次修改：
- 更新了哪些字段
- 更新了哪些正文段落
- 是否新增了内容页
- 是否补了引用关系
- 是否跑了校验

待人工确认：
- 哪些事实字段仍不确定
- 哪些结论属于编辑判断
- 哪些页面后续还应联动更新
```

## 十一、推荐参考文档

AI 执行时可参考以下文档，但如果与当前 schema 冲突，仍以 `src/content.config.ts` 为准：

- [content-collection-sop.md](/Users/admin/Work/code/ai_tool/docs/content/content-collection-sop.md)
- [tool-entry-template.md](/Users/admin/Work/code/ai_tool/docs/content/tool-entry-template.md)
- [launch-content-architecture.md](/Users/admin/Work/code/ai_tool/docs/content/launch-content-architecture.md)
- [content-prompts.md](/Users/admin/Work/code/ai_tool/docs/operations/content-prompts.md)

## 十二、最重要的执行边界

一句话规则：

`AI 可以负责整理、起草、更新和扩写内容文件；凡是涉及价格、套餐、中文支持、中国区可访问性、组织级安全承诺等真实性风险较高的字段，没有可靠依据就不要补。`
