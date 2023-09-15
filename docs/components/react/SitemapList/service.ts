import request from "@/utils/request";

const prefex = "/api";

/**
 * 获取所有的sitemap url列表
 * @returns
 */
export async function querySitemapUrlList() {
  return request(`${prefex}/sitemap.json`);
}

/**
 * bing批量提交
 * @returns
 */
export async function queryBingBatchCommit(data: {
  host: string;
  key: string;
  keyLocation: string;
  urlList: React.Key[];
}) {
  return request(`/indexnow`, {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

/**
 * 百度批量提交
 * @returns
 */
export async function queryBaiduBatchCommit(data: string) {
  return request(
    `/urls?site=https://www.skillgroup.cn&token=JPvezcuHh7M2JrGC`,
    {
      method: "POST",
      data,
      headers: {
        "Content-Type": " text/plain",
      },
      withCredentials: true,
    }
  );
}
