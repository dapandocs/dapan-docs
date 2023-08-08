# React Hooks 系列 之 useState

在前端开发中，我们经常需要将后端传递的数据展示在页面上。这时，我们可能会想到使用多个变量来存储这些数据，然后在页面上的指定位置显示它们。但问题是，我们应该如何存储这些“状态”变量呢？

我们可以使用 var、const 或 let 来定义变量。然而，当变量的值发生变化时，我们希望页面能够重新渲染，但这些关键字定义的变量无法实现这一点。这时，React 的 useState 就派上了用场。

简而言之，useState 允许我们定义状态变量，并确保当这些状态变量的值发生变化时，页面会重新渲染。

## useState 返回值

```js
const [state, setState] = useState(initialState);
```

useState 返回一个长度为 2 的数组。通常，我们这样定义状态变量：

```js
const [key, setKey] = useState(0);
```

但实际上，我们也可以这样写：

```js
const keyArr = useState(0);
const key = keyArr[0];
const setKey = keyArr[1];
```

这种写法显得有些繁琐，但它有助于我们理解 useState 的返回值类型。

## useState 定义初始值

useState 定义初始值有两种用法：

- 传入一个初始值
- 传入一个函数

### 传入一个初始值

```js
const [key, setKey] = useState(0);
```

### 传入一个函数

```js
const [key, setKey] = useState(() => {
  return 0;
});
```

## useState 更新状态

更新状态有两种用法：

<div ref="useState1" />

```jsx
import { useState } from "react";
import { Card, Button, Space } from "antd";

const Counter = () => {
  const [count, setCount] = useState(0);

  // 方法一
  function handleClick() {
    setCount(count + 1);
  }

  // 方法二
  function handleClickFn() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  return (
    <Card>
      <Space>
        <div>Count: {count}</div>
        <Button onClick={handleClick} type="primary">
          count+1[方法一]
        </Button>
        <Button onClick={handleClickFn} type="primary">
          count+1[方法二]
        </Button>
        <Button onClick={() => setCount(0)} type="primary">
          重置
        </Button>
      </Space>
    </Card>
  );
};

export default Counter;
```

这两种更新状态值的方式都是用于更新 `useState` 中的状态，但它们在某些情况下的行为是不同的。以下是它们之间的主要区别：

### 直接传递新的状态值:

在 `handleClick` 函数中，我们直接传递了一个新的状态值给 `setCount` 函数：

```javascript
function handleClick() {
  setCount(count + 1);
}
```

这种方法是基于当前渲染周期中的 `count` 值。如果 `setCount` 被连续调用多次，React 可能会批量处理这些更新，导致不预期的结果。

### 传递一个函数来更新状态:

在 `handleClickFn` 函数中，我们传递了一个函数给 `setCount`：

```javascript
function handleClickFn() {
  setCount((prevCount) => {
    return prevCount + 1;
  });
}
```

这种方法是基于先前的状态值。这个函数接收先前的状态值作为参数，并返回一个新的状态值。由于它总是基于最新的状态值，所以即使 `setCount` 被连续调用多次，也能得到预期的结果。

**举例说明**:

<div ref="useState2" />

```jsx
import { useState } from "react";
import { Card, Button, Space } from "antd";

const Counter = () => {
  const [count, setCount] = useState(0);

  // 方法一
  function handleMultipleUpdates() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  // 方法二
  function handleMultipleUpdatesFn() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <Card>
      <Space>
        <div>Count: {count}</div>
        <Button onClick={handleMultipleUpdates} type="primary">
          批量更新[方法一]
        </Button>
        <Button onClick={handleMultipleUpdatesFn} type="primary">
          批量更新[方法二]
        </Button>
        <Button onClick={() => setCount(0)} type="primary">
          重置
        </Button>
      </Space>
    </Card>
  );
};

export default Counter;
```

考虑以下代码：

```javascript
function handleMultipleUpdates() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

如果 `count` 的初始值为 0，调用 `handleMultipleUpdates` 函数后，你可能期望 `count` 的值为 3。但实际上，由于三次 `setCount` 调用都基于同一个 `count` 值，结果 `count` 的值仍然为 1。

相反，如果我们使用函数式更新：

```javascript
function handleMultipleUpdatesFn() {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
}
```

这时，每次 `setCount` 调用都基于最新的状态值，所以 `count` 的值会如预期地增加到 3。

**结论**:

- 当状态更新不依赖于先前的状态值时，可以直接传递一个新的状态值。
- 当状态更新依赖于先前的状态值，或者你需要连续多次更新状态时，建议使用函数式更新。

## useState 的惰性初始化

useState 的初始状态参数支持惰性初始化。这意味着你可以传递一个函数作为 useState 的参数，这个函数会在组件的首次渲染时被调用，而不是在每次渲染时都被调用。

惰性初始化的主要用途是为了优化性能。当初始化状态需要进行计算密集型操作或其他昂贵的操作时，你不希望这些操作在每次组件渲染时都被执行。通过使用惰性初始化，你可以确保这些操作只在组件首次渲染时执行一次。

假设你有一个大的 JSON 数据，你只想在组件首次渲染时解析它：

```jsx
const bigJsonData = "{...}"; // 大量的 JSON 数据

function MyComponent() {
  const [data, setData] = useState(() => {
    console.log("Parsing JSON");
    return JSON.parse(bigJsonData);
  });

  // ... 其他代码
}
```

在上述代码中，console.log("Parsing JSON") 只会在 MyComponent 首次渲染时打印一次，即使组件重新渲染多次。这是因为 useState 使用了惰性初始化，所以传递给它的函数只在首次渲染时被调用。

这种特性在处理大量数据或昂贵的计算时特别有用，因为它可以避免不必要的重复操作，从而提高应用的性能。

## useState 是异步函数吗

useState 不是异步函数。

在 React 中，当你调用 setState 或 useState 时，React 并不会立即更新组件。相反，它会将更新标记为“待处理”，并将其添加到一个更新队列中。然后，React 的调度机制会决定何时进行这些更新。

在 React 18 中，引入了新的并发模式，这使得 React 的调度机制变得更加复杂。在并发模式下，React 可以在多个更新之间进行切换，这意味着在某些情况下，useState 的行为可能看起来像是异步的。但实际上，这是由于 React 的调度机制，而不是 useState 本身是异步的。

例如，考虑以下代码：

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

在这个例子中，当你点击按钮时，你可能期望控制台会打印出更新后的计数值。但实际上，它会打印出点击按钮时的计数值。这是因为 setCount 并不会立即更新 count 的值，而是将更新排入队列，等待 React 的调度机制决定何时进行更新。

因此，虽然 useState 可能在某些情况下表现得像是异步的，但这实际上是由于 React 的调度机制，而不是 useState 本身是异步的。

## 调用 useState 后大致执行情况

```mermaid
graph TD
A[调用useState] -->|useState返回一个状态变量和一个更新函数| B[useState返回]
B -->|当你调用更新函数时,React会将新的状态添加到一个更新队列中| C[调用更新函数]
C -->|React的调度机制会决定何时进行更新| D[scheduleUpdateOnFiber]
D -->|确保根节点被正确地调度| E[ensureRootIsScheduled]
E -->|处理同步工作循环| F[workLoopSync]
F -->|开始新的渲染| G[performSyncWorkOnRoot]
G -->|开始处理当前的fiber| H[beginWork]
H -->|处理hooks并返回新的React元素| I[renderWithHooks]
I -->|比较新旧React元素并确定是否需要更新DOM| J[reconcileChildren]
J -->|处理提交前的副作用| K[commitBeforeMutationEffects]
K -->|将新的React元素提交到DOM| L[commitRoot]
L -->|完成更新| M[更新DOM]

```

<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import Basic from '@components/react/useState/Basic'
import MultipleUpdates from '@components/react/useState/MultipleUpdates'

const useState1 = ref(null)
const useState2 = ref(null)
renderReact(Basic, useState1)
renderReact(MultipleUpdates, useState2)
</script>
