# 某红薯 x-s、x-t、x-s-common、x-b3-traceid 参数分析


> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
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
"_ace_d656a值：", _ace_d656a
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

让我们找到第一个`x1`出现的位置，再往上翻日志，有一系列加密，再往上翻，就看到了：`url=/api/sns/web/v1/search/hotlist?source=search_box`

此时，嘴角上扬了。好像知道点什么。估计你们也知道了。

我猜想是：`url=/api/sns/web/v1/search/hotlist?source=search_box` 经过解密后得到 `x1` 的值，也就是：`c6b4760e70bae2a23793c905467dc208`

而且还是得到 32 位的加密字符串，没错，和你想的一样，我也想到了 `Md5` 加密算法，验证一下吧

![vscode-debugger-1](/images/reverse/jsreverse/xhs/18.png)

果然不出所料，就是 `Md5` 加密算法。

至此, `x-s`、`x-t` 加密字符串已经全部还原。


#### x-s-common

全局搜索 `x-s-common`，找打位置后，打上断点，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/19.png)

```js
 var u = e.headers["X-t"] || ""
    , s = e.headers["X-s"] || ""
    , c = e.headers["X-Sign"] || ""
    , l = getSigCount(u && s || c)
    , f = localStorage.getItem(MINI_BROSWER_INFO_KEY)
    , p = localStorage.getItem(RC4_SECRET_VERSION_KEY) || RC4_SECRET_VERSION
    , h = {
    s0: getPlatformCode(o),
    s1: "",
    x0: p,
    x1: version,
    x2: o || "PC",
    x3: "xhs-pc-web",
    x4: "4.21.0",
    x5: js_cookie.A.get(LOCAL_ID_KEY),
    x6: u,
    x7: s,
    x8: f,
    x9: encrypt_mcr(concat_default()(r = concat_default()(n = "".concat(u)).call(n, s)).call(r, f)),
    x10: l
};
e.headers["X-S-Common"] = encrypt_b64Encode(encrypt_encodeUtf8(stringify_default()(h)))
```

主要分析 `h` 的值作为参数，通过 `encrypt_b64Encode` 和 `encrypt_encodeUtf8` 加密即可

那先分析 `h` 参数：

![vscode-debugger-1](/images/reverse/jsreverse/xhs/20.png)

```json
{
    "s0": 5, // 定值
    "s1": "", // 定值
    "x0": "1", // 定值
    "x1": "3.6.8", // 定值
    "x2": "Windows", // 定值
    "x3": "xhs-pc-web", // 定值
    "x4": "4.21.0", // 定值
    "x5": "18ee0b8eaa14szquw6otb9amxbdj35n5nrhcpqi4j50000360507", // a1 的值
    "x6": 1718762991893,  // x-t 的值
    // x-s 的值
    "x7":"XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6ImQ4M2I2NTY0OTY2ZGQzZDdmYzRlNzM0NTA5M2VlM2U1ZWRiZjc0NjcyMDExOTI5OGU0YjBjMzE1Zjg2MTI0ZDFhMTc4NGQ1NGY4MDc1NWY2NzQzODhlNGU5MGRkYTVkYmM5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNTFiYzdiMDlhMTBjNjliZDQzYjgxNTY5ZWQ1ZWRmNjlhYWQ4OGU5MTRiZWY4ZjE3NTVjMzMwYjA2ZGI5YmY3YjAwM2EwZGIxMDhmMTk3OTgyM2I2OGUxNzE5MWRmM2NhZmUzN2YxM2RkZWVjZDJmMTk4YWFkYzBmNmE2MGFjNWVmNjkyODNhZTcwMGYyMWRmOTBkYWMyOTA5NjNlMTRkZWY4YTBlMTEzMjMwYzE3MWQ4NzE4ZGNlOTkwNTkzODkzMSJ9",
    // 浏览器指纹，可以写死
    "x8": "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSBMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR1QL+5Ii6sdnoeSfqYHqwl2qt5B0DoIvMzOZQqZVw7IxOeTqwr4qtiIkrOIi/skccxICLdI3Oe0utl2ADZsLveDSKsSPw5IEvsiutJOqw8BVwfPpdeTDWOIx4VIiu6ZPwbPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTgeAsjutKrZgedWI9gfKeYIHPI3ge0VtZIk3edqtAmzPjNgDHIxOekPtR/WOex0lyIhYsIE8+qoqjICuPqYGnIiciePt5ICZC4BNsDces6uw1IvKef9de00znIiAe1Mi7yuwuIiKeTf0sxz/e1Vt4ZdvsdutWIxiem9AsdqtEssKsWVw8IxI2I383sqwZgVtQa7zLwLOsD0OexutmIk6eYa/sxpI1IkosWL6sxfhuIk7e6utdIkqIQqwHtPtAI33e1qtWIkNs1VwDIEKsfqtltqwseqwlIvqAIxDc8nqiKWJeiqtIIEq8Ii7eSPw4bzmynjOsWUmdIiPyqPttZPwlIvAexVtjODAeVY5sVLzLIE0s6edsiqt8cPwrICJsWutfIEvsTgDPIkvs173sSPwXIC5e3PwDt9YaIhQgIvNs1p6e6gve0MgsdVtmIiPRI3SEoPtLIC8EIh6skbF3+A/eWutbIE82eut12zAsYzgeWPwboPwGIvZ4ICVyoI==",
    "x9": -1854331133,
    // 请求次数，可以写死
    "x10": 22
}
```
经过分析，`h` 的组成主要看 `x9`，也就是：`encrypt_mcr(concat_default()(r = concat_default()(n = "".concat(u)).call(n, s)).call(r, f))`

![vscode-debugger-1](/images/reverse/jsreverse/xhs/21.png)


很明显，`concat_default()()`的作用就是，将两个字符串相加操作，也就是合并字符串。

那找到 `encrypt_mcr` 加密函数位置，扣出代码。啥？你说你不会扣代码，那不赶紧加入 [小鱼成神之路](https://t.zsxq.com/gkn0r)，一起交流学习。

```js
var encrypt_mcr = function(t) {
    var e = 67
        , r = 15
        , n = 164
        , o = 126
        , i = 137
        , a = 39
        , u = 176
        , s = 72
        , c = 56
        , l = 21
        , f = 35
        , p = 34
        , h = 35
        , d = 18
        , v = 25
        , g = 185
        , m = 1149
        , y = 744
        , w = 1295
        , b = 1248
        , _ = 1310
        , E = 1096
        , x = 1166
        , k = 1095
        , T = 1196
        , S = 1180
        , A = 1039
        , L = 976
        , R = 1347
        , I = 1117
        , O = 1168
        , C = 1233
        , N = 1157
        , P = 1006
        , B = 1122
        , M = 1277
        , j = 1288
        , F = 1271
        , D = 986
        , q = 162
        , U = {};
    function G(t, e) {
        return a0_0x10f4ac(e, t - q)
    }
    U[G(-73, -66)] = function(t, e) {
        return t === e
    }
    ,
    U[G(e, 186)] = function(t, e) {
        return t < e
    }
    ,
    U[G(-r, -n)] = function(t, e) {
        return t ^ e
    }
    ,
    U[G(r, -o)] = function(t, e) {
        return t & e
    }
    ,
    U[G(-i, -a)] = function(t, e) {
        return t < e
    }
    ,
    U[G(-175, -u)] = function(t, e) {
        return t ^ e
    }
    ,
    U[G(-59, s)] = function(t, e) {
        return t ^ e
    }
    ,
    U[G(-c, -l)] = function(t, e) {
        return t >>> e
    }
    ,
    U[G(f, p)] = function(t, e) {
        return t >>> e
    }
    ;
    for (var H, V, W = U, X = 3988292384, z = 256, Y = []; z--; Y[z] = W[G(h, -66)](H, 0))
        for (V = 8,
        H = z; V--; )
            H = W[G(r, d)](H, 1) ? W[G(35, v)](H, 1) ^ X : W[G(h, g)](H, 1);
    return function(t) {
        function e(t, e) {
            return G(e - 1181, t)
        }
        if (W[e(m, 1108)]((0,
        esm_typeof.A)(t), e(y, 914))) {
            for (var r = 0, n = -1; W[e(w, b)](r, t[e(_, 1233)]); ++r)
                n = W[e(E, x)](Y[W[e(k, T)](n, 255) ^ t[e(S, A) + e(1022, L)](r)], n >>> 8);
            return W[e(R, 1166)](n, -1) ^ X
        }
        for (r = 0,
        n = -1; W[e(I, 1044)](r, t[e(O, C)]); ++r)
            n = W[e(N, P)](Y[W[e(1229, B)](W[e(M, T)](n, 255), t[r])], W[e(j, 1125)](n, 8));
        return W[e(F, B)](W[e(D, 1122)](n, -1), X)
    }
}();
```

到这里，`h` 就分析完了。

一鼓作气，分析 `encrypt_b64Encode(encrypt_encodeUtf8(stringify_default()(h)))` 吧

![vscode-debugger-1](/images/reverse/jsreverse/xhs/22.png)

`stringify_default()` 的作用很明显了，就是 `JSON.stringify` 对象转字符串了。

然后，又是扣 `encrypt_encodeUtf8` 代码了：

```js
function encrypt_encodeUtf8(t) {
    var e = 185
        , r = 410
        , n = 480
        , o = 222
        , i = 194
        , a = 165
        , u = 147
        , s = 290
        , c = 460
        , l = 472
        , f = 497
        , p = 462
        , h = 286
        , d = 209
        , v = 223
        , g = 590
        , m = {
        bIGxm: function(t, e) {
            return t(e)
        },
        MahgM: function(t, e) {
            return t < e
        },
        czxKn: function(t, e) {
            return t === e
        },
        clYIu: function(t, e) {
            return t + e
        }
    }
        , y = m[b(477, 488)](encodeURIComponent, t)
        , w = [];
    function b(t, e) {
        return a0_0x10f4ac(t, e - g)
    }
    for (var _ = 0; m[b(333, e)](_, y[b(r, n)]); _++) {
        var E = y[b(o, 290)](_);
        if (m[b(i, a)](E, "%")) {
            var x = y[b(u, s)](m[b(574, 472)](_, 1)) + y[b(c, 290)](m[b(605, l)](_, 2))
                , k = parse_int_default()(x, 16);
            w[b(592, f)](k),
            _ += 2
        } else
            w[b(p, f)](E[b(217, h) + b(d, v)](0))
    }
    return w
}
```

再扣代码，`encrypt_b64Encode` 代码如下：

```js
function encrypt_b64Encode(t) {
    var e = 664
        , r = 634
        , n = 448
        , o = 599
        , i = 315
        , a = 416
        , u = 512
        , s = 361
        , c = 406
        , l = 487
        , f = 496
        , p = 333
        , h = 630
        , d = 639
        , v = 548
        , g = 582
        , m = 447
        , y = 468
        , w = 375
        , b = 331
        , _ = 149
        , E = 382
        , x = 265
        , k = 625
        , T = 570
        , S = 551
        , A = 582
        , L = 581
        , R = 638
        , I = 618
        , O = 606
        , C = 429
        , N = 651
        , P = 667
        , B = 817
        , M = 333
        , j = 567
        , F = 747
        , D = 561
        , q = 570
        , U = 676
        , G = 840
        , H = 240
        , V = {
        udFrB: function(t, e) {
            return t % e
        },
        cCZFe: function(t, e) {
            return t === e
        },
        jevwl: function(t, e) {
            return t - e
        },
        aqlTy: function(t, e) {
            return t + e
        },
        rceYY: function(t, e) {
            return t >> e
        },
        OwjMq: function(t, e) {
            return t & e
        },
        kSGXO: function(t, e) {
            return t << e
        },
        veNiI: function(t, e) {
            return t === e
        },
        QLthP: function(t, e) {
            return t + e
        },
        wDtJz: function(t, e) {
            return t + e
        },
        nYqUQ: function(t, e) {
            return t & e
        },
        TCArD: function(t, e) {
            return t << e
        },
        RHteb: function(t, e) {
            return t - e
        },
        mZPJZ: function(t, e) {
            return t < e
        },
        zDETq: function(t, e, r, n) {
            return t(e, r, n)
        },
        YlZGp: function(t, e) {
            return t > e
        }
    };
    function W(t, e) {
        return a0_0x10f4ac(e, t - -H)
    }
    for (var X = (W(-413, -442) + W(-e, -r) + "7")[W(-n, -o)]("|"), z = 0; ; ) {
        switch (X[z++]) {
        case "0":
            var Y;
            continue;
        case "1":
            var K = [];
            continue;
        case "2":
            var J = V[W(-i, -a)]($, 3);
            continue;
        case "3":
            var $ = t[W(-350, -u)];
            continue;
        case "4":
            V[W(-s, -c)](J, 1) ? (Y = t[V[W(-l, -f)]($, 1)],
            K[W(-p, -346)](V[W(-h, -d)](encrypt_lookup[V[W(-503, -v)](Y, 2)] + encrypt_lookup[V[W(-g, -741)](V[W(-331, -m)](Y, 4), 63)], "=="))) : V[W(-y, -w)](J, 2) && (Y = V[W(-b, -_)](t[$ - 2], 8) + t[V[W(-l, -E)]($, 1)],
            K[W(-333, -x)](V[W(-k, -505)](V[W(-T, -S)](encrypt_lookup[Y >> 10], encrypt_lookup[V[W(-A, -L)](Y >> 4, 63)]) + encrypt_lookup[V[W(-R, -I)](V[W(-O, -C)](Y, 2), 63)], "=")));
            continue;
        case "5":
            var Q = 16383;
            continue;
        case "6":
            for (var Z = 0, tt = V[W(-509, -N)]($, J); V[W(-P, -B)](Z, tt); Z += Q)
                K[W(-M, -153)](V[W(-j, -F)](encrypt_encodeChunk, t, Z, V[W(-D, -413)](Z + Q, tt) ? tt : V[W(-q, -501)](Z, Q)));
            continue;
        case "7":
            return K[W(-U, -G)]("")
        }
        break
    }
}
```

没啥难度，又搞定了。

### 参数验证

整理加密参数代码后，再写个小例子，验证一下吧！

![vscode-debugger-1](/images/reverse/jsreverse/xhs/23.png)

正常返回的结果，说明我们分析对了。晚上吃面给自己奖励一个荷包蛋吧！！
