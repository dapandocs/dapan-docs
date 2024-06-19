# 某红薯扫码登录分析与协议

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等
>
> 【学习交流】：知识星球：[小鱼成神之路](https://t.zsxq.com/gkn0r)；vx：`studypy1024`


> 本文章中所有内容仅供学习交流使用，不用于其他任何目的，不提供完整代码，抓包内容、敏感网址、数据接口等均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者立即删除！

### 前言

星球里的伙伴有问到了关于某红薯扫码登录的问题。刚好我也一直想写一篇关于扫码登录的文章，择日不如撞日，今天就写一篇吧！

### 前置分析

进入登录界面后，会出现登录的二维码。那这个二维码是什么呢？

当然了，第一次的时候我也不知道，不过没关系。学习嘛，都有一个探索的过程。

首先，我们将二维码截图保存，并有在线解析二维码，如下：

![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/1.png)

可以发现，二维码其实就是一个url链接。接下来的问题就是，它从哪里来？

分析后得到，它是从 `/api/sns/web/v1/login/qrcode/create` 接口中返回的。

![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/2.png)

二维码生成后，它是如何检测用户是否已经扫码了呢？

打开控制台之后，发现每隔1s，就会发送一个请求到 `/api/sns/web/v1/login/qrcode/status` 接口中。

![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/3.png)

其中的 `code_status`，从字面意思就能看出来，它是二维码的状态。

经过扫码测试得出一下结果：

- 二维码状态码为 `0` 时，表示二维码未扫码。
- 二维码状态码为 `1` 时，表示二维码已扫描，但未授权。
- 二维码状态码为 `2` 时，表示二维码已扫描，且已授权。
- 二维码状态码为 `3` 时，表示二维码已过期。

其实也挺简单的。

### 如何实现

既然知道了原理，那我们就可以开始实现了。

首先，我们使用 `FastAPI` 框架搭建一个 `API` 服务，并使用 `uvicorn` 启动。

在写接口之前，我们要先了解 `x-s`、`x-t`、`x-s-common` 参数是如何生成的。不懂的伙伴，我前面的文章有详细介绍过，自行查阅。

#### 后端服务

第一个接口，就是生成二维码的接口。

```python
@app.get('/qr_generate', tags=["生成登录二维码"])
async def generate_qr():
    data = {
        'qr_type': 1
    }
    response = session.post(
        url=f"{qr_create_api}",
        data=json.dumps(data, separators=(",", ":"), ensure_ascii=False).encode('utf-8'),
        headers=headers,
    )
    if response.status_code == 200:
        qr_data = response.json()
        logger.success("二维码已生成")
        return JSONResponse(content=qr_data)
    else:
        raise HTTPException(status_code=500, detail="创建二维码失败")
```

第二个接口，检测二维码状态的接口。


```python
@app.get('/qr_status')
async def qr_status(request: Request):
    params = request.query_params
    qr_id = params.get("qr_id")
    code = params.get("code")
    if not qr_id or not code:
        raise HTTPException(status_code=400, detail="缺少qr_id或code参数")

    params_encode = urllib.parse.urlencode({"qr_id": qr_id, "code": code })
    response = session.get(
        url=f"{qr_status_api}?{params_encode}",
        headers=headers,
    )
    if response.status_code == 200:
        qr_status_json = response.json()
        if qr_status_json["code"] == 0 and qr_status_json["data"]["code_status"] == 2:
            # 登录成功获取ck
            all_cookies = {**initial_cookies, **{c.name: c.value for c in response.cookies}}
            logger.success(all_cookies)
            content = {
                    "msg": "登录成功",
                    "cookies": all_cookies,
                    "code": 0,
                    "data": qr_status_json["data"]
            }
            return JSONResponse(content=content)
        else:
            return JSONResponse(content=qr_status_json)
    else:
        raise HTTPException(status_code=500, detail="获取二维码状态失败")
```

#### 前端服务

我们用 `React` 框架搭建一个前端页面，用于展示二维码，并实现扫码登录的功能。

界面如下:
![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/4.png)

点击 `刷新二维码` 按钮可以重新生成二维码。

扫码登录成功后，后端服务和前端服务均可以拿到 `ck`。

![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/6.png)


### 功能验证

这里就不过多文字描述了。直接看动图

![vscode-debugger-1](/images/reverse/jsreverse/xhs-scan-login/5.gif)

这样就可以直接部署到服务器上，实现扫码登录了。