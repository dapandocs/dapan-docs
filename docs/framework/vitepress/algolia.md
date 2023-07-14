---
sitemapTime: 2023/07/14
---

# VitePress 如何开启 algolia 搜索功能

## 什么是 Algolia

Algolia 是一种强大的搜索引擎，可以为你的 VitePress 网站提供搜索功能。

## Algolia 注册

首先，你需要申请一个 Algolia 账号。你可以在 [Algolia DocSearch 官网](https://docsearch.algolia.com/apply/) 申请一个免费账号。

::: warning 注意事项

- 您必须是该网站的所有者，或至少有更新其内容的权限
- 你的网站必须是公开的
- 你的网站必须是一个开源项目或技术博客的技术文档，不授权于商业内容
- 你的网站必须到生产环境

:::

注册成功后，你会收到一封邮件，里面包含了你的 Algolia API Key 和 Application ID。如下界面：

![](/images/vitepress/algolia-1.png)

根据邮箱提示操作后，你会看到如下界面：

![](/images/vitepress/algolia-2.png)

点击 “API Keys”, 获取你的 Algolia API Key 和 Application ID。如下界面：

![](/images/vitepress/algolia-3.png)

## Algolia 配置

```js
// .vitepress/config.js
import { defineConfig } from "vite";

export default defineConfig({
  themeConfig: {
    search: {
      // provider: 'local', // 可以开启本地搜索
      provider: "algolia",
      options: {
        appId: "你的appId",
        apiKey: "你的apiKey",
        indexName: "你的indexName",
        placeholder: "请输入关键词",
        translations: {
          button: {
            buttonText: "请输入关键词",
          },
        },
      },
    },
  },
});
```

配置完成后，你就可以在你的 VitePress 网站上使用 Algolia 搜索功能了。

## 可能遇到的问题

### 1. 搜索结果为空

![](/images/vitepress/algolia-4.png)

先检查 Algolia 后台是否已经爬取了数据，如果没有爬取数据，你可以手动触发爬取数据。 [Algolia Crawler 控制台](https://crawler.algolia.com/admin)，如下图：

![](/images/vitepress/algolia-5.png)

如果爬取数据后，Algolia 后台有数据，但是在 VitePress 却仍然搜索不到任何数据。

检查是否配置了

```js
// .vitepress/config.js
lang: "zh-CN",
```

    或者

```js
// .vitepress/config.js
locales: {
    root: { label: "简体中文", lang: "zh-CN" },
},
```

从 VitePress 源码中[VPAlgoliaSearchBox](https://github.com/vuejs/vitepress/blob/1ef33fe1c44875dc86835a698a708b1aa847e16e/src/client/theme-default/components/VPAlgoliaSearchBox.vue#L26)得知，如果配置了语言，那么 Algolia 搜索的时候会带上语言参数，如果 Algolia 后台没有对应语言的数据，那么就会搜索不到数据。

```js
searchParameters: {
    facetFilters: ["lang:en-US"],
},
```

即使手动配置了上述参数，也会搜索不到数据。原因如下：

![](/images/vitepress/algolia-6.png)

Algolia 后台的数据是以 `lang:en-US` 的形式存储的，而 VitePress 搜索的时候是以 `lang:zh-CN` 的形式搜索的，所以 Algolia 后台没有对应的数据，所以搜索不到数据。

**解决办法：**

更改 Algolia 后台爬取数据规则， `lang:en-US` 改为 `lang:zh-CN`。在[Algolia Crawler 控制台](https://crawler.algolia.com/admin)，点击“Editor”，调整代码，如下图：

![](/images/vitepress/algolia-7.png)

```js
const records = helpers.docsearch({
  recordProps: {
    lvl1: ["header h1", "article h1", "main h1", "h1", "head > title"],
    content: ["article p, article li", "main p, main li", "p, li"],
    lvl0: {
      selectors: "",
      defaultValue: "Documentation",
    },
    lvl2: ["article h2", "main h2", "h2"],
    lvl3: ["article h3", "main h3", "h3"],
    lvl4: ["article h4", "main h4", "h4"],
    lvl5: ["article h5", "main h5", "h5"],
    lvl6: ["article h6", "main h6", "h6"],
  },
  aggregateContent: true,
  recordVersion: "v3",
});
// add lang field
records.forEach((record) => {
  record.lang = "zh-CN";
});
return records;
```

将 recordExtractor 内容替换上述代码块即可,lang 便可设置为 `zh-CN`。

