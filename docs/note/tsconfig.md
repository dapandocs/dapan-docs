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
var add = function (a, b) { return a + b; };
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
var add = function (a, b) { return a + b; };
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
    "target": "es2016",                                  /* 设置生成的 JavaScript 的 JavaScript 语言版本并包含兼容的库声明。 */
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
    "module": "commonjs",                                /* 指定生成的模块代码。 */
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
    "esModuleInterop": true,                             /* 生成额外的 JavaScript 代码，以便支持导入 CommonJS 模块。这启用了 'allowSyntheticDefaultImports'以实现类型兼容性。 */
    // "preserveSymlinks": true,                         /* 禁止将符号链接解析为其实际路径。这与 Node 中的同名标志相对应。 */
    "forceConsistentCasingInFileNames": true,            /* 确保导入时的大小写正确。 */

    /* 类型检查 */
    "strict": true,                                      /* 启用所有严格的类型检查选项。 */
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
    "skipLibCheck": true                                 /* 跳过对所有 .d.ts 文件进行类型检查。 */
  }
}
```