import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { description, keywords, developerName } from "./meta";
import { pwa } from './scripts/pwa'

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  pwa,
  title: "DapanDocs",
  description,
  appearance: "dark",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    logo: "./logo.svg",
    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    ["meta", { name: "keywords", content: keywords }],
    ["meta", { name: "author", content: "Choi Yang" }],
    ["meta", { property: "og:type", content: "article" }],
    ["meta", { name: "application-name", content: developerName }],
    ["meta", { name: "apple-mobile-web-app-title", content: developerName }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],

    ["link", { rel: "shortcut icon", href: "/logo.svg" }],
    ["link", { rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    // webfont
    ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "preconnect",
        crossorigin: "anonymous",
        href: "https://fonts.googleapis.com",
      },
    ],
    [
      "link",
      {
        rel: "preconnect",
        crossorigin: "anonymous",
        href: "https://fonts.gstatic.com",
      },
    ],
  ],
}));
