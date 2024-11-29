# 浏览器崩溃克星：终极逆向日志框架，让崩溃成为历史！

## 前言

首先问小伙伴一个问题，你们在插桩逆向日志工程中，有没有遇到过以下问题？

- 1、日志过多时，搜索关键词卡顿，甚至浏览器崩溃
- 2、碰到 `window` 等循环引用对象，导致分析困难
- 3、每次需要手动处理数据类型，如 `object`、`function`、`window` 等
- 3、如果一次日志分析不成功，下次还需要重新插桩，重新运行打印日志，耗时耗力
- 4、如果需要多次日志对比分析，浏览器日志更难做到

......

针对以上问题，我们希望实现一个日志框架，能够解决以下问题：

- 1、日志过多时，比如50万条日志数据，支持自动日志文件下载存储，避免浏览器崩溃
- 3、支持对 `object`、`function`、`window` 等对象进行特殊处理，方便分析
- 4、支持记录日志条数，方便分析日志量
- 5、支持一条日志记录多个变量
- 6、支持设置每个文件最大日志条数，超过自动生成新日志文件


## 使用说明

### 测试日志框架

为了测试日志框架能记录多种数据类型，我们创建一个 `LogSaver` 类，用于保存日志数据。

```js
// 创建 LogSaver 实例
const logSaver = new LogSaver();

// 示例：逐步添加多个日志内容
logSaver.addLog({ a: "1" }, 3, false);
logSaver.addLog(window, function () { return 1; }, [1, 2, 3]);
logSaver.addLog(new Uint16Array(16), new Uint8Array(16), new Float32Array(16), new Float64Array(16));

// 最后一次可以手动导出
logSaver.saveLogsToBlob();
```

在浏览器里运行后，可以看到日志文件已经生成，并且自动下载了。如下：

![vscode-debugger-1](/images/reverse/framework/1.png)

```log
第 1 条: {"a":"1"} , 3 , false
第 2 条: [object Window] (循环引用) , function () { return 1; } , [1,2,3] (Array类型)
第 3 条: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Uint16Array类型) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Uint8Array类型) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Float32Array类型) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Float64Array类型)
```

### 实战演示


