# React 18 debugger 源码分析配置

## Github 地址

[react-debugger](https://github.com/dapandocs/react-debugger)

## 创建项目

### 1. vite 创建 react 项目

```bash
npm init vite@latest
或者
yarn create vite
```

### 2. 下载 react 最新源码

```js
// 下载时间为 20230720 react 版本为 "version": "18.2.0"
git clone https://github.com/facebook/react.git
```

### 3. 将 react 源码中的包移动到我们的项目中 src/react/packages/xxx

```js
// 需要移动的包
react;
react - dom;
react - dom - bindings;
react - reconciler;
scheduler;
shared;
```

### 4. 配置 vite.config.js

增加别名和环境变量，如下：

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 配置别名
    alias: {
      react: path.posix.resolve("src/react/packages/react"),
      "react-dom": path.posix.resolve("src/react/packages/react-dom"),
      "react-dom-bindings": path.posix.resolve(
        "src/react/packages/react-dom-bindings"
      ),
      "react-reconciler": path.posix.resolve(
        "src/react/packages/react-reconciler"
      ),
      scheduler: path.posix.resolve("src/react/packages/scheduler"),
      shared: path.posix.resolve("src/react/packages/shared"),
    },
  },
  // 配置环境变量，解决__DEV__ is not defined
  define: {
    __DEV__: false, // 设置为false跳过 if(__dev__)的开发逻辑 这样会报错 需要修改jsx_dev的引入
    __EXPERIMENTAL__: true,
    __PROFILE__: true,
  },
});
```

react 包移动完成后目录如下：
![react 目录](/images/react/1.png)

### 5. 配置 jsconfig.json

```js
// 给vscode编辑器使用
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "react/*": ["src/react/packages/react/*"],
      "react-dom/*": ["src/react/packages/react-dom/*"],
      "react-dom-bindings/*": ["src/react/packages/react-dom-bindings/*"],
      "react-reconciler/*": ["src/react/packages/react-reconciler/*"],
      "scheduler/*": ["src/react/packages/scheduler/*"],
      "shared/*": ["src/react/packages/shared/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### 6. 开启 debugger
![debugger](/images/react/7.png)

```js
{
    // 使用 IntelliSense 了解相关属性。
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "针对 localhost 启动 Chrome",
            "url": "http://localhost:5173",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

### 7. 启动项目

```js
npm run dev
或
yarn dev
```

## 处理报错

### 1. import type {ReactNodeList} from 'shared/ReactTypes';

报错如下：

![shared/ReactTypes](/images/react/2.png)

解决办法：

- 安装 flow-remove-types

```js
yarn add flow-remove-types -D
```

- 执行命令

```js
npx flow-remove-types --out-dir src/react src/react
```

执行完成后，如下：
![flow-remove-types](/images/react/3.png)

### 2. No matching export in "src/react/packages/react-dom/client.js" for import "default"

报错如下：
![react-dom/client](/images/react/4.png)

解决办法：
查看 client 文件是 export 到处的，所以需要修改引入方式

```js
import * as React from "react";
// import React from "react";
import * as ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. The requested module '/src/react/packages/react-reconciler/src/ReactFiberConfig.js' does not provide an export named 'getChildHostContext'

报错如下：
![react-dom/client](/images/react/5.png)

解决办法
src/react/packages/react-reconciler/src/ReactFiberConfig.js 更改后如下：

```js
// src/react/packages/react-reconciler/src/ReactFiberConfig.js

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

// We expect that our Rollup, Jest, and Flow configurations
// always shim this module with the corresponding host config
// (either provided by a renderer, or a generic shim for npm).
//
// We should never resolve to this file, but it exists to make
// sure that if we *do* accidentally break the configuration,
// the failure isn't silent.

// throw new Error('This module must be shimmed by a specific renderer.');

// 引入文件
export * from "./forks/ReactFiberConfig.dom-browser";

// 其实就是
// export * from 'react-dom-bindings/src/client/ReactDOMHostConfig';
```

上述问题解决后，就可以正常调试了
![正常](/images/react/6.png)
