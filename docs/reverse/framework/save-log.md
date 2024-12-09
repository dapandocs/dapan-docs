# 终极逆向插桩日志框架，让浏览器崩溃成为历史！

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>  
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等

> 【该文章已同步至星球】：`https://articles.zsxq.com/id_brw675neslxs.html`

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
- 7、数组类型、数组长度显示，方便快速搜索定位分析
- 8、日志有开关，可以随时关闭日志记录
- 9、如果日志数据量少，支持浏览器控制台直接显示日志内容，方便观察

......


## 使用说明

### 测试日志框架

为了测试日志框架能记录多种数据类型，我们创建一个 `LogSaver` 类，用于保存日志数据。

```js
// 创建 XysLogSaver 实例
const xysLogSaver = new XysLogSaver();

// 示例：逐步添加多个日志内容
xysLogSaver.addLog({ a: "1" }, 3, false);
xysLogSaver.addLog(window, function () { return 1; }, [1, 2, 3]);
xysLogSaver.addLog(new Uint16Array(16), new Uint8Array(16), new Float32Array(16), new Float64Array(16));
xysLogSaver.addLog([[1, 2, 3], [{ a1: 1, b2: 2 }]], { a: [1, 2, 3], b: { c: 4, d: 5 } });

// 最后一次可以手动导出
xysLogSaver.saveLogsToBlob();
```

在浏览器里运行后，可以看到日志文件已经生成，并且自动下载了。日志如下：

```log
第 1 条: {"a":"1"} , 3 , false
第 2 条: [object Window] (循环引用) , function () { return 1; } , [1,2,3] (Array类型，长度:3)
第 3 条: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Uint16Array类型，长度:16) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Uint8Array类型，长度:16) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Float32Array类型，长度:16) , [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] (Float64Array类型，长度:16)
第 4 条: [[1,2,3] (Array类型，长度:3),[{"a1":1,"b2":2}]] , {"a":[1,2,3],"b":{"c":4,"d":5}}
```

### 实战演示

以下是魔改 `Base64` 算法的部分日志。

```log
第 1 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [0] , 结果： , 72
第 2 条: 函数： , function push() { [native code] } , 调用者： , [72] , 参数： , [72] , 结果： , 1
第 3 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [1] , 结果： , 101
第 4 条: 函数： , function push() { [native code] } , 调用者： , [72,101] , 参数： , [101] , 结果： , 2
第 5 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [2] , 结果： , 108
第 6 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108] , 参数： , [108] , 结果： , 3
第 7 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [3] , 结果： , 108
第 8 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108] , 参数： , [108] , 结果： , 4
第 9 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [4] , 结果： , 111
第 10 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111] , 参数： , [111] , 结果： , 5
第 11 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [5] , 结果： , 44
第 12 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44] , 参数： , [44] , 结果： , 6
第 13 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [6] , 结果： , 32
第 14 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32] , 参数： , [32] , 结果： , 7
第 15 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [7] , 结果： , 87
第 16 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87] , 参数： , [87] , 结果： , 8
第 17 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [8] , 结果： , 111
第 18 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111] , 参数： , [111] , 结果： , 9
第 19 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [9] , 结果： , 114
第 20 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111,114] , 参数： , [114] , 结果： , 10
第 21 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [10] , 结果： , 108
第 22 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111,114,108] , 参数： , [108] , 结果： , 11
第 23 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [11] , 结果： , 100
第 24 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111,114,108,100] , 参数： , [100] , 结果： , 12
第 25 条: 函数： , function charCodeAt() { [native code] } , 调用者： , Hello, World! , 参数： , [12] , 结果： , 33
第 26 条: 函数： , function push() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111,114,108,100,33] , 参数： , [33] , 结果： , 13
第 27 条: 0 , + , 3 , ====> , 3
第 28 条: 函数： , function slice() { [native code] } , 调用者： , [72,101,108,108,111,44,32,87,111,114,108,100,33] , 参数： , [0,3] , 结果： , [72,101,108]
第 29 条: 函数： , function slice() { [native code] } , 调用者： , [72,101,108] , 参数： , [0] , 结果： , [72,101,108]
第 30 条: 72 , << , 16 , ====> , 4718592
第 31 条: 101 , << , 8 , ====> , 25856
第 32 条: 4718592 , | , 25856 , ====> , 4744448
第 33 条: 4744448 , | , 108 , ====> , 4744556
第 34 条: 4744556 , >> , 18 , ====> , 18
第 35 条: 18 , & , 63 , ====> , 18
第 36 条: 4744556 , >> , 12 , ====> , 1158
第 37 条: 1158 , & , 63 , ====> , 6
第 38 条: 4744556 , >> , 6 , ====> , 74133
第 39 条: 74133 , & , 63 , ====> , 21
第 40 条: 4744556 , & , 63 , ====> , 44
第 41 条: 函数： , function charAt() { [native code] } , 调用者： , ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ , 参数： , [18] , 结果： , S
第 42 条: 函数： , function charAt() { [native code] } , 调用者： , ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ , 参数： , [6] , 结果： , G
第 43 条: 函数： , function charAt() { [native code] } , 调用者： , ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ , 参数： , [21] , 结果： , V
第 44 条: 函数： , function charAt() { [native code] } , 调用者： , ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ , 参数： , [44] , 结果： , s
第 45 条: 函数： , function () {
          return interpreter(localScope, t1, stack, constantPool, bytecode, {
            t: this,
            n: t0,
            f: t0 || t3,
            r: 1
          }, arguments);
        } , 调用者： , [object Window] (循环引用) , 参数： , [72,101,108] , 结果： , [S,G,V,s]
第 46 条: 函数： , function join() { [native code] } , 调用者： , [S,G,V,s] , 参数： , [] , 结果： , SGVs
第 47 条:  , + , SGVs , ====> , SGVs
第 48 条: 0 , + , 3 , ====> , 3
第 49 条: 3 , + , 3 , ====> , 6
```

## 日志源码

```js
function isTypedArray(value) {
    return value instanceof Array ||
        value instanceof Int8Array ||
        value instanceof Uint8Array ||
        value instanceof Int16Array ||
        value instanceof Uint16Array ||
        value instanceof Int32Array ||
        value instanceof Uint32Array ||
        value instanceof Float32Array ||
        value instanceof Float64Array;
}

const arrayUtils = {
    Array: (value) => Array.isArray(value),
    Int8Array: (value) => value instanceof Int8Array,
    Uint8Array: (value) => value instanceof Uint8Array,
    Int16Array: (value) => value instanceof Int16Array,
    Uint16Array: (value) => value instanceof Uint16Array,
    Int32Array: (value) => value instanceof Int32Array,
    Uint32Array: (value) => value instanceof Uint32Array,
    Float32Array: (value) => value instanceof Float32Array,
    Float64Array: (value) => value instanceof Float64Array,
}

class XysLogSaver {
    constructor() {
        this.chromeLog = false; // 用于控制是否使用 Chrome 的日志功能
        this.switch = true; // 用于控制日志是否保存
        this.logs = [];  // 用于存储日志内容
        this.logCount = 1;  // 用于记录日志条数
        this.blob = null;  // 用于保存最新的日志 Blob
        this.maxLogCount = 10000;  // 设置最大日志条数，超过这个数量后清空
    }

    // 将多个参数的日志内容添加到日志数组
    addLog(...logArgs) {
        if (!this.switch) return;
        const logMessage = logArgs.map(arg => this.formatLog(arg)).join(' , ');
        const logEntry = `第 ${this.logCount} 条: ${logMessage}`;
        if (this.chromeLog) {
            console.log.apply(this, [`第 ${this.logCount} 条: `, ...logArgs]);
            this.logCount++;
            return;
        }
        this.logs.push(logEntry);
        this.logCount++;  // 每次添加日志时，增加计数器

        // 如果日志条数超过最大限制，清空日志数组并保存
        if (this.logs.length >= this.maxLogCount) {
            this.saveLogsToBlob();
            this.logs = [];  // 清空日志数组
        }
    }

    // 格式化日志，根据类型转换为合适的字符串
    formatLog(log) {
        if (log && typeof log === 'object') {

            for (const [type, checkFn] of Object.entries(arrayUtils)) {
                if (checkFn(log)) {
                    if (arrayUtils.Array(log) && log.some(item => typeof item === 'object')) {
                        return `[${log.map(item => this.formatLog(item)).join(',')}]`;
                    }
                    return `[${log}] (${type}类型，长度:${log.length})`;
                }
            }

            try {
                // 如果是对象，转换为 JSON 字符串
                return JSON.stringify(log);
            } catch (e) {
                // 如果对象有循环引用，返回特定信息
                return `${log} (循环引用)`;
            }
        } else if (typeof log === 'function') {
            // 如果是函数，转换为函数字符串
            return log.toString();
        } else if (log === null) {
            // 对 null 的特殊处理
            return 'null';
        } else {
            // 其他类型直接转为字符串
            return String(log);
        }
    }

    // 下载所有日志并生成新的 Blob
    saveLogsToBlob() {
        const logsContent = this.logs.join('\n');

        // 创建一个 Blob 对象
        const blob = new Blob([logsContent], { type: 'text/plain' });

        // 创建下载链接
        const link = document.createElement('a');

        // 为下载链接指定 Blob 对象的 URL
        link.href = URL.createObjectURL(blob);

        // 设置下载文件的名称
        link.download = `logs${this.logCount}.txt`;

        // 模拟点击链接，开始下载
        link.click();

        // 释放 URL 对象
        URL.revokeObjectURL(link.href);
    }
}


// 创建 XysLogSaver 实例
const xysLogSaver = new XysLogSaver();

// 示例：逐步添加多个日志内容
xysLogSaver.addLog({ a: "1" }, 3, false);
xysLogSaver.addLog(window, function () { return 1; }, [1, 2, 3]);
xysLogSaver.addLog(new Uint16Array(16), new Uint8Array(16), new Float32Array(16), new Float64Array(16));
xysLogSaver.addLog([[1, 2, 3], [{ a1: 1, b2: 2 }]], { a: [1, 2, 3], b: { c: 4, d: 5 } });

// 最后一次可以手动导出
xysLogSaver.saveLogsToBlob();
```

后续使用过程中，如果还有好的建议或需要改进的地方，欢迎随时提出，我会持续优化。
