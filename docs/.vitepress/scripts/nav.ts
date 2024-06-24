import type { DefaultTheme } from "vitepress/types";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "🔥 逆向汇总",
    items: [
      { text: "JS逆向", link: "/reverse/jsreverse/xhs" },
      { text: "JS加密算法", link: "/reverse/encryption-algorithm/base64" },
    ],
  },
  {
    text: "🔥 前端框架",
    items: [
      { text: "React", link: "/framework/react/" },
      { text: "Vue", link: "/framework/vue/" },
      { text: "VitePress", link: "/framework/vitepress/" },
      { text: "NestJs", link: "/framework/nestjs/" },
    ],
  },
  {
    text: "🌵 专 栏",
    items: [
      { text: "javascript", link: "/column/javascript/" },
      { text: "git", link: "/column/git/" },
      {
        text: "样式",
        items: [
          {
            text: "css",
            link: "/column/css/css/",
          },
          {
            text: "tailwindcss",
            link: "/column/css/tailwindcss/",
          },
          {
            text: "unocss",
            link: "/column/css/unocss/",
          },
        ],
      },
    ],
  },
  {
    text: "📔 小 记",
    link: "/note/",
  },
  {
    text: "🌐 站 点",
    items: [
      { text: "默认站点", link: "https://www.skillgroup.cn/" },
      { text: "备用站点", link: "https://docs.skillgroup.cn/" },
      { text: "Vercel 站点", link: "https://dapandocs.vercel.app/" },
    ],
  },
];
export default nav;
