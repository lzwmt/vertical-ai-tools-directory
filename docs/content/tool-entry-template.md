# 工具录入模板

## 用途
该模板用于录入单个 AI 工具的详情内容，适配：
- Astro Content Collections
- Git/MDX 内容流
- 后续分类页、对比页、场景页复用

建议：
- frontmatter 放结构化字段
- 正文放编辑判断和可读内容

## Frontmatter 字段模板

```mdx
---
title: "工具名称"
slug: "tool-slug"
tagline: "一句话描述这个工具最核心的用途"
officialUrl: "https://example.com"
category: "ai-writing"
tags:
  - "copywriting"
  - "social-media"
pricing:
  model: "freemium"
  summary: "免费版可用，付费版解锁高级功能"
supportsChinese: true
availableInChina: false
chinaAccessNotes: "官网可访问，但核心功能需要稳定国际网络环境"
beginnerFriendly: true
teamFriendly: false
apiAvailable: false
platforms:
  - "web"
mainUseCases:
  - "小红书文案生成"
  - "标题灵感"
bestFor:
  - "内容运营"
  - "个人创作者"
notIdealFor:
  - "强团队协作场景"
alternatives:
  - "jasper"
  - "notion-ai"
pros:
  - "上手快"
  - "通用写作能力强"
cons:
  - "中国区使用不稳定"
  - "结果需要人工二次编辑"
editorialVerdict: "适合作为通用写作起点，但不适合对中国区稳定性敏感的团队。"
lastUpdated: "2026-04-30"
draft: false
---
```

## 正文模板

```mdx
## 工具概述

这里用 2 到 4 句话回答：
- 这是什么工具
- 它最擅长什么
- 为什么会被收录

## 适合什么场景

- 场景 1
- 场景 2
- 场景 3

## 实际体验

描述真实试用感受：
- 注册是否顺畅
- 免费版能否覆盖核心体验
- 输出质量是否稳定
- 有没有明显的本地化摩擦

## 优点

- 优点 1
- 优点 2
- 优点 3

## 缺点

- 缺点 1
- 缺点 2
- 缺点 3

## 更适合谁

说明：
- 哪类用户最能从这个工具受益
- 为什么

## 不适合谁

说明：
- 哪类用户不应该优先选它
- 为什么

## 和替代品相比

可以横向写：
- 和 A 相比，它更强在什么
- 和 B 相比，它更弱在什么
- 它适合什么取舍偏好

## 结论

用 2 到 3 句话给出明确建议：
- 值不值得试
- 谁应该先试
- 什么情况下该直接看替代品
```

## 字段说明
- `title`: 展示名称
- `slug`: 页面 URL 标识，必须稳定
- `tagline`: 首页卡片和列表摘要使用
- `officialUrl`: 官网外链
- `category`: 主分类 slug
- `tags`: 辅助筛选和聚合
- `pricing.model`: 建议统一为 `free` / `freemium` / `paid`
- `supportsChinese`: 是否支持中文输入/界面/输出，按真实体验填写
- `availableInChina`: 是否可在中国顺畅使用
- `chinaAccessNotes`: 具体说明，不要只写 true/false
- `bestFor`: 最适合的人群
- `notIdealFor`: 不建议的人群
- `alternatives`: 用于生成替代品关系和对比候选
- `editorialVerdict`: 站点的简短结论
- `lastUpdated`: 最后人工核验日期
- `draft`: 是否草稿

## 填写规范
- 不要照抄官网原文
- 优缺点必须来自真实判断
- 中文支持与中国区可访问性必须分开写
- `editorialVerdict` 必须有结论，不要写成中性废话
- 所有布尔字段都要谨慎填写，避免默认 true
- `screenshot` 优先使用站内路径，如 `/assets/tools/notion-ai.webp`；只有在确实使用远程图床或 R2 时才写完整 URL

## 最小可发布标准
一个工具条目只有满足以下条件才能发布：
- frontmatter 完整
- 有至少一轮人工核验
- 有清晰优缺点
- 有适用人群判断
- 有中国区使用说明
- 有最后更新时间

## 推荐扩展字段
后续如果需要，可以增加：
- screenshots
- affiliateUrl
- ratingInternal
- testedBy
- testedAt
- featureFlags
- languageSupportLevel
