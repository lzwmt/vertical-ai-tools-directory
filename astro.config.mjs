import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const targetAdapter =
  process.env.ASTRO_LOCAL_ADAPTER === "cloudflare"
    ? cloudflare({
        inspectorPort: false
      })
    : node({
        mode: "standalone"
      });

export default defineConfig({
  site: "https://ai-tools.example.com",
  output: "server",
  adapter: targetAdapter,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  },
  build: {
    format: "directory"
  }
});
