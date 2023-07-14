import type { TransformContext, SiteConfig } from "vitepress";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";

export const links: { url: string; lastmod: number | undefined }[] = [];

/**
 * 获取站点所有url
 * @param id 
 * @param param1 
 * @returns 
 */
export const getSiteUrlLinks = (id: string, { pageData }: TransformContext) => {
  if (!/[\\/]404\.html$/.test(id)) {
    links.push({
      url: pageData.relativePath
        .replace(/\/index\.md$/, "/index.html")
        .replace(/\.md$/, ".html"),
      lastmod: pageData.lastUpdated,
    });
  }
  return links;
};

/**
 * 生成sitemap
 * @param param0 
 */
export const generateSiteMap = async ({ outDir }: SiteConfig) => {
  const sitemap = new SitemapStream({
    hostname: "https://www.skillgroup.cn/",
  });
  const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
  sitemap.pipe(writeStream);
  links.forEach((link) => sitemap.write(link));
  sitemap.end();
  await new Promise((r) => writeStream.on("finish", r));
};
