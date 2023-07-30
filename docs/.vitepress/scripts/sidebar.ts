export default {
  "/framework/react/": [
    {
      text: "React",
      collapsed: false,
      items: [
        { text: "简述", link: "/framework/react/" },
        {
          text: "代码分割（Code Splitting）",
          link: "/framework/react/code-splitting",
        },
        {
          text: "VSCode Debugger 用法",
          link: "/framework/react/vscode-debugger",
        },
        {
          text: "React18 源码解析系列",
          collapsed: false,
          items: [
            {
              text: "React Debug 配置",
              link: "/framework/react/scanalysis/react-debugger",
            },
            {
              text: "React.createElement 和 jsx()",
              link: "/framework/react/scanalysis/jsx",
            },
            {
              text: "createRoot 相关",
              link: "/framework/react/scanalysis/create-root",
            },
          ],
        },
      ],
    },
  ],
  "/framework/vitepress/": [
    {
      text: "VitePress",
      collapsed: false,
      items: [
        { text: "简述", link: "/framework/vitepress/" },
        { text: "开启 PWA", link: "/framework/vitepress/pwa" },
        { text: "添加 Algolia 搜索", link: "/framework/vitepress/algolia" },
      ],
    },
  ],
  "/framework/unocss/": [
    {
      text: "UnoCSS",
      collapsed: false,
      items: [{ text: "简述", link: "/framework/unocss/" }],
    },
  ],
  "/column/javascript/": [
    {
      text: "JavaScript",
      collapsed: false,
      items: [
        { text: "简述", link: "/column/javascript/" },
        { text: "Promise", link: "/column/javascript/promise" },
        { text: "async/await", link: "/column/javascript/async-await" },
      ],
    },
  ],
  "/note/": [
    {
      text: "小 记",
      collapsed: false,
      items: [
        { text: "简述", link: "/note/" },
        { text: "Node 包管理器", link: "/note/package-manager" },
      ],
    },
  ],
};
