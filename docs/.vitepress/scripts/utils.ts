import { resolve } from "node:path";
import { createWriteStream } from "node:fs";

/**
 * 字符替换
 * @param code
 * @param replaceStr
 * @param key
 * @param position
 * @returns
 */
export function replacer(
  code: string,
  replaceStr: string,
  key: string,
  position: "top" | "bottom"
) {
  const START = `<!--${key}_START-->`;
  const END = `<!--${key}_END-->`;
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, "im");

  const target = replaceStr
    ? `${START}\n${replaceStr}\n${END}`
    : `${START}${END}`;

  if (!code.match(regex)) {
    if (position === "top") return `${target}\n\n${code}`;
    else return `${code}\n\n${target}`;
  }

  return code.replace(regex, target);
}

/**
 * 获取SSR组件
 * @param components
 * @returns
 */
export function getNoSSRComponents(components: string[]) {
  return components.reduce((pre: string, component: string) => {
    return pre + `<ClientOnly><${component}/></ClientOnly>\n`;
  }, "");
}

/**
 * 生成txt文本
 * @param siteConfig
 */
export const generateTxt = (content: any, fileName: string) => {
  const writeStream = createWriteStream(resolve(__dirname, `../../../dist/${fileName}.txt`));
  writeStream.write(content);
  writeStream.end();
  writeStream.on("finish", () => {
    console.log(`${fileName}.txt generate finished.`);
  });
};
