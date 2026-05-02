import { getPublicSiteUrl } from "@/lib/config/env";

export const siteConfig = {
  name: "智选AI",
  description: "面向中文编程与内容团队的 AI 工具选型、场景路径与单工具评测站点。",
  url: getPublicSiteUrl() || "https://ai-tools.example.com",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/#paths", label: "选型路径" },
    { href: "/#reviews", label: "精选工具" },
    { href: "/about", label: "关于本站" },
    { href: "/submit", label: "提交线索" }
  ]
} as const;
