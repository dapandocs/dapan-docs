# React Hooks 系列 之 useReducer

React Hooks 是 React 16.8 中引入的新特性，它为函数组件带来了许多强大的功能。在这篇文章中，我们将深入探讨 `useReducer` 这一 Hook，并通过多个示例来展示其用法。

## 什么是 `useReducer`？

`useReducer` 是一个用于管理组件状态的 Hook。它与 Redux 中的 reducer 非常相似，但是它是为 React 组件设计的。与 `useState` 相比，`useReducer` 更适合管理复杂的状态逻辑，或者当下一个状态依赖于之前的状态时。

### 基本结构

`useReducer` 接受两个参数：一个 reducer 函数和一个初始状态。它返回一个包含当前状态和一个 dispatch 函数的数组。

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

## 如何定义一个 reducer？

reducer 是一个纯函数，它接受当前的状态和一个 action，然后返回新的状态。

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      // 返回新的状态
    default:
      return state;
  }
}
```

## 示例：计数器

让我们通过一个计数器示例来看看 `useReducer` 的基本用法。

```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

## 使用 action payload

除了 action 类型外，我们还可以传递额外的数据到 action 中。这被称为 action payload。

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

// 使用
dispatch({ type: 'add', payload: 5 });
```

## 使用中间件

与 Redux 类似，我们也可以在 `useReducer` 中使用中间件。例如，我们可以使用中间件来记录每个 action 和新的状态。

```javascript
function logger(reducer) {
  return (state, action) => {
    console.log('dispatching', action);
    const nextState = reducer(state, action);
    console.log('next state', nextState);
    return nextState;
  };
}

const [state, dispatch] = useReducer(logger(reducer), initialState);
```

## 总结

`useReducer` 提供了一种更加结构化和可扩展的方式来管理组件状态。它特别适合于那些有复杂状态逻辑的组件。