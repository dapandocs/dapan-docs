# eslint 与 prettier 解决了哪些问题?

## 分析作用

### eslint

主要功能是检查代码是否符合规范，如果不符合规范，会给出提示，但是不会自动修复。

### prettier

主要功能是格式化代码，如果代码不符合规范，可以自动修复。

## npm 包 vs vscode 插件

### npm 包

- 优点：可以在命令行中使用

- 缺点：不直观，不能在实时编辑器中看到效果

### vscode 插件

- 优点：直观，可以在实时编辑器中看到效果

- 缺点：不能在命令行中使用

## 无框架项目

### 1、初始化项目

```bash
# 初始化项目,使用默认配置
pnpm init -y
```

### 2、安装依赖

```bash
# 安装 eslint 依赖
pnpm i -D eslint

# 安装 prettier 依赖
pnpm i -D prettier

```

### 3、根目录下创建 index.js

```js
var a = "1"
    const b = '2';
console.log(a, b)
```

### 4、根目录下创建 .eslintrc.js

- 可以手动创建，也可以使用命令行创建

```bash
# 使用命令行创建
npx eslint --init

# 选择配置
# You can also run this command directly using 'npm init @eslint/config'.
# ? How would you like to use ESLint? ...
#  To check syntax only -- 这个选项只关注代码的语法是否正确
# > To check syntax and find problems -- 这个选项不仅检查语法，还会寻找可能的代码问题，例如未使用的变量、未定义的函数等。
#  To check syntax, find problems, and enforce code style -- 这个选项包括了前两个选项的所有功能，并添加了代码风格的强制执行。

# ? What type of modules does your project use? ...
# > JavaScript modules (import/export)
#  CommonJS (require/exports)
#  None of these

# ? Which framework does your project use? ...
#   React
#   Vue.js
# > None of these

# Does your project use TypeScript? » No / Yes

# ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
# √ Browser
# √ Node

# ? What format do you want your config file to be in? ...
# > JavaScript
#   YAML
#   JSON
```

上述步骤完成后，会在根目录下生成 .eslintrc.js 文件，内容如下：

```js
module.exports = {
  // `env` 定义了你的代码运行的环境，告诉 ESLint 全局变量是否应该可用
  env: {
    browser: true, // 这表示代码将在浏览器环境中运行
    es2021: true, // 这允许使用 ES2021 版本的 ECMAScript 功能
  },
  // `extends` 用于继承一组预定义的规则集
  extends: "eslint:recommended", // 这表示使用 ESLint 推荐的规则集

  // `overrides` 允许你为特定文件或文件模式定义特殊的配置
  overrides: [
    {
      env: {
        node: true, // 这表示这些文件将在 Node.js 环境中运行
      },
      files: [".eslintrc.{js,cjs}"], // 这定义了这个特殊配置适用的文件模式
      parserOptions: {
        sourceType: "script", // 这表示这些文件应被视为脚本而不是 ES6 模块
      },
    },
  ],

  // `parserOptions` 用于设置解析器选项，告诉 ESLint 如何解析代码
  parserOptions: {
    ecmaVersion: "latest", // 这允许使用最新的 ECMAScript 版本
    sourceType: "module", // 这表示你的代码使用了 ES6 模块
  },

  // `rules` 定义了项目特定的规则，你可以在这里启用、禁用或配置 ESLint 规则
  rules: {},
  // 这里为空，表示没有自定义规则
};
```

执行 `npx eslint index.js` 命令，如果发现有报错，增加 root: true，如下：

```js{2}
module.exports = {
  root: true, // [!code focus]
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
```

- root: true 表示什么？

  标志项目的根目录: root: true 告诉 ESLint 这个配置文件是你项目的根配置文件。

- 有什么作用？

  **停止向上查找**: 当 ESLint 在解析代码时，它会从代码文件的目录开始，向上查找所有的 .eslintrc.\* 配置文件，直到找到一个包含 root: true 的文件为止。

  **避免冲突**: 如果你的项目嵌套在另一个使用 ESLint 的项目中，或者你的系统中有全局的 ESLint 配置，root: true 可以确保 ESLint 只使用你项目的配置，不会与外部配置混合。

### 5、.eslintrc.js 配置 rules

```js
//.eslintrc.js
rules: {
    // 控制代码中字符串的引号类型。
    // 2 代表：强制使用双引号，如果使用其他类型的引号，ESLint 会报错。
    quotes: 2,

    // 控制代码中是否需要在语句末尾使用分号。
    // 1 代表：建议使用分号，但如果缺少分号，ESLint 只会发出警告。
    semi: 1,

    // 控制代码中是否可以使用 `console` 方法（例如 `console.log`）。
    // 1 代表：建议不要使用 `console` 方法，但如果使用了，ESLint 只会发出警告。
    "no-console": 1,

    // 控制函数名和括号之间是否需要空格。
    // 0 代表：关闭这个规则，不关心函数名和括号之间是否有空格。
    "space-before-function-paren": 0,
},
```

在 ESLint 的规则中，数字值通常有以下含义：

0: 关闭规则，不进行检查。

1: 打开规则，但只是发出警告。

2: 打开规则，并且如果违反了规则，ESLint 会报错。

### 6、执行命令

```bash
# 执行命令
npx eslint index.js

# 结果
#   1:12  warning  Missing semicolon             semi
#   2:15  error    Strings must use doublequote  quotes
#   2:18  warning  Missing semicolon             semi
#   3:1   warning  Unexpected console statement  no-console

# ✖ 4 problems (1 error, 3 warnings)
#   1 error and 2 warnings potentially fixable with the `--fix` option.
```

看到这个结果，就说明 eslint 已经生效了。

### 7、安装 vscode eslint 插件

如果只是在命令行中执行 `npx eslint index.js` 命令，那么每次都要手动执行，这样太麻烦了，我们可以安装 vscode eslint 插件，这样就可以在 vscode 中实时检查代码了。

如果你在 index.js 文件中有红色波浪线，那么就说明 eslint 插件已经安装成功了。

可以通过：eslint index.js --fix 命令，自动修复一些错误。但是有些错误是无法自动修复的，需要手动修改。

### 8、prettier 配置

eslint 并不能完全解决代码格式化的问题，所以我们还需要安装 prettier 插件。

在根目录下创建 .prettierrc.js 文件，内容如下：

```js
// .prettierrc.js
module.exports = {
  // 控制是否在语句末尾添加分号。
  // false 代表：不在语句末尾添加分号。
  semi: false,

  // 控制字符串是否使用单引号。
  // true 代表：使用单引号而不是双引号。
  singleQuote: true,
};
```

执行 `npx prettier --write index.js` 命令，可以看到代码已经格式化了。

### 9、安装 vscode prettier 插件

通常情况下，我们不会手动执行 `npx prettier --write index.js` 命令，而是通过 vscode prettier 插件自动格式化代码。

通过 `shift + alt + f` 快捷键，可以格式化代码。

如果有多个代码格式化插件，那么可能会出现冲突，导致代码格式化失败，这时候可以通过 `鼠标右键` 选择 prettier 插件进行格式化。如下图：

![prettier](/images/note/1.png)

## Vite TS 项目配置

```js
module.exports = {
  // 指定配置文件的根目录，这样 ESLint 只会在这个目录下查找 .eslintignore 文件
  root: true,

  // 指定代码的运行环境，这里指定了浏览器和 ES2020
  env: { browser: true, es2020: true },

  // 扩展其他的配置文件或预定义的配置集合
  extends: [
    // 使用 ESLint 推荐的规则集
    // npm 包: eslint
    "eslint:recommended",

    // 使用 @typescript-eslint 插件推荐的规则集，适用于 TypeScript 代码
    // npm 包: @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",

    // 使用 react-hooks 插件推荐的规则集，适用于 React Hooks
    // npm 包: eslint-plugin-react-hooks
    "plugin:react-hooks/recommended",
  ],

  // 指定 ESLint 忽略的文件或目录模式
  ignorePatterns: ["dist", ".eslintrc.cjs"],

  // 指定解析器，这里使用 @typescript-eslint/parser 来解析 TypeScript 代码
  // npm 包: @typescript-eslint/parser
  parser: "@typescript-eslint/parser",

  // 列出项目中要使用的 ESLint 插件
  plugins: [
    // 使用 react-refresh 插件提供的规则
    // npm 包: eslint-plugin-react-refresh
    "react-refresh",
  ],

  // 定义或覆盖规则的行为
  rules: {
    // 使用 react-refresh 插件的 only-export-components 规则，并设置为警告级别
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
```

两个关键字段：`plugins` 和 `extends`。它们的区别和用途：

1. **plugins**:

   - `plugins` 字段用于列出你想在项目中使用的 ESLint 插件。
   - 插件通常提供了一些额外的 linting 规则，这些规则不在 ESLint 的核心规则集中。
   - 例如，在你的配置中，你列出了 `react-refresh` 插件，这意味着你想使用这个插件提供的规则。
   - 但仅仅列出插件名并不会自动启用它的所有规则。要启用插件的规则，你需要在 `rules` 字段中明确指定。

2. **extends**:
   - `extends` 字段允许你基于其他配置文件或预定义的配置集合来扩展你的配置。
   - 这是一种快速应用一组已经定义好的规则的方法，而不是手动列出每一条规则。
   - 例如，`eslint:recommended` 是 ESLint 提供的一组推荐的规则，而 `plugin:@typescript-eslint/recommended` 是 `@typescript-eslint` 插件提供的一组推荐的规则。
   - 当你在 `extends` 字段中列出这些配置时，它们的所有推荐规则都会被应用到你的项目中。

总结：

- 当你想使用某个插件提供的规则，但不想使用该插件的预定义配置时，你应该将该插件列在 `plugins` 字段中，并在 `rules` 字段中明确启用你想使用的规则。
- 当你想基于其他配置或预定义的规则集合来扩展你的配置时，你应该使用 `extends` 字段。
