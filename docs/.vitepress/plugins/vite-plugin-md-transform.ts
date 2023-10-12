import type { Plugin } from "vite";
import {
  replacer,
  getNoSSRComponents,
  generateTxt,
  convertMdImageToAImage,
  getReadFileSync,
} from "../scripts/utils";

/**
 * 供博客直达小助手使用
 * @param code
 * @param id
 */
const generateCurrentMarkdown = (code: string, id: string) => {
  code = code.replace(
    /\((\/[^)]+\.(png|svg|jpg))\)/g,
    "(https://skillgroup.cn$1)"
  );

  // 匹配一级标题
  const headingMatch = code.match(/^#\s(.+)/);
  const heading = headingMatch ? headingMatch[1] : "";

  // 匹配路径地址
  const pathMatch = id.match(/\/docs(.*?)\.md/);
  const path = pathMatch ? `https://skillgroup.cn${pathMatch[1]}.html` : "";

  code = code.replace(
    heading,
    `${heading}\n\n- [原文地址--全栈小册](${path})：${path}`
  );

  generateTxt(code, "markdown");
};

async function getMarkdownComponents() {
  const footer = `## 贡献者\n${getNoSSRComponents([
    "Contributors",
    "CopyRight",
    "Gitalk",
  ])}`;
  return {
    footer,
  };
}

function vitePluginMdTransform(): Plugin {
  return {
    name: "vite-plugin-md-transform",
    // 'pre', 'post', 和默认值；'pre' 会在其他插件转换之前执行，'post' 会在其他插件转换之后执行，只影响 transform 和 load 钩子的执行顺序
    enforce: "pre",
    async transform(code, id) {
      // 筛选出当前预览的 md 文件
      if (!id.match(/\.md\b/)) return null;
      const [_name, i] = id.split("/").slice(-2);

      // 排除 docs/index.md 文件
      if (_name === "docs" && i === "index.md") return code;

      // 排除 system 目录下的所有文件
      if (_name === "system") return code;

      // if (process.env.NODE_ENV === "development") {
      //   code = getReadFileSync(code);
      //   generateCurrentMarkdown(code, id);
      // }

      // 将 md 文件中的图片转换为 Image 组件
      code = convertMdImageToAImage(code);

      const { footer } = await getMarkdownComponents();
      // 追加 Footer 组件
      code = replacer(code, footer, "Footer", "bottom");
      return code;
    },
  };
}

export default vitePluginMdTransform;
