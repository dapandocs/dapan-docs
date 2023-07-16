import type { TransformContext, SiteConfig } from "vitepress";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import dayjs from "dayjs";

export const links: {
  url: string;
  lastmod: number | undefined;
  sitemapTime: string | undefined;
}[] = [];
export const hostname = "https://www.skillgroup.cn/";

export const generateSitemapJsonUrlLinks = (siteConfig: SiteConfig) => {
  const writeStream = createWriteStream(
    resolve(siteConfig.outDir, "sitemap.json")
  );
  const filteredLinks = links.filter((link) => link.url !== "index.html");
  writeStream.write(JSON.stringify(filteredLinks));
  writeStream.end();
  writeStream.on("finish", () => {
    console.log("today-sitemap.json generate finished.");
  });
};

export const generateTodaySitemapTxtUrlLinks = (siteConfig: SiteConfig) => {
  const writeStream = createWriteStream(
    resolve(siteConfig.outDir, "today-sitemap.txt")
  );
  for (let [index, link] of links.entries()) {
    const { sitemapTime, url } = link;
    if (
      sitemapTime &&
      dayjs(sitemapTime).isValid() &&
      dayjs(sitemapTime).isSame(dayjs(), "day")
    ) {
      if (index === links.length - 1) {
        // 最后一次遍历
        writeStream.end(`${hostname}${url}`);
      } else {
        writeStream.write(`${hostname}${url}\n`);
      }
    }
  }
  writeStream.on("finish", () => {
    console.log("today-sitemap.txt generate finished.");
  });
};

/**
 * 获取站点所有url
 * @param id
 * @param param1
 * @returns
 */
export const getSiteUrlLinks = (id: string, { pageData }: TransformContext) => {
  const { frontmatter, relativePath, lastUpdated } = pageData;
  if (!/[\\/]404\.html$/.test(id)) {
    const url = relativePath
      .replace(/\/index\.md$/, "/index.html")
      .replace(/\.md$/, ".html");
    if (!url.includes("system")) {
      links.push({
        url,
        lastmod: lastUpdated,
        sitemapTime: frontmatter.sitemapTime,
      });
    }
  }

  return links;
};

/**
 * 生成sitemap
 * @param param0
 */
export const generateSiteMap = async ({ outDir }: SiteConfig) => {
  const sitemap = new SitemapStream({
    hostname,
  });
  const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
  sitemap.pipe(writeStream);
  links
    .filter((item) => item.url !== "index.html")
    .map((item) => ({ url: item.url, lastmod: item.lastmod }))
    .forEach((link) => sitemap.write(link));
  sitemap.end();
  await new Promise((r) => writeStream.on("finish", r));
};
