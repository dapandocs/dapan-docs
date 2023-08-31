---
sitemapTime: 2023/07/14
---

# 为什么选择使用 UnoCSS？

![UnoCSS 官网](/images/unocss/1.png)

今天我要和你分享的是一个我最近发现的神奇工具——UnoCSS。这是一个高性能且极具灵活性的即时原子化 CSS 引擎。你可能会问，为什么我要选择使用 UnoCSS 呢？接下来，我将从几个方面为你解答这个问题。

首先，让我们来了解一下什么是原子化 CSS。原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。这种方式的优点是可以避免样式冲突，提高样式复用性，而且不用再为类名烦恼。UnoCSS 正是这种原子化 CSS 的优秀实践。

那么，为什么选择 UnoCSS 呢？我认为有以下几个原因：

- 极致性能：UnoCSS 跳过解析，不使用 AST，直接通过高效的字符串拼接来生成对应的 CSS，同时对类名和生成的 CSS 字符串进行了缓存，当再次遇到相同的实用工具类时，它可以绕过整个匹配和生成的过程。据说，UnoCSS 的性能是其他同类产品的 5 倍，甚至在某些情况下，可以达到 200 倍。

- 完全可定制：UnoCSS 不是一个框架，而是一个引擎。它没有提供任何的核心工具类，所有功能都可以通过预设和内联配置来提供。这意味着你可以根据自己的需求，定制出属于自己的 CSS 框架。

- 属性化模式：UnoCSS 继承了 Windi CSS 的属性化特点，可以让你在 HTML 标签中直接写样式，无需再写一大堆的 class。

- 纯 CSS 图标：UnoCSS 提供了上万个纯 CSS 图标，你可以在 UnoCSS 中轻松集成，无需再为找图标而烦恼。

- CDN 支持：UnoCSS 提供了 CDN 版本，你可以在前端的入口 index.html 文件中添加一行代码就可以支持，非常方便。

- VS Code 插件：UnoCSS 还提供了 VS Code 插件，可以让你在编写代码的时候，更加方便快捷。

总的来说，UnoCSS 是一个高性能、灵活、易用的 CSS 引擎，无论你是前端新手，还是资深开发者，都可以通过 UnoCSS 提高你的开发效率，提升你的开发体验。所以，我强烈推荐你选择使用 UnoCSS。

最后，我想说，选择 UnoCSS，就是选择了高效、灵活和快乐的开发方式。我相信，一旦你开始使用 UnoCSS，你就会爱上它。那么，你还在等什么呢？快来试试 UnoCSS 吧！

### 文档地址

- 中文：[UnoCSS 中文文档](https://alfred-skyblue.github.io/unocss-docs-cn/)
- 英文：[UnoCSS 英文文档](https://unocss.dev/)

### 同类产品

- [Tailwind CSS](https://tailwindcss.com/)
- [Windi CSS](https://windicss.org/)

### 插件地址

[UnoCSS VS Code 插件](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)
