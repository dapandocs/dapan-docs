# React.createElement 和 jsx() 的区别

## babel 转换

[babel 官网](https://www.babeljs.cn/repl)，通过修改 React Runtime 参数，可以实时看到 React 17 版本之前和之后的 jsx 转换结果。

如果使用vite,可以配置 jsxRuntime

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic", // React.createElement
      // jsxRuntime: 'automatic', // jsx()
    }),
  ],
});
```

- 无子元素

```js
// jsx
const element = <h1 key="1">Hello</h1>;

// React 17版本之前，babel 转换后
const element = React.createElement("h1", { key: "1" }, "Hello");

// React 17版本之后，babel 转换后
import { jsx as _jsx } from "react/jsx-runtime";
_jsx(
  "h1",
  {
    children: "Hello",
  },
  "1"
);
```

- 有子元素

```js
// jsx
const element = (
  <div key="1">
    <span>Hello</span>
    <span>World</span>
  </div>
);

// React 17版本之前，babel 转换后

const element = React.createElement(
  "div",
  { key: "1" },
  React.createElement("span", null, "Hello"),
  React.createElement("span", null, "World")
);

// React 17版本之后，babel 转换后

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
_jsxs(
  "div",
  {
    children: [
      _jsx("span", {
        children: "Hello",
      }),
      _jsx("span", {
        children: "World",
      }),
    ],
  },
  "1"
);
```

两者的区别:

- 导入方式不同：React 17 版本之前的代码中，直接使用 React.createElement 函数，而 React 17 版本之后的代码中，使用了 import 语句导入了 jsx 和 jsxs 函数进行元素的创建。所以，React 17 版本之后的代码中，不需要在代码中手动导入`import React from 'react'`了。

- 参数顺序不同：React 17 版本之前的代码中，createElement 函数的参数顺序是 type, props, ...children，而 React 17 版本之后的代码中，jsx 和 jsxs 函数的参数顺序是 type, props, key。

- 处理子元素方式不同：
  React 17 版本之前的代码中，子元素是作为 createElement 函数的后续参数传递的。例如：

```js
React.createElement("div", null, child1, child2, child3);
```

React 17 版本之后的代码中，多个子元素是作为数组传递给\_jsxs 函数的 children 属性。例如：

```js
_jsxs("div", {
  children: [child1, child2, child3],
});
```

这种改变使得代码更加简洁、可读性更高，并且提供了更好的性能优化和更方便的子元素处理方式。

- 键（key）的位置不同：React 17 版本之前的代码中，键（key）是作为 createElement 函数的第二个参数 props 中传递的，而 React 17 版本之后的代码中，键（key）是作为 jsx 和 jsxs 函数的最后一个参数传递的。

## React.createElement 源码

React.createElement() 主要用于创建 React 元素，包括处理元素的类型、配置、子元素等信息，并返回一个 React 元素对象。

在 React 17 版本之前，会在 React.createElement() 中调用 ReactElement() 方法，创建 React 元素对象，即创建虚拟 DOM 树的节点。

::: code-group

```js [React.createElement]
export function createElement(type, config, children) {
  let propName;

  // 提取保留名称
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 如果config不为空
  if (config != null) {
    // 如果config有有效的ref
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    // 如果config有有效的key
    if (hasValidKey(config)) {
      key = "" + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 剩余的属性被添加到新的props对象
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 子元素可以有多个参数，这些参数被转移到新分配的props对象
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 解析默认的props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  // 返回React元素
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}
```

```js [ReactElement]
function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    // 这个标记用于唯一标识这个对象为React元素
    $$typeof: REACT_ELEMENT_TYPE,

    // 内置属性属于元素本身
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录创建该元素的组件
    _owner: owner,
  };

  return element;
}
```

:::

## jsx() 源码

jsx() 函数用于创建 React 元素，包括处理元素的类型、配置、子元素等信息，并返回一个 React 元素对象，即创建虚拟 dom。

::: code-group

```js [jsx]
export function jsx(type, config, maybeKey) {
  let propName;

  // 保留属性名将被提取
  const props = {};

  let key = null;
  let ref = null;

  // 目前，key可以作为属性传入。这可能会导致潜在问题，如果key也被显式声明（例如：<div {...props} key="Hi" />或<div key="Hi" {...props} />）。
  // 我们希望废弃key的传播，但作为中间步骤，除了<div {...props} key="Hi" />之外，我们将在其他情况下使用jsxDEV，
  // 因为我们目前无法确定key是否被显式声明为undefined。
  if (maybeKey !== undefined) {
    key = '' + maybeKey;
  }

  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // 剩余的属性将被添加到新的props对象中
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // 解析默认props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props,
  );
}

```

```js [ReactElement]
function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    // 这个标记用于唯一标识这个对象为React元素
    $$typeof: REACT_ELEMENT_TYPE,

    // 内置属性属于元素本身
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录创建该元素的组件
    _owner: owner,
  };

  return element;
}
```
:::

从 React.createElement() 和 jsx() 的源码可以看出，最后都是调用了 ReactElement() 方法，创建 React 元素对象。

## ReactJSX 源码

```js
// ReactJSX 源码
import {REACT_FRAGMENT_TYPE} from 'shared/ReactSymbols';
import {
  jsxWithValidationStatic,
  jsxWithValidationDynamic,
  jsxWithValidation,
} from './ReactJSXElementValidator';
import {jsx as jsxProd} from './ReactJSXElement';
const jsx      = __DEV__ ? jsxWithValidationDynamic : jsxProd;
// we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions
const jsxs      = __DEV__ ? jsxWithValidationStatic : jsxProd;
const jsxDEV      = __DEV__ ? jsxWithValidation : undefined;

export {REACT_FRAGMENT_TYPE as Fragment, jsx, jsxs, jsxDEV};
```
从源码分析得出，jsx 和 jsxs 函数都是调用了 ReactJSXElement 中的 jsx 函数。