# React18 严格模式（Strict Mode）

## 什么是 Strict Mode

Strict Mode 是 React 16 中引入的一个开发工具，用于帮助开发者发现潜在的问题并进行调试。它可以在组件树中的任何位置启用，以帮助开发者识别一些不安全的做法、过时的 API 使用、副作用产生的警告等。

Strict Mode 会在开发环境下对组件进行额外的检查，并在控制台中输出相关的警告信息。它可以帮助开发者发现一些潜在的问题，例如不安全的生命周期方法使用、过时的 API 使用、意外的副作用等。Strict Mode 不会在生产环境中产生任何影响，它仅用于开发和调试阶段。

对于 React 而言，它推崇的是渲染结果只与 state 和 props 有关。即 result=f(props, state)。

如果组件每次的 state 和 props 是一样的，就应该返回一样的结果，若返回结果不一样，说明代码中可能存在副作用。

## 启用 Strict Mode

Strict Mode 可以在组件树的任何位置启用，它会影响到该组件以及所有子组件。在类组件中，可以通过在组件的 render 方法中包裹一个 <React.StrictMode> 组件来启用 Strict Mode：

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Strict Mode 的作用

严格模式（Strict Mode）从 React 16.3 版本开始支持，用于标记出应用中潜在的代码问题。

StrictMode 目前有助于：

- 识别不安全的生命周期 {#identifying-unsafe-lifecycles}
- 关于使用过时字符串 ref API 的警告 {#warning-about-legacy-string-ref-api-usage}
- 关于使用废弃的 findDOMNode 方法的警告 {#warning-about-deprecated-finddomnode-usage}
- 检测意外的副作用 {#detecting-unexpected-side-effects}
- 检测过时的 context API {#detecting-legacy-context-api}
- 确保可复用的 state {#ensuring-reusable-state}

## 为什么函数组件会执行两次

在 React 18 的严格模式下，函数组件可能会执行两次的情况通常是由于 React 的工作原理所导致的。React 的底层设计实现了一种称为"双缓冲"的机制，用于在组件更新时进行性能优化。

当一个函数组件被调用时，React 会执行组件函数并生成一个虚拟 DOM 树。然后，React 会将这个虚拟 DOM 树与之前的虚拟 DOM 树进行比较，找出需要更新的部分。这个过程称为"协调"。

在严格模式下，React 会执行两次组件函数。第一次执行是为了收集组件的副作用（例如，读取上下文、订阅事件等），以便在后续的比较中能够正确地处理这些副作用。第二次执行是为了生成最终的虚拟 DOM 树，并与之前的虚拟 DOM 树进行比较。

这种双缓冲机制的设计可以确保在组件更新时，React 能够正确地处理副作用，并且只更新需要更新的部分，从而提高性能。
需要注意的是，函数组件执行两次并不一定意味着组件的渲染也会发生两次。React 会尽可能地优化渲染过程，只更新需要更新的部分。因此，即使函数组件执行了两次，实际的渲染可能只发生一次。

举例如下：

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  console.log("Component rendered"); // 在控制台打印组件渲染的消息

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

在上述代码中，我们使用了 React 的 useState 钩子来创建一个名为 count 的状态变量，并使用 setCount 函数来更新它。每次点击按钮时，计数器的值会增加，并且组件会重新渲染。

在严格模式下，当我们点击按钮时，Counter 组件会执行两次。第一次执行是为了收集副作用，例如订阅事件或读取上下文。第二次执行是为了生成最终的虚拟 DOM 树，并与之前的虚拟 DOM 树进行比较。

在控制台中，我们会看到两次"Component rendered"的消息。这是因为组件在第一次执行时打印了一次，然后在第二次执行时又打印了一次。
这种执行两次的机制确保了 React 能够正确地处理副作用，并且只更新需要更新的部分，从而提高性能。尽管组件执行了两次，但实际的渲染可能只发生一次，只更新了计数器的值。

## 为什么 useEffect 会执行两次

React18 中，StrictMode 增加了对 Strict Effects 的支持。在严格模式下，React 会对新渲染的组件调用两次 effect（mount -> unmount -> mount）。与其他严格模式下的行为一样，React 仅在开发环境中执行此操作。

### 非严格模式

```
* React mounts the component. //挂载组件
  * Layout effects are created. //layout执行
  * Effects are created. //Effects执行
```

### 严格模式

```
* React mounts the component. //挂载组件
    * Layout effects are created. //layout执行
    * Effect effects are created. // Effects执行
// React模拟组件销毁
* React simulates effects being destroyed on a mounted component.
    * Layout effects are destroyed. // layout销毁
    * Effects are destroyed.       // Effects销毁
// React模拟重新挂载
* React simulates effects being re-created on a mounted component.
    * Layout effects are created  // layout重新创建
    * Effect setup code runs     //  Effect重新执行
```

## 关闭严格模式

只需要将 `React.StrictMode` 隐藏即可

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
```
