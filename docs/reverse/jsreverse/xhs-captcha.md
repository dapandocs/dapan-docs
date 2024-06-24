# xhs 旋转验证码剖析和协议算法实现


> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等


> 本文章中所有内容仅供学习交流使用，不用于其他任何目的，不提供完整代码，抓包内容、敏感网址、数据接口等均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者立即删除！

### 前言

作为小红书的忠实粉，即使没有几个粉丝，也不知不觉用了好几年了。最近发现老是出现旋转二维码验证，令我十分不爽，于是就想着研究一下这个验证码的实现原理。

### 请求分析

当旋转验证码页面加载完成后，请求分析时，发现 `/api/redcaptcha/v2/captcha/register` 这个网络请求，从字面意思上看，应该是它了。

打开其响应信息发现，并没有验证码的图片信息。而是有个 `captchaInfo` 加密字符串。我们猜测，这个字符串应该就是验证码的图片信息。

![vscode-debugger-1](/images/captcha/xhs/1.png)

老套路，全局搜索 `captchaInfo` 关键字，发现并没有这个字段。此时，心里大概有数了，要么这个字段被加密了，要么这个字段被混淆了。

换个思路，我们可以从这个请求的堆栈中找线索。如图：

![vscode-debugger-1](/images/captcha/xhs/2.png)

点击第一个进去，打上断点后，如图：

![vscode-debugger-1](/images/captcha/xhs/3.png)

此时发现了，请求响应的内容，继续沿着堆栈分析，发现它跳转到了 `main.6fb1333.js` 中

![vscode-debugger-1](/images/captcha/xhs/4.png)

读过我之前发布的 [x-s、x-t、x-s-common、x-b3-traceid 参数分析](https://blog.csdn.net/studypy1024/article/details/139812528) 这篇博客的小伙伴应该知道，这个就是 `JSVMP` 加密。

既然是熟悉的味道，那还用熟悉的配方去分析 -- `插桩法`。

