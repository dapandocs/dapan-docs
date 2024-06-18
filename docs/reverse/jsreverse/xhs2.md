# 某书 x-s、x-t、x-s-common、x-b3-traceid 逆向分析


> 【作者主页】：[小鱼神](https://img-blog.csdnimg.cn/2021062911555986.png)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等
>
> 【学习交流】：知识星球：[小鱼成神之路](https://t.zsxq.com/gkn0r)；vx：`studypy1024`


> 本文章中所有内容仅供学习交流使用，不用于其他任何目的，不提供完整代码，抓包内容、敏感网址、数据接口等均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者立即删除！

### 前置分析

我们在请求header中发现，有很多请求都带有`x-s`、`x-t`、`x-s-common`、`x-b3-traceid`这四个参数的值是动态变化的，所以我们猜测这四个参数应该是加密参数。

![vscode-debugger-1](/images/reverse/jsreverse/xhs/1.png)



### 逆向分析

#### x-b3-traceid

全局搜索 `x-b3-traceid`，找到位置后打上断点

![vscode-debugger-1](/images/reverse/jsreverse/xhs/2.png)

可以发现 `x-b3-traceid` 是 `rt()` 生成的，找到其位置如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/3.png)

那第一个加密参数就搞定了！

```js
function rt() {
    for (var t = "", e = 0; e < 16; e++)
        t += "abcdef0123456789".charAt(Math.floor(16 * Math.random()));
    return t
}
```

#### x-s、x-t

全局搜索 `x-s`，找到位置后打上断点

![vscode-debugger-1](/images/reverse/jsreverse/xhs/4.png)

发现 `x-s`、`x-t` 是 `window._webmsxyw()` 生成的。

那问题来了，`window._webmsxyw()` 又是从哪里来的呢？

当从 `window._webmsxyw()` 跳转到其位置后，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/5.png)

经过分析后，`window._webmsxyw()` 是通过 `JSVMP` 加密得到的。

处理 `JSVMP` 加密一般有三种解决方案：
- 插桩法还原
- AST还原
- 补环境

其中补环境方案是最简单的方法，但是补环境的缺点是：网站可能不定期加环境检测点，导致算法不能用。所以我们这里采取插桩法还原。

插桩法很考验技巧性的。

首先我们分析文件，观察 `指令集` 并选择插桩位置

日志点1如下：

```js
// 打印全部日志点
"函数：", _ace_8712, "调用者：", _ace_25a6._ace_936, "函数形参：", _ace_bdcc
```
![vscode-debugger-1](/images/reverse/jsreverse/xhs/6.png)


日志点2如下：

```js
// 打印全部日志点
"_ace_d656a值：", _ace_d656a, "_ace_7e97a值：", _ace_7e97a, "_ace_5ed3b值：", _ace_5ed3b, "_ace_0a916值：", _ace_0a916

// 打印部分日志点，方便分析
_ace_d656a &&
   (
    (typeof _ace_d656a === "string" && !["charAt", "charCodeAt", "length", "random", "Math", "ceil ", "fromCharCode", "match", "shouldJoker"].some(i=>i.includes(_ace_d656a))) ||
    (typeof _ace_d656a === "object")
   ) &&
   console.log("_ace_d656a值：", _ace_d656a), 0
```
![vscode-debugger-1](/images/reverse/jsreverse/xhs/7.png)

插桩技巧：
- 从入参开始分析
- 从返回值开始分析

这两种技巧要结合使用，效果才能最佳。

![vscode-debugger-1](/images/reverse/jsreverse/xhs/8.png)

以这个为例:
入参是: `/api/sns/web/v1/search/hotlist?source=search_box`
返回值如下图：
![vscode-debugger-1](/images/reverse/jsreverse/xhs/9.png)

此时找到第一个生成返回值的位置，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/10.png)

经分析，加密字符串种，只有`payload`是动态参数。那现在的任务，就是找到`payload`的加密算法和被加密字符串。


继续找 `payload` 的第一个生成位置，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/11.png)

当我们找到第一个生成 `payload` 的位置后，惊喜的发现 `encrypt` 加密关键字。那问题来了，标准算法中，哪个加密算法有它呢？

你猜对了，和我想的一样，就是对称加密算法中的 `AES` 或者 `DES`。

这也是只是盲猜啊。那继续验证猜想。

继续向上分析日志，发现有好多数组，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/12.png)

因为这一串数组，在加密和解密之前，这有理由让我相信它是加密算法的一部分，虽然看不懂，但是可以去搜索啊。

![vscode-debugger-1](/images/reverse/jsreverse/xhs/13.png)

此时，我们再也压不住心中的喜悦了。果然是 `DES` 加密算法。

![vscode-debugger-1](/images/reverse/jsreverse/xhs/14.png)

继续往上翻日志，发现它的加密字符串了。

![vscode-debugger-1](/images/reverse/jsreverse/xhs/15.png)

经过解密后，我们发现，加密字符串是：

```js
"x1=c6b4760e70bae2a23793c905467dc208;x2=0|0|0|1|0|0|1|0|0|0|1|0|0|0|0;x3=18ee0b8eaa14szquw6otb9amxbdj35n5nrhcpqi4j50000360507;x4=1718705093623;"
```

此时，真相就离我们原来越近了。

- `x1` 不确定，不过长度固定位32位
- `x2` 固定
- `x3` a1
- `x4` 时间戳


此时，此时工作中心已经非常明确了，就是 `x1`。

继续往上翻日志也行。不过，学习技术嘛，就要学会从多个角度分析。

还记得前面说的，插桩的技巧吗？

此时，我们从入参开始分析。入参为：`/api/sns/web/v1/search/hotlist?source=search_box`

找到入参最后出现的地方，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/16.png)

此时得到：`url=/api/sns/web/v1/search/hotlist?source=search_box`


![vscode-debugger-1](/images/reverse/jsreverse/xhs/17.png)

让我们找到第一个`x1`出现的位置时，再往上翻日志，有一系列加密，再往上翻，就看到了：`url=/api/sns/web/v1/search/hotlist?source=search_box`

此时，嘴角上扬了。好像知道点什么。估计你们也知道了。

我猜想是：`url=/api/sns/web/v1/search/hotlist?source=search_box` 经过解密后得到 `x1` 的值，也就是：`c6b4760e70bae2a23793c905467dc208`

而且还是得到 32 位的加密字符串，没错，和你想的一样，我也想到了 `Md5` 加密算法，验证一下吧

![vscode-debugger-1](/images/reverse/jsreverse/xhs/18.png)

果然不出所料，就是 `Md5` 加密算法。

至此, `x-s`、`x-t` 加密字符串已经全部还原。















