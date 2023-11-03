# Node 包管理器

## npm（Node Package Manager）

npm 是 Node.js 的默认包管理器，也是最常用的包管理器之一。

### 安装

npm 会随着 Node.js 一起安装，所以你只需要安装 Node.js 即可。

### 使用

#### 初始化项目

```bash
npm init
```

#### 安装包

::: code-group

```bash[本地安装包]
npm install <package-name>

或者

npm i <package-name>
```

```bash[全局安装包]
npm install <package-name> -g

或者

npm i <package-name> -g
```

```bash[安装指定版本的包]
npm install <package-name>@<version>

或者

npm i <package-name>@<version>
```

```bash[安装到开发依赖]
# devDependencies
npm install <package-name> --save-dev

或者

npm i <package-name> -D
```

```bash[安装到生产依赖]
# dependencies
npm install <package-name> --save

或者

npm i <package-name> -S
```

:::

#### 卸载包

::: code-group

```bash[项目卸载包]

npm uninstall <package-name>

或者

npm un <package-name>
```

```bash[全局卸载包]

npm uninstall <package-name> -g

或者

npm un <package-name> -g
```

#### 更新包

::: code-group

```bash[项目更新包]

npm update <package-name>

或者

npm up <package-name>
```

```bash[全局更新包]

npm update <package-name> -g

或者

npm up <package-name> -g
```

:::

#### 查看包

::: code-group

```bash[查看项目包]

npm list <package-name>

或者

npm ls <package-name>
```

```bash[查看全局包]

npm list <package-name> -g

或者

npm ls <package-name> -g
```

```bash[查询指定包所有版本]

npm view <package-name> versions
```

```bash[查看npm所有配置]

npm config list
```

:::

#### 清除缓存

```bash

npm cache clean --force

```

#### 镜像

::: code-group

```bash[设置镜像]

npm config set registry https://registry.npmmirror.com
```

```bash[查看镜像]

npm config get registry
```

```bash[设置回原镜像]

npm config set registry https://registry.npmjs.org
```

:::

## yarn

yarn 是 Facebook 发布的新一代包管理器，相比 npm 有着更快的速度和更好的用户体验。

### 安装

```bash

npm install -g yarn

```

### 使用

#### 初始化项目

```bash

yarn init

```

#### 安装包

::: code-group

```bash[本地安装包]

yarn add <package-name>

```

```bash[全局安装包]

yarn global add <package-name>

```

```bash[安装指定版本的包]

yarn add <package-name>@<version>

```

```bash[安装到开发依赖]

yarn add <package-name> --dev

或

yarn add <package-name> -D

```

```bash[安装到生产依赖]

yarn add <package-name> --save

或

yarn add <package-name> -S

```

:::

#### 卸载包

::: code-group

```bash[项目卸载包]

yarn remove <package-name>

```

```bash[全局卸载包]

yarn global remove <package-name>

```

:::

#### 更新包

::: code-group

```bash[项目更新包]

yarn upgrade <package-name>

```

```bash[全局更新包]

yarn global upgrade <package-name>

```

:::

#### 查看包

::: code-group

```bash[查看项目包]

yarn list <package-name>

```

```bash[查看全局包]

yarn global list <package-name>

```

```bash[查询指定包所有版本]

yarn info <package-name> versions

```

```bash[查询yarn所有配置]

yarn config list

```

:::

#### 清除缓存

```bash

yarn cache clean --force

```

#### 镜像

::: code-group

```bash[设置镜像]

yarn config set registry https://registry.npmmirror.com

```

```bash[查看镜像]

yarn config get registry

```

```bash[设置回原镜像]

yarn config set registry https://registry.yarnpkg.com

```

:::

## pnpm

pnpm 是另一个包管理器，它旨在解决 npm 和 Yarn 在安装依赖包时占用磁盘空间的问题。pnpm 使用硬链接来共享依赖包，从而减少了磁盘空间的占用。

### 安装

```bash

npm install -g pnpm

```

### 使用

#### 初始化项目

```bash

pnpm init

```

#### 安装包

::: code-group

```bash[本地安装包]

pnpm install <package-name>

或

pnpm i <package-name>

或

pnpm add <package-name>

```

```bash[全局安装包]

pnpm install <package-name> -g

或

pnpm i <package-name> -g

或

pnpm add <package-name> -g

```

```bash[安装指定版本的包]

pnpm install <package-name>@<version>

或

pnpm i <package-name>@<version>

或

pnpm add <package-name>@<version>

```

```bash[安装到开发依赖]

pnpm install <package-name> --save-dev

或

pnpm install <package-name> -D

```

```bash[安装到生产依赖]

pnpm install <package-name> --save

或

pnpm install <package-name> -S

```

:::

#### 卸载包

::: code-group

```bash[项目卸载包]

pnpm uninstall <package-name>

或

pnpm remove <package-name>

或

pnpm rm <package-name>

```

```bash[全局卸载包]

pnpm uninstall <package-name> -g

或

pnpm remove <package-name> -g

或

pnpm rm <package-name> -g

或

pnpm un <package-name> -g


```

:::

#### 更新包

::: code-group

```bash[项目更新包]

pnpm update <package-name>

或

pnpm up <package-name>

或

pnpm upgrade <package-name>

```

```bash[全局更新包]

pnpm update <package-name> -g

或

pnpm up <package-name> -g

或

pnpm upgrade <package-name> -g

```

:::

#### 查看包

::: code-group

```bash[查看项目包]

pnpm list <package-name>

```

```bash[查看全局包]

pnpm list <package-name> -g

```

```bash[查询指定包所有版本]

pnpm view <package-name> versions

```

```bash[查询pnpm所有配置]

pnpm config list

```

:::

#### 清除缓存

```bash

pnpm store prune

```

#### 镜像

::: code-group

```bash[设置镜像]

pnpm config set registry https://registry.npmmirror.com

```

```bash[查看镜像]

pnpm config get registry

```

```bash[设置回原镜像]

pnpm config set registry https://registry.npmjs.org

```

:::

## 包管理器比较

| 功能                     | pnpm                         | Yarn                  | npm                    |
| ------------------------ | ---------------------------- | --------------------- | ---------------------- |
| 工作空间支持（monorepo） | ✔️                           | ✔️                    | ✔️                     |
| 隔离的 node_modules      | ✔️ - 默认                    | ✔️                    | ✔️                     |
| 提升的 node_modules      | ✔️                           | ✔️                    | ✔️ - 默认              |
| 自动安装 peers           | ✔️                           | ❌                    | ✔️                     |
| Plug'n'Play              | ✔️                           | ✔️ - 默认             | ❌                     |
| 零安装                   | ❌                           | ✔️                    | ❌                     |
| 修补依赖项               | ✔️                           | ✔️                    | ❌                     |
| 管理 Node.js 版本        | ✔️                           | ❌                    | ❌                     |
| 有锁文件                 | ✔️ - pnpm-lock.yaml          | ✔️ - yarn.lock        | ✔️ - package-lock.json |
| 支持覆盖                 | ✔️                           | ✔️ - 通过 resolutions | ✔️                     |
| 内容可寻址存储           | ✔️                           | ❌                    | ❌                     |
| 动态包执行               | ✔️ - 通过 pnpm dlx           | ✔️ - 通过 yarn dlx    | ✔️ - 通过 npx          |
| Side-effects cache       | ✔️                           | ❌                    | ❌                     |
| Listing licenses         | ✔️ - 通过 pnpm licenses list | ✔️ - 通过插件         | ❌                     |
