export const siteConfig = {
  name: "AI 工具垂直导航",
  description: "面向中文内容创作者与运营团队的 AI 工具发现、比较与选型站点。",
  url: import.meta.env.PUBLIC_SITE_URL || "https://ai-tools.example.com",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/categories/ai-writing", label: "分类" },
    { href: "/compare/notion-ai-vs-jasper", label: "对比" },
    { href: "/use-cases/content-workflow", label: "场景" },
    { href: "/about", label: "方法论" },
    { href: "/submit", label: "提交工具" }
  ]
} as const;
