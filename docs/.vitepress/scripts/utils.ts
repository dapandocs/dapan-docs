
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
