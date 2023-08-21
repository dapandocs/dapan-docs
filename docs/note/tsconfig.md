# tsconfig.json 用法

tsconfig.json 是 TypeScript 项目的配置文件，用于指导 TypeScript 编译器如何编译 .ts 文件。通过这个文件，你可以控制编译器的各种设置，包括编译的 ECMAScript 目标版本、模块系统、类型检查严格程度等。

在项目根目录下运行以下命令：

```bash
# npx tsc --init
tsc --init
```

## 用法

### target

- 默认值：es3

target 选项允许你设置 TypeScript 编译器将 TypeScript 代码编译为哪个 ECMAScript 版本的 JavaScript 代码。这个选项的设置会影响编译后的代码风格和可用特性。

`target` 选项可以设置为以下值之一：

- `"ES3"`: 编译为 ECMAScript 3 标准的 JavaScript 代码。
- `"ES5"`: 编译为 ECMAScript 5 标准的 JavaScript 代码。
- `"ES6"` 或 `"ES2015"`: 编译为 ECMAScript 2015 标准的 JavaScript 代码。
- `"ES2016"`: 编译为 ECMAScript 2016 标准的 JavaScript 代码。
- `"ES2017"`: 编译为 ECMAScript 2017 标准的 JavaScript 代码。
- `"ES2018"`: 编译为 ECMAScript 2018 标准的 JavaScript 代码。
- `"ES2019"`: 编译为 ECMAScript 2019 标准的 JavaScript 代码。
- `"ES2020"`: 编译为 ECMAScript 2020 标准的 JavaScript 代码。
- `"ESNext"`: 编译为最新 ECMAScript 草案标准的 JavaScript 代码。

- 例子：

#### 1. ES3 示例

如果目标是更旧的 ECMAScript 版本，例如 ES3，一些现代 JavaScript 特性将被转换或移除。例如，`const` 将被转换为 `var`：

```json
{
  "compilerOptions": {
    "target": "ES3"
  }
}
```

编译后的代码：

```javascript
var add = function (a, b) {
  return a + b;
};
```

#### 2. ES5 示例

假设我们有以下 TypeScript 代码：

```typescript
const add = (a: number, b: number) => a + b;
```

如果在 `tsconfig.json` 中设置 `"target": "ES5"`，编译后的 JavaScript 代码将转换箭头函数为普通函数：

```json
{
  "compilerOptions": {
    "target": "ES5"
  }
}
```

编译后的代码：

```javascript
var add = function (a, b) {
  return a + b;
};
```

#### 3. ES6（ES2015） 示例

同样的 TypeScript 代码，如果设置 `"target": "ES6"`，则编译后的代码将保留箭头函数：

```json
{
  "compilerOptions": {
    "target": "ES6"
  }
}
```

编译后的代码：

```javascript
const add = (a, b) => a + b;
```

### module

`module` 选项在 TypeScript 的 `tsconfig.json` 文件中用于指定编译后的代码应该使用哪种模块化标准。JavaScript 有多种模块化标准，不同的环境可能需要不同的模块化标准。

#### 1. module 选项的作用

`module` 选项允许你选择以下模块化标准之一：

- `"None"`: 不生成模块代码。
- `"CommonJS"`: 适用于 Node.js 和其他 CommonJS 兼容的环境。
- `"AMD"`: 适用于异步模块定义，如 RequireJS。
- `"System"`: 适用于 SystemJS 加载器。
- `"UMD"`: 适用于通用模块定义，可以同时用于 CommonJS 和 AMD。
- `"ES6"` 或 `"ES2015"`: 使用 ECMAScript 2015 的模块化标准。
- `"ES2020"`: 使用 ECMAScript 2020 的模块化标准。
- `"ESNext"`: 使用最新的 ECMAScript 模块化标准。

#### 2. 示例

##### 2.1 CommonJS 示例

假设我们有以下 TypeScript 代码：

```typescript
import { add } from "./math";
console.log(add(1, 2));
```

如果在 `tsconfig.json` 中设置 `"module": "CommonJS"`，编译后的代码将使用 CommonJS 模块化标准：

```json
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

编译后的代码：

```javascript
var math_1 = require("./math");
console.log(math_1.add(1, 2));
```

##### 2.2 ES6 示例

同样的 TypeScript 代码，如果设置 `"module": "ES6"`，则编译后的代码将使用 ECMAScript 2015 模块化标准：

```json
{
  "compilerOptions": {
    "module": "ES6"
  }
}
```

编译后的代码：

```javascript
import { add } from "./math";
console.log(add(1, 2));
```

### lib

`lib` 选项在 TypeScript 的 `tsconfig.json` 文件中用于指定编译时可用的库文件。这些库文件包含了 ECMAScript 的各个版本以及如 DOM、WebWorker 等宿主环境的类型定义。

#### 1. lib 选项的作用

通过设置 `lib` 选项，你可以控制 TypeScript 编译器应该包括哪些内置类型定义文件。这样可以确保你的代码只使用目标运行环境支持的特性。

例如，如果你的代码需要在不支持 ECMAScript 2015 Promises 的旧浏览器中运行，你可能不希望包括与 Promises 相关的类型定义。

#### 2. 可用值

`lib` 选项可以设置为以下值之一或它们的组合：

- `"ES5"`、`"ES6"`、`"ES2015"`、`"ES2016"`、`"ES2017"`、`"ES2018"`、`"ES2019"`、`"ES2020"`、`"ESNext"`: 包括与特定 ECMAScript 版本相关的类型定义。

- `"DOM"`: 包括与浏览器 DOM 相关的类型定义。

- `"WebWorker"`: 包括与 Web Workers 相关的类型定义。

- `"ScriptHost"`: 包括与 Windows 脚本宿主相关的类型定义。

#### 3. 示例

##### 3.1 只包括 ES5 和 DOM 类型定义

如果你的代码需要在只支持 ECMAScript 5 和基本 DOM API 的浏览器中运行，你可以设置 `lib` 选项如下：

```json
{
  "compilerOptions": {
    "lib": ["ES5", "DOM"]
  }
}
```

这样，编译器将只包括与 ECMAScript 5 和 DOM 相关的类型定义，不会包括与更高版本 ECMAScript 或其他宿主环境相关的类型定义。

##### 3.2 包括 ES2017 和 WebWorker 类型定义

如果你的代码需要使用 ECMAScript 2017 的特性，并且需要在 Web Workers 中运行，你可以设置 `lib` 选项如下：

```json
{
  "compilerOptions": {
    "lib": ["ES2017", "WebWorker"]
  }
}
```

这样，编译器将包括与 ECMAScript 2017 和 Web Workers 相关的类型定义。

`allowJs` 选项在 TypeScript 的 `tsconfig.json` 文件中用于控制是否允许编译 JavaScript 文件。这个选项可以让你在 TypeScript 项目中混合使用 TypeScript 和 JavaScript 代码。

### allowJs

#### 1. allowJs 选项的作用

当你设置 `allowJs` 选项为 `true` 时，TypeScript 编译器将允许编译 JavaScript 文件（`.js` 和 `.jsx`）。这对于逐步迁移现有的 JavaScript 项目到 TypeScript 或在 TypeScript 项目中使用第三方 JavaScript 库非常有用。

#### 2. 示例

##### 2.1 允许编译 JavaScript 文件

假设你有一个 TypeScript 项目，其中包括一些 JavaScript 文件，你希望这些文件也能被 TypeScript 编译器处理。你可以在 `tsconfig.json` 文件中设置 `allowJs` 选项为 `true`：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts", "src/**/*.js"]
}
```

这样，TypeScript 编译器将编译 `src` 目录下的所有 `.ts` 和 `.js` 文件，并将编译后的代码输出到 `dist` 目录。

##### 2.2 与其他选项结合使用

你还可以与其他选项结合使用，例如 `checkJs`。当 `checkJs` 设置为 `true` 时，编译器将对 JavaScript 文件执行类型检查：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts", "src/**/*.js"]
}
```

这样，编译器不仅会编译 JavaScript 文件，还会对它们执行类型检查，就像对 TypeScript 文件所做的那样。

### skipLibCheck

`skipLibCheck` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项。它用于控制编译器是否跳过对声明文件（`.d.ts` 文件）的类型检查。

#### 1. skipLibCheck 选项的作用

当你设置 `skipLibCheck` 选项为 `true` 时，TypeScript 编译器将跳过对所有声明文件的类型检查。这可以减少编译时间，特别是在大型项目中，或者当某些声明文件中存在不可避免的类型错误时。

然而，禁用库检查可能会隐藏项目中的实际类型错误，因此需要谨慎使用。

#### 2. 示例

##### 2.1 启用 skipLibCheck

假设你有一个项目，其中包括许多第三方库，并且你想要减少编译时间。你可以在 `tsconfig.json` 文件中设置 `skipLibCheck` 选项为 `true`：

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

这样，编译器将跳过对所有声明文件的类型检查，可能会加快编译速度。

##### 2.2 禁用 skipLibCheck

如果你想要确保所有库的类型定义都正确，你可以将 `skipLibCheck` 设置为 `false` 或完全省略该选项：

```json
{
  "compilerOptions": {
    "skipLibCheck": false
  }
}
```

这样，编译器将对所有声明文件执行类型检查，确保它们与你的代码完全兼容。

### moduleResolution

`moduleResolution` 选项允许你根据项目的运行环境和构建工具选择合适的模块解析策略。正确设置此选项可以确保编译器正确解析项目中的所有模块。

#### 1. moduleResolution 选项的作用

`moduleResolution` 选项用于指定模块解析策略，以下是可用的值：

- `'node16'` 或 `'nodenext'`: 用于现代版本的 Node.js（v12 及更高版本），支持 ECMAScript imports 和 CommonJS require。
- `'node10'`: 用于 Node.js v10 之前的版本，仅支持 CommonJS require。
- `'bundler'`: 用于与打包工具一起使用，支持 `package.json` 中的 `"imports"` 和 `"exports"`，但不要求相对路径中的文件扩展名。
- `'classic'`: TypeScript 1.6 之前使用的解析策略，现在不应再使用。

#### 2. 示例

##### 2.1 使用 node16 解析策略

如果你的项目运行在 Node.js v12 或更高版本上，你可以使用以下配置：

```json
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}
```

##### 2.2 使用 bundler 解析策略

如果你的项目使用打包工具，你可以使用以下配置：

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### importHelpers

`importHelpers` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项。当设置为 `true` 时，它允许 TypeScript 编译器从 [tslib](https://www.npmjs.com/package/tslib) 包导入辅助函数，而不是将这些辅助函数内联到每个输出文件中。

#### 1. importHelpers 选项的作用

在 TypeScript 代码编译过程中，编译器可能会生成一些辅助函数，例如用于实现继承、展开操作符等特性的代码。默认情况下，这些辅助函数会被内联到每个使用它们的输出文件中。

当你设置 `importHelpers` 选项为 `true` 时，编译器将从 `tslib` 包导入这些辅助函数，而不是将它们内联到输出文件中。这可以减小输出文件的大小，特别是在大型项目中。

#### 2. 示例

##### 2.1 启用 importHelpers

首先，你需要确保项目中安装了 `tslib` 包。你可以使用以下命令安装：

```bash
npm install tslib --save
```

然后，你可以在 `tsconfig.json` 文件中设置 `importHelpers` 选项为 `true`：

```json
{
  "compilerOptions": {
    "importHelpers": true
  }
}
```

假设你有以下 TypeScript 代码：

```typescript
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
}
```

当 `importHelpers` 设置为 `true` 时，编译后的代码将从 `tslib` 导入 `__extends` 辅助函数，而不是将其内联到输出文件中：

```javascript
import * as tslib_1 from "tslib";
var Animal = /** @class */ (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var Dog = /** @class */ (function (_super) {
  tslib_1.__extends(Dog, _super);
  function Dog(name) {
    return _super.call(this, name) || this;
  }
  return Dog;
})(Animal);
```

### noEmit

`noEmit` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项。当设置为 `true` 时，它会告诉 TypeScript 编译器进行类型检查，但不生成输出文件。

#### 1. noEmit 选项的作用

`noEmit` 选项通常用于以下场景：

- **类型检查**: 当你只想进行类型检查而不想生成 JavaScript 输出文件时，可以设置 `noEmit` 为 `true`。
- **与 Babel 配合使用**: 如果你使用 Babel 来转换 TypeScript 文件，你可能希望 TypeScript 编译器仅进行类型检查，而让 Babel 负责生成输出文件。在这种情况下，你可以设置 `noEmit` 为 `true`。

#### 2. 示例

##### 2.1 启用 noEmit

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `noEmit` 选项：

```json
{
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
```

在这个配置中，TypeScript 编译器将对 `src` 目录中的 `.ts` 文件进行类型检查，但不会生成任何输出文件。

##### 2.2 禁用 noEmit

如果你想让 TypeScript 编译器生成输出文件，你可以将 `noEmit` 设置为 `false` 或完全省略该选项：

```json
{
  "compilerOptions": {
    "noEmit": false
  },
  "include": ["src/**/*.ts"]
}
```

在这个配置中，TypeScript 编译器将对 `src` 目录中的 `.ts` 文件进行类型检查，并生成相应的 JavaScript 输出文件。

### jsx

`jsx` 选项在 TypeScript 的 `tsconfig.json` 文件中用于控制如何处理 JSX 语法。JSX 是一种 JavaScript 扩展语法，允许你在 JavaScript 文件中编写类似 HTML 的标记。它通常与 React 等库一起使用。

#### 1. jsx 选项的作用

`jsx` 选项有以下可能的值：

- `"preserve"`: 保留 JSX 表达式以供后续的转换步骤处理。输出文件将保留 `.jsx` 扩展名。
- `"react"`: 转换 JSX 为 `React.createElement` 调用。这是使用 React 时的常见选择。
- `"react-native"`: 与 `"preserve"` 相同，但输出文件将保留 `.js` 扩展名。
- `"react-jsx"`: 转换 JSX 为调用 React 17 或更高版本引入的新 JSX 转换函数。需要 React 17 或更高版本。

#### 2. 示例

##### 2.1 使用 React 转换

如果你的项目使用 React，并且你想将 JSX 转换为 `React.createElement` 调用，你可以在 `tsconfig.json` 文件中设置 `jsx` 选项为 `"react"`：

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

假设你有以下 TypeScript 文件：

```tsx
import React from "react";

const App = () => {
  return <div>Hello, World!</div>;
};

export default App;
```

使用 `"react"` 选项编译后，输出文件将包含 `React.createElement` 调用：

```js
import React from "react";

const App = () => {
  return React.createElement("div", null, "Hello, World!");
};

export default App;
```

##### 2.2 使用 React 17 新 JSX 转换

如果你的项目使用 React 17 或更高版本，你可以使用新的 JSX 转换功能。在 `tsconfig.json` 文件中设置 `jsx` 选项为 `"react-jsx"`：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

使用这个选项，编译后的代码将使用新的 JSX 转换函数，这可以提供更好的性能和更小的包大小。

### esModuleInterop

`esModuleInterop` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项，用于控制 TypeScript 如何与 CommonJS 和 ES6 模块进行交互。这个选项可以确保更一致的导入行为，特别是在混合使用 CommonJS 和 ES6 模块的项目中。

#### 1. esModuleInterop 选项的作用

当设置为 `true` 时，`esModuleInterop` 会启用以下行为：

- 允许使用 ES6 风格的导入语法来导入 CommonJS 模块。
- 自动生成一个名为 `__importDefault` 的辅助函数，用于创建与 ES6 默认导入兼容的对象。

这个选项的目的是简化在同一项目中混合使用 CommonJS 和 ES6 模块的复杂性。

#### 2. 示例

##### 2.1 启用 esModuleInterop

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `esModuleInterop` 选项：

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

假设你有一个 CommonJS 模块 `myModule.js`：

```javascript
module.exports = {
  foo: "bar",
};
```

当 `esModuleInterop` 设置为 `true` 时，你可以使用 ES6 风格的导入语法来导入此模块：

```typescript
import myModule from "./myModule";

console.log(myModule.foo); // 输出 'bar'
```

编译后的代码将包括 `__importDefault` 辅助函数，以确保导入的对象与 ES6 默认导入兼容：

```javascript
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var myModule_1 = __importDefault(require("./myModule"));

console.log(myModule_1.default.foo); // 输出 'bar'
```

##### 2.2 禁用 esModuleInterop

如果你将 `esModuleInterop` 设置为 `false` 或完全省略该选项，你将需要使用 `import * as` 语法来导入 CommonJS 模块：

```typescript
import * as myModule from "./myModule";

console.log(myModule.foo); // 输出 'bar'
```

`esModuleInterop` 选项允许你在 TypeScript 项目中更灵活地混合使用 CommonJS 和 ES6 模块。通过启用此选项，你可以使用更一致的导入语法，并确保导入的对象与 ES6 默认导入兼容。

这个选项特别适用于那些依赖于 CommonJS 和 ES6 模块的现代项目。如果你的项目完全使用 ES6 模块，你可能不需要启用此选项。

### sourceMap

`sourceMap` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项，用于控制是否生成源映射文件（source map）。源映射文件可以帮助开发者在调试编译后的代码时，更容易地映射回原始的 TypeScript 源代码。

#### 1. sourceMap 选项的作用

当设置为 `true` 时，`sourceMap` 选项会让 TypeScript 编译器为每个输出文件生成一个对应的 `.map` 文件。这个 `.map` 文件包含了编译后的 JavaScript 代码与原始 TypeScript 代码之间的映射信息。

这个映射信息允许开发者在浏览器或其他调试工具中，直接查看和调试原始的 TypeScript 代码，而不是编译后的 JavaScript 代码。

#### 2. 示例

##### 2.1 启用 sourceMap

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `sourceMap` 选项：

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

假设你有以下 TypeScript 文件 `example.ts`：

```typescript
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

当 `sourceMap` 设置为 `true` 时，编译后你将得到两个文件：`example.js` 和 `example.js.map`。

`example.js` 文件包含编译后的 JavaScript 代码：

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");
//# sourceMappingURL=example.js.map
```

`example.js.map` 文件包含源映射信息，链接编译后的 JavaScript 代码与原始 TypeScript 代码。

##### 2.2 在浏览器中调试

当源映射文件存在时，你可以在浏览器的开发者工具中直接查看和调试原始的 TypeScript 代码。这使得调试过程更直观，更容易定位问题。

`sourceMap` 选项允许 TypeScript 编译器生成源映射文件，从而提供更好的调试体验。通过启用此选项，开发者可以在浏览器或其他调试工具中直接查看和调试原始的 TypeScript 代码。

这个选项对于任何需要调试 TypeScript 代码的项目都非常有用，特别是在开发环境中。在生产环境中，你可能会选择禁用此选项，以减小输出文件的大小。

### baseUrl

`baseUrl` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项，用于解析非相对模块名称的基本目录。它可以使你更灵活地组织和引用项目中的文件和模块。

#### 1. baseUrl 选项的作用

`baseUrl` 选项允许你设置一个基本目录，用于解析项目中的模块和文件。这意味着你可以从该基本目录开始，而不是从每个文件的当前位置开始，来引用模块。

这个选项特别有用于大型项目，其中文件和模块可能分布在多个目录和子目录中。通过设置一个统一的基本目录，你可以更容易地管理和引用这些文件。

#### 2. 示例

##### 2.1 设置 baseUrl

以下是一个 `tsconfig.json` 文件的示例，其中设置了 `baseUrl` 选项：

```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

在这个配置中，`baseUrl` 被设置为项目的 `src` 目录。这意味着所有非相对模块导入都将从该目录开始解析。

##### 2.2 引用模块

假设你的项目结构如下：

```
projectRoot/
├── src/
│   ├── utils/
│   │   ├── math.ts
│   ├── app/
│   │   ├── main.ts
├── tsconfig.json
```

在 `math.ts` 文件中，你可能有以下代码：

```typescript
export function add(x: number, y: number): number {
  return x + y;
}
```

在 `main.ts` 文件中，你可以使用以下导入语句来引用 `math.ts` 文件：

```typescript
import { add } from "utils/math";

console.log(add(1, 2)); // 输出 3
```

由于 `baseUrl` 被设置为 `./src`，所以编译器将从 `src` 目录开始解析 `'utils/math'` 导入路径。这使得你可以使用更简洁的路径来引用项目中的文件和模块。

### strict

`strict` 选项在 TypeScript 的 `tsconfig.json` 文件中用于启用一组严格的类型检查选项。这有助于捕获更多的潜在错误，并强制编写更健壮的代码。

#### 1. strict 选项的作用

当设置为 `true` 时，`strict` 选项会启用一组严格的类型检查规则，包括：

- `strictNullChecks`: 确保 null 和 undefined 值得到正确处理。
- `strictFunctionTypes`: 更严格地检查函数参数的类型。
- `strictBindCallApply`: 检查 `bind`、`call` 和 `apply` 方法的参数。
- `strictPropertyInitialization`: 确保类属性在构造函数中初始化。
- `noImplicitAny`: 防止表达式隐式具有 "any" 类型。
- `noImplicitThis`: 防止 "this" 表达式隐式具有 "any" 类型。

#### 2. 示例

##### 2.1 启用 strict

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `strict` 选项：

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

##### 2.2 代码示例

假设你有以下 TypeScript 文件：

```typescript
function greet(person: { name: string }) {
  console.log(`Hello, ${person.name}!`);
}

greet(null); // 错误：Argument of type 'null' is not assignable to parameter of type '{ name: string; }'.
```

由于启用了 `strict` 选项，尤其是 `strictNullChecks`，所以传递 `null` 作为参数会导致类型错误。编译器会强制你确保传递的值符合期望的类型。

`strict` 选项允许你启用一组严格的类型检查规则，从而提高代码的质量和健壮性。通过捕获更多的潜在错误，它可以帮助你编写更安全、更可维护的代码。

虽然这个选项可能会使开发过程更具挑战性，特别是在现有项目中启用它可能会暴露许多类型错误，但它通常被认为是一种最佳实践，特别是对于新项目。

如果你觉得 `strict` 选项过于严格，你也可以选择单独启用或禁用其中的某些规则，以适应你的项目需求。

### resolveJsonModule

`resolveJsonModule` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项，允许你直接导入 JSON 文件作为模块。这样，你可以在 TypeScript 文件中直接使用 JSON 文件的数据，而不需要额外的读取或解析步骤。

#### 1. resolveJsonModule 选项的作用

当设置为 `true` 时，`resolveJsonModule` 选项允许 TypeScript 编译器将 JSON 文件视为模块，并能够解析和类型检查这些文件。这样，你可以像导入其他 TypeScript 或 JavaScript 文件一样导入 JSON 文件。

#### 2. 示例

##### 2.1 启用 resolveJsonModule

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `resolveJsonModule` 选项：

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

请注意，通常与 `resolveJsonModule` 一起使用的还有 `esModuleInterop` 选项，以确保与 ES6 模块的兼容性。

##### 2.2 导入 JSON 文件

假设你有一个名为 `config.json` 的 JSON 文件，内容如下：

```json
{
  "appName": "My App",
  "version": "1.0.0"
}
```

你可以在 TypeScript 文件中直接导入此 JSON 文件：

```typescript
import config from "./config.json";

console.log(`App Name: ${config.appName}`); // 输出 "App Name: My App"
console.log(`Version: ${config.version}`); // 输出 "Version: 1.0.0"
```

编译器将自动解析 JSON 文件的结构，并为导入的 `config` 对象提供正确的类型。

`resolveJsonModule` 选项允许你在 TypeScript 项目中直接导入 JSON 文件。这可以简化代码，使你能够更容易地使用 JSON 数据，而无需手动读取或解析文件。

这个选项特别适用于需要读取配置文件、本地化数据或其他 JSON 格式资源的项目。通过启用此选项，你可以更灵活、更高效地管理和使用这些资源。

### allowSyntheticDefaultImports

`allowSyntheticDefaultImports` 是 TypeScript 配置文件 `tsconfig.json` 中的一个编译选项，用于控制如何处理没有默认导出的模块。这个选项在与 CommonJS 或其他非 ECMAScript 模块系统交互时特别有用。

#### 1. allowSyntheticDefaultImports 选项的作用

当设置为 `true` 时，`allowSyntheticDefaultImports` 选项允许你使用 ES6 默认导入语法来导入没有默认导出的模块。这不会影响运行时代码，但允许类型检查器接受这种导入形式。

这个选项通常与使用 Babel 或其他转换工具的项目一起使用，这些工具在运行时处理这种导入。

#### 2. 示例

##### 2.1 启用 allowSyntheticDefaultImports

以下是一个 `tsconfig.json` 文件的示例，其中启用了 `allowSyntheticDefaultImports` 选项：

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

##### 2.2 导入没有默认导出的模块

假设你有一个 CommonJS 模块 `myModule.js`：

```javascript
exports.foo = "bar";
```

当 `allowSyntheticDefaultImports` 设置为 `true` 时，你可以使用 ES6 默认导入语法来导入此模块：

```typescript
import myModule from "./myModule";

console.log(myModule.foo); // 输出 'bar'
```

请注意，这不会更改编译后的代码。编译后的代码仍将使用 CommonJS 的 `require` 语法。`allowSyntheticDefaultImports` 仅允许类型检查器接受这种导入形式。

### paths

`paths` 选项在 TypeScript 的 `tsconfig.json` 文件中用于设置模块的别名路径，使你能够以更简洁的方式引用项目中的文件和目录。它通常与 `baseUrl` 选项一起使用，以定义这些路径别名的基本目录。

#### 1. paths 选项的作用

`paths` 选项允许你定义一组键值对，其中键是别名，值是相对于 `baseUrl` 的路径。这样，你可以使用别名来引用文件和目录，而不是使用相对或绝对路径。

这个选项可以使你的导入语句更简洁，更容易维护，并允许你更灵活地组织项目结构。

#### 2. 示例

##### 2.1 设置 paths 和 baseUrl

以下是一个 `tsconfig.json` 文件的示例，其中设置了 `paths` 和 `baseUrl` 选项：

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"],
      "@components/*": ["components/*"]
    }
  }
}
```

在这个配置中，`baseUrl` 被设置为项目的 `src` 目录，然后定义了两个别名：`@utils` 和 `@components`。

##### 2.2 使用别名导入模块

假设你的项目结构如下：

```
projectRoot/
├── src/
│   ├── utils/
│   │   ├── math.ts
│   ├── components/
│   │   ├── header.ts
│   ├── app/
│   │   ├── main.ts
├── tsconfig.json
```

在 `main.ts` 文件中，你可以使用定义的别名来导入 `math.ts` 和 `header.ts` 文件：

```typescript
import * as math from "@utils/math";
import * as header from "@components/header";

// 使用导入的模块
```

这些导入语句使用了在 `tsconfig.json` 文件中定义的别名，使它们更简洁，更容易理解。

### include

`include` 选项在 TypeScript 的 `tsconfig.json` 文件中用于指定编译器应包括哪些文件或目录进行编译。通过使用这个选项，你可以更精确地控制哪些文件被包括在编译过程中。

#### 1. include 选项的作用

`include` 选项允许你提供一个文件和目录的模式数组，以指定哪些文件应该被 TypeScript 编译器包括在编译过程中。这些模式可以使用通配符来匹配多个文件或目录。

如果你不提供 `include` 选项，编译器将默认包括所有 TypeScript 文件（`.ts` 或 `.tsx`），除了默认排除的文件外。

#### 2. 示例

##### 2.1 设置 include

以下是一个 `tsconfig.json` 文件的示例，其中设置了 `include` 选项：

```json
{
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
```

在这个配置中，`include` 选项指定了两个模式：

- `src/**/*.ts`: 包括 `src` 目录及其所有子目录中的所有 `.ts` 文件。
- `tests/**/*.ts`: 包括 `tests` 目录及其所有子目录中的所有 `.ts` 文件。

##### 2.2 项目结构示例

假设你的项目结构如下：

```
projectRoot/
├── src/
│   ├── app.ts
│   ├── utils/
│   │   ├── math.ts
├── tests/
│   ├── app.test.ts
├── external/
│   ├── external.ts
├── tsconfig.json
```

在这个示例中，由于 `include` 选项的设置，`src` 和 `tests` 目录中的所有 `.ts` 文件将被包括在编译过程中，而 `external` 目录中的文件将被排除。

### exclude

`exclude` 选项在 TypeScript 的 `tsconfig.json` 文件中用于指定编译器应排除哪些文件或目录进行编译。通过使用这个选项，你可以更精确地控制哪些文件被排除在编译过程之外。

#### 1. exclude 选项的作用

`exclude` 选项允许你提供一个文件和目录的模式数组，以指定哪些文件应该被 TypeScript 编译器排除在编译过程之外。这些模式可以使用通配符来匹配多个文件或目录。

如果你不提供 `exclude` 选项，编译器将默认排除某些文件夹，如 `node_modules`、`bower_components`、`jspm_packages`，以及与 `outDir` 选项相对应的目录。

#### 2. 示例

##### 2.1 设置 exclude

以下是一个 `tsconfig.json` 文件的示例，其中设置了 `exclude` 选项：

```json
{
  "exclude": ["node_modules", "tests/**/*.spec.ts", "build"]
}
```

在这个配置中，`exclude` 选项指定了三个模式：

- `node_modules`: 排除整个 `node_modules` 目录。
- `tests/**/*.spec.ts`: 排除 `tests` 目录及其所有子目录中的所有 `.spec.ts` 文件。
- `build`: 排除整个 `build` 目录。

##### 2.2 项目结构示例

假设你的项目结构如下：

```
projectRoot/
├── src/
│   ├── app.ts
├── tests/
│   ├── app.test.ts
│   ├── app.spec.ts
├── node_modules/
├── build/
├── tsconfig.json
```

在这个示例中，由于 `exclude` 选项的设置，`node_modules`、`build` 目录以及 `tests` 目录中的 `.spec.ts` 文件将被排除在编译过程之外。

`exclude` 选项允许你在 TypeScript 项目中精确控制哪些文件和目录被排除在编译过程之外。通过使用这个选项，你可以确保只编译需要的文件，从而提高编译效率并减少输出的大小。

### exclude

`extends` 选项在 TypeScript 的 `tsconfig.json` 文件中允许一个配置文件继承另一个配置文件的设置。这样，你可以创建一个共享的基本配置文件，并在多个项目或配置中重用它。

### 1. extends 选项的作用

`extends` 选项允许你指定一个要继承的基本配置文件的路径。当前配置文件将继承基本配置文件中的所有设置，并可以覆盖或添加自己的设置。

这个选项可以使你更容易地在多个项目或配置之间共享通用设置，从而减少重复代码并提高可维护性。

### 2. 示例

#### 2.1 创建基本配置文件

假设你有一个名为 `base-config.json` 的基本配置文件，内容如下：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true
  }
}
```

这个文件包含一组通用的编译器选项，可以在多个项目或配置中重用。

#### 2.2 使用 extends 继承基本配置

以下是一个 `tsconfig.json` 文件的示例，其中使用了 `extends` 选项来继承上述基本配置文件：

```json
{
  "extends": "./base-config.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```

在这个配置中，`extends` 选项指定了基本配置文件的路径。当前配置文件将继承基本配置文件中的所有编译器选项，并添加了自己的 `outDir` 和 `include` 设置。

结果配置将等效于以下内容：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```

`extends` 选项允许你在 TypeScript 项目中创建和重用基本配置文件。通过使用这个选项，你可以减少重复的配置代码，使项目结构更清晰，更容易维护。

这个选项特别适用于具有多个子项目或需要共享通用设置的大型项目。通过创建一个或多个基本配置文件，你可以确保项目之间的一致性，并更容易地更新和管理通用设置。

## tsconfig.json 默认配置

```json
{
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig 了解更多关于这个文件的信息 */

    /* 项目 */
    // "incremental": true,                              /* 保存 .tsbuildinfo 文件以允许项目的增量编译。 */
    // "composite": true,                                /* 启用允许将 TypeScript 项目与项目引用一起使用的约束。 */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* 指定 .tsbuildinfo 增量编译文件的路径。 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 在引用组合项目时禁用首选源文件而不是声明文件。 */
    // "disableSolutionSearching": true,                 /* 在编辑时，将一个项目排除在多项目引用检查之外。 */
    // "disableReferencedProjectLoad": true,             /* 减少 TypeScript 自动加载的项目数量。 */

    /* 语言和环境 */
    "target": "es2016" /* 设置生成的 JavaScript 的 JavaScript 语言版本并包含兼容的库声明。 */,
    // "lib": [],                                        /* 指定一组打包的库声明文件，描述目标运行时环境。 */
    // "jsx": "preserve",                                /* 指定生成的 JSX 代码。 */
    // "experimentalDecorators": true,                   /* 启用对传统实验性装饰器的实验性支持。 */
    // "emitDecoratorMetadata": true,                    /* 为源文件中的装饰器声明生成设计类型元数据。 */
    // "jsxFactory": "",                                 /* 指定在目标为 React JSX 时使用的 JSX 工厂函数，例如 'React.createElement' 或 'h'。 */
    // "jsxFragmentFactory": "",                         /* 指定在目标为 React JSX 时用于片段的 JSX Fragments 引用，例如 'React.Fragment' 或 'Fragment'。 */
    // "jsxImportSource": "",                            /* 指定在使用 'jsx: react-jsx*' 时导入 JSX 工厂函数的模块规范符号。 */
    // "reactNamespace": "",                             /* 指定为 'createElement' 调用的对象。仅适用于目标为 'react' JSX。 */
    // "noLib": true,                                    /* 禁用包括任何库文件，包括默认的 lib.d.ts。 */
    // "useDefineForClassFields": true,                  /* 生成符合 ECMAScript 标准的类字段语法。 */
    // "moduleDetection": "auto",                        /* 控制如何检测模块格式的 JavaScript 文件。 */

    /* 模块 */
    "module": "commonjs" /* 指定生成的模块代码。 */,
    // "rootDir": "./",                                  /* 指定源文件的根文件夹。 */
    // "moduleResolution": "node10",                     /* 指定 TypeScript 如何从给定的模块规范符号查找文件。 */
    // "baseUrl": "./",                                  /* 指定用于解析非相对模块名的基本目录。 */
    // "paths": {},                                      /* 指定重新映射导入到其他查找位置的条目集合。 */
    // "rootDirs": [],                                   /* 当解析模块时，允许将多个文件夹视为一个文件夹。 */
    // "typeRoots": [],                                  /* 指定多个像 './node_modules/@types' 一样的文件夹。 */
    // "types": [],                                      /* 指定要在源文件中包含但不在引用中引用的类型包名称。 */
    // "allowUmdGlobalAccess": true,                     /* 允许从模块访问 UMD 全局变量。 */
    // "moduleSuffixes": [],                             /* 解析模块时要搜索的文件名后缀列表。 */
    // "allowImportingTsExtensions": true,               /* 允许导入包含 TypeScript 文件扩展名的文件。 需要设置 '--moduleResolution bundler' 以及 '--noEmit' 或 '--emitDeclarationOnly' 参数。 */
    // "resolvePackageJsonExports": true,                /* 解析包导入时使用 package.json 的 'exports' 字段。 */
    // "resolvePackageJsonImports": true,                /* 解析导入时使用 package.json 的 'imports' 字段。 */
    // "customConditions": [],                           /* 解析导入时要设置的自定义条件，以补充特定解析器的默认值。 */
    // "resolveJsonModule": true,                        /* 启用导入 .json 文件。 */
    // "allowArbitraryExtensions": true,                 /* 启用使用任何扩展名导入文件，前提是存在声明文件。 */
    // "noResolve": true,                                /* 禁止 'import'、'require' 或 '<reference>' 扩展 TypeScript 应添加到项目中的文件数。 */

    /* JavaScript 支持 */
    // "allowJs": true,                                  /* 允许将 JavaScript 文件作为程序的一部分。使用 'checkJS' 选项从这些文件中获取错误。 */
    // "checkJs": true,                                  /* 在类型检查的 JavaScript 文件中启用错误报告。 */
    // "maxNodeModuleJsDepth": 1,                        /* 指定从 'node_modules' 检查 JavaScript 文件时使用的最大文件夹深度。仅适用于 'allowJs'。 */

    /* 生成 */
    // "declaration": true,                              /* 从 TypeScript 和 JavaScript 文件生成 .d.ts 文件。 */
    // "declarationMap": true,                           /* 为 .d.ts 文件创建源映射。 */
    // "emitDeclarationOnly": true,                      /* 只输出 .d.ts 文件，而不是 JavaScript 文件。 */
    // "sourceMap": true,                                /* 为生成的 JavaScript 文件创建源映射文件。 */
    // "inlineSourceMap": true,                          /* 在生成的 JavaScript 内部包含源映射文件。 */
    // "outFile": "./",                                  /* 指定一个文件，将所有输出打包为一个 JavaScript 文件。如果 'declaration' 设置为 true，也指定一个打包所有 .d.ts 输出的文件。 */
    // "outDir": "./",                                   /* 指定所有生成文件的输出文件夹。 */
    // "removeComments": true,                           /* 禁用生成注释。 */
    // "noEmit": true,                                   /* 禁用编译输出文件。 */
    // "importHelpers": true,                            /* 允许每个项目从 tslib 导入帮助函数，而不是每个文件都要包含它们。 */
    // "importsNotUsedAsValues": "remove",               /* 指定导入仅用于类型的 emit/检查行为。 */
    // "downlevelIteration": true,                       /* 为迭代生成符合规范但冗长且性能较低的 JavaScript 代码。 */
    // "sourceRoot": "",                                 /* 指定调试器查找源引用代码的根路径。 */
    // "mapRoot": "",                                    /* 指定调试器应在其中查找映射文件的位置，而不是生成的位置。 */
    // "inlineSources": true,                            /* 在生成的 JavaScript 中包含源代码。 */
    // "emitBOM": true,                                  /* 在输出文件开头生成 UTF-8 字节顺序标记 (BOM)。 */
    // "newLine": "crlf",                                /* 设置生成文件的换行字符。 */
    // "stripInternal": true,                            /* 禁用已在其 JSDoc 注释中包含 '@internal' 的声明。 */
    // "noEmitHelpers": true,                            /* 禁用在编译输出中生成自定义帮助函数，如 '__extends'。 */
    // "noEmitOnError": true,                            /* 如果有任何类型检查错误报告，则禁用编译文件的输出。 */
    // "preserveConstEnums": true,                       /* 禁用在生成的代码中擦除 'const enum' 声明。 */
    // "declarationDir": "./",                           /* 指定生成的声明文件的输出目录。 */
    // "preserveValueImports": true,                     /* 保留 JavaScript 输出中未使用的导入值，否则这些值将被删除。 */

    /* 互操作性限制 */
    // "isolatedModules": true,                          /* 确保每个文件都可以安全地进行转译，而不依赖其他导入。 */
    // "verbatimModuleSyntax": true,                     /* 不要转换或删除任何未标记为仅类型的导入或导出，确保以输出文件的格式编写。 */
    // "allowSyntheticDefaultImports": true,             /* 允许在模块没有默认导出时使用 'import x from y'。 */
    "esModuleInterop": true /* 生成额外的 JavaScript 代码，以便支持导入 CommonJS 模块。这启用了 'allowSyntheticDefaultImports'以实现类型兼容性。 */,
    // "preserveSymlinks": true,                         /* 禁止将符号链接解析为其实际路径。这与 Node 中的同名标志相对应。 */
    "forceConsistentCasingInFileNames": true /* 确保导入时的大小写正确。 */,

    /* 类型检查 */
    "strict": true /* 启用所有严格的类型检查选项。 */,
    // "noImplicitAny": true,                            /* 启用对具有隐含 'any' 类型的表达式和声明的错误报告。 */
    // "strictNullChecks": true,                         /* 在类型检查时考虑 'null' 和 'undefined'。 */
    // "strictFunctionTypes": true,                      /* 分配函数时，检查参数和返回值是否是子类型兼容的。 */
    // "strictBindCallApply": true,                      /* 检查 'bind'、'call' 和 'apply' 方法的参数是否与原始函数匹配。 */
    // "strictPropertyInitialization": true,             /* 检查类属性是否在构造函数中声明但未设置。 */
    // "noImplicitThis": true,                           /* 启用当 'this' 具有类型 'any' 时的错误报告。 */
    // "useUnknownInCatchVariables": true,               /* 在 catch 子句的变量中默认使用 'unknown'，而不是 'any'。 */
    // "alwaysStrict": true,                             /* 确保始终生成 'use strict'。 */
    // "noUnusedLocals": true,                           /* 启用在未使用局部变量时的错误报告。 */
    // "noUnusedParameters": true,                       /* 强制错误报告函数参数未使用的错误。 */
    // "exactOptionalPropertyTypes": true,               /* 按照编写时的方式解释可选属性类型，而不是添加 'undefined'。 */
    // "noImplicitReturns": true,                        /* 启用对函数中未显式返回的路径的错误报告。 */
    // "noFallthroughCasesInSwitch": true,               /* 启用对 switch 语句中落空案例的错误报告。 */
    // "noUncheckedIndexedAccess": true,                 /* 当使用索引访问时，向类型添加 'undefined'。 */
    // "noImplicitOverride": true,                       /* 确保派生类中重写的成员带有 override 修饰符。 */
    // "noPropertyAccessFromIndexSignature": true,       /* 对使用索引类型声明的键强制使用索引访问器。 */
    // "allowUnusedLabels": true,                        /* 禁用对未使用标签的错误报告。 */
    // "allowUnreachableCode": true,                     /* 禁用对不可达代码的错误报告。 */

    /* 完备性 */
    // "skipDefaultLibCheck": true,                      /* 跳过对 TypeScript 包含的 .d.ts 文件进行类型检查。 */
    "skipLibCheck": true /* 跳过对所有 .d.ts 文件进行类型检查。 */
  }
}
```
