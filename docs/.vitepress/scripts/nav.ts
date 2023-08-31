import type { DefaultTheme } from "vitepress/types";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "🔥 主流框架",
    items: [
      { text: "React", link: "/framework/react/" },
      { text: "Vue", link: "/framework/vue/" },
      { text: "VitePress", link: "/framework/vitepress/" },
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
      { text: "Vercel 站点", link: "https://dapandocs.vercel.app/" },
    ],
  },
];
export default nav;
