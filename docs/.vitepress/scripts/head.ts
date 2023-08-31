import type { HeadConfig } from "vitepress";
import { keywords, developerName } from "./meta";

const head: HeadConfig[] = [
  ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
  ["meta", { name: "keywords", content: keywords }],
  ["meta", { name: "author", content: developerName }],
  [
    "meta",
    {
      name: "google-site-verification",
      content: "8C08prB1osC3jsMbYZjmrkWEIM1zduj1OxedQjghNxs",
    },
  ],
  ["meta", { name: "baidu-site-verification", content: "codeva-xf7u8GA3Wp" }],
  [
    "meta",
    {
      name: "360-site-verification",
      content: "37fc981df313cb2376c89f6fded04cfc",
    },
  ],
  [
    "meta",
    {
      name: "msvalidate.01",
      content: "95080530C3B969C7083402BB727761AA",
    },
  ],
  ["meta", { property: "og:type", content: "article" }],
  ["meta", { name: "application-name", content: developerName }],
  ["meta", { name: "apple-mobile-web-app-title", content: developerName }],
  [
    "meta",
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://unpkg.com/gitalk/dist/gitalk.css",
    },
  ],
  ["script", { src: "https://unpkg.com/gitalk/dist/gitalk.min.js" }],
];

export default head;
