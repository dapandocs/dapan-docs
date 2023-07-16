import request from "@docs/utils/request";

const prefex = "/api";

/**
 * 获取所有的sitemap url列表
 * @returns
 */
export async function querySitemapUrlList() {
  return request(`${prefex}/sitemap.json`);
}
