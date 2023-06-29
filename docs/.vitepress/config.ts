import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { description, keywords, title, developerName } from "./meta";
import { pwa } from "./scripts/pwa";
import algolia from "./scripts/algolia";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    pwa,
    title,
    description,
    appearance: "dark",
    themeConfig: {
      search: {
        provider: "algolia",
        options: algolia,
      },
      sidebar,
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "🔥主流框架",
          items: [
            { text: "React", link: "/framework/react/" },
            { text: "Vue", link: "/framework/vue/" },
          ],
        },
      ],
      logo: "./logo.svg",
      socialLinks: [
        { icon: "github", link: "https://github.com/dapandocs/danpan-docs" },
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
  })
);
