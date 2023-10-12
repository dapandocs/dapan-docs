import type { DefaultTheme } from "vitepress/types";

export default {
  "/framework/react": [
    {
      text: "React",
      items: [
        { text: "简述", link: "/framework/react/" },
        {
          text: "JSX 语法",
          link: "/framework/react/jsx",
        },
        {
          text: "React Hooks",
          collapsed: true,
          items: [
            {
              text: "useState",
              link: "/framework/react/hooks/use-state",
            },
            {
              text: "useEffect",
              link: "/framework/react/hooks/use-effect",
            },
            {
              text: "useRef",
              link: "/framework/react/hooks/use-ref",
            },
            {
              text: "memo",
              link: "/framework/react/hooks/memo",
            },
            {
              text: "useMemo",
              link: "/framework/react/hooks/use-memo",
            },
            {
              text: "useCallback",
              link: "/framework/react/hooks/use-callback",
            },
            {
              text: "useContext",
              link: "/framework/react/hooks/use-context",
            },
            {
              text: "forwardRef",
              link: "/framework/react/hooks/forward-ref",
            },
            {
              text: "useReducer",
              link: "/framework/react/hooks/use-reducer",
            },
            {
              text: "useImperativeHandle",
              link: "/framework/react/hooks/use-imperative-handle",
            },
            {
              text: "useDeferredValue",
              link: "/framework/react/hooks/use-deferred-value",
            },
          ],
        },
        {
          text: "代码分割（Code Splitting）",
          link: "/framework/react/code-splitting",
        },
        {
          text: "React 生命周期",
          link: "/framework/react/life-cycle",
        },
        {
          text: "父子组件的渲染顺序",
          link: "/framework/react/render-order",
        },
        {
          text: "React18 新特性",
          link: "/framework/react/new-features",
        },
        {
          text: "React18 严格模式",
          link: "/framework/react/strict-mode",
        },
        {
          text: "React18 源码解析系列",
          collapsed: true,
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
    {
      text: "React-Router",
      items: [
        {
          text: "简述",
          link: "/framework/react/react-router/",
        },
        {
          text: "Router Components",
          items: [
            {
              text: "BrowserRouter",
              link: "/framework/react/react-router/browser-router",
            },
          ],
        },
        {
          text: "Components",
          items: [
            {
              text: "Routes",
              link: "/framework/react/react-router/routes",
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
  "/framework/nestjs/": [
    {
      text: "NestJS",
      collapsed: false,
      items: [
        { text: "简述", link: "/framework/nestjs/" },
        { text: "依赖注入（IOC）", link: "/framework/nestjs/ioc" },
        { text: "5 种参数传递方式", link: "/framework/nestjs/request-parameters" },
        { text: "provider 依赖注入", link: "/framework/nestjs/provider" },
      ],
    },
  ],
  "/column/javascript/": [
    {
      text: "JavaScript",
      items: [
        { text: "简述", link: "/column/javascript/" },
        { text: "Promise", link: "/column/javascript/promise" },
        { text: "async/await", link: "/column/javascript/async-await" },
      ],
    },
  ],
  "/column/git/": [
    {
      text: "Git",
      items: [
        { text: "简述", link: "/column/git/" },
        { text: ".gitignore", link: "/column/git/gitignore" },
      ],
    },
  ],
  "/column/css/css/": [
    {
      text: "知识点",
      items: [
        { text: "简述", link: "/column/css/css/" },
        {
          text: "Flexbox（弹性盒子）",
          link: "/column/css/css/flex",
        },
        {
          text: "CSS 多列布局",
          link: "/column/css/css/multi-column-layout",
        },
      ],
    },
    {
      text: "案例灵感",
      items: [
        {
          text: "实现水平垂直居中最便捷的方法",
          link: "/column/css/css/demos/1",
        },
        {
          text: "flex 实现三列布局",
          link: "/column/css/css/demos/2",
        },
      ],
    },
  ],
  "/column/css/tailwindcss/": [
    {
      text: "tailwindcss",
      items: [{ text: "简述", link: "/column/css/tailwindcss/" }],
    },
  ],
  "/column/css/unocss/": [
    {
      text: "unocss",
      items: [{ text: "简述", link: "/column/css/unocss/" }],
    },
  ],
  "/note/": [
    {
      text: "小 记",
      collapsed: false,
      items: [
        { text: "简述", link: "/note/" },
        { text: "node 包管理器", link: "/note/package-manager" },
        { text: "vscode debugger 用法", link: "/note/vscode-debugger" },
        { text: "eslint、prettier 用法", link: "/note/eslint-prettier" },
        { text: "tsconfig.json 用法", link: "/note/tsconfig" },
      ],
    },
  ],
} as DefaultTheme.Sidebar;
