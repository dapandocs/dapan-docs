# forwardRef 有什么作用?

在 React 的生态系统中，forwardRef 是一个强大的工具，尤其是当你需要在组件之间传递 ref 时。在本文中，我们将深入探讨 forwardRef 的各种用法。

## 什么是 forwardRef?

forwardRef 是一个函数，它接收一个渲染函数作为参数。这个渲染函数接收 props 和 ref 作为参数，并返回一个 React 节点。

```js
React.forwardRef((props, ref) => {
  return <div ref={ref} />;
});
```

## 为什么要使用 forwardRef?

在 React 中，ref 是一个特殊的属性，它可以用来引用组件或 DOM 元素。当你在组件中使用 ref 时，你可以通过 ref.current 来访问组件或 DOM 元素。

## 用法

### 1. 传递 ref 给 DOM 元素

forwardRef 的主要功能是将引用 (ref) 从父组件转发到子组件。这对于访问子组件的 DOM 元素非常有用。

<div ref="forwardRef1" />

::: details demo 代码
<<< @/components/react/hooks/forwardRef/ForwardRefDom.jsx
:::

在这个例子中，FancyButton 组件使用 forwardRef 来接收一个 ref 并将其传递给内部的 Button 组件。由于 ref 已经被转发到 Button 组件，我们可以直接通过 ref.current 访问到 DOM 元素。在 App 组件中，当按钮被点击时，我们使用 ref.current 来更改按钮的字体颜色和背景色。

### 2. 在高阶组件中使用 forwardRef

forwardRef 也可以在高阶组件中使用。在这种情况下，ref 参数不会作为 props 传递给组件，而是作为第二个参数传递给渲染函数。

<div ref="forwardRef2" />

::: details demo 代码
<<< @/components/react/hooks/forwardRef/WithBorderApp.jsx
:::

在这个例子中，我们创建了一个 withBorder 高阶组件，它为传入的组件添加了一个蓝色的边框。在 App 组件中，我们创建了一个 ref 并将其传递给 ButtonWithBorder。然后，我们可以使用这个 ref 来访问 SimpleButton 的 DOM 元素，并调用其 innerText 更改按钮的文本。

### 3. 与 useImperativeHandle 配合使用

forwardRef 还可以与 useImperativeHandle 配合使用。useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。

<div ref="forwardRef3" />

::: details demo 代码
<<< @/components/react/hooks/forwardRef/ForwardedInput.jsx
:::

## 总结
forwardRef 提供了一种在 React 组件中传递 ref 的强大方法。通过上述示例，我们可以看到它在各种场景中的应用，从基本的函数组件到高阶组件，再到与其他 React Hooks 的结合使用。掌握 forwardRef 可以帮助你更好地管理组件间的交互和引用，从而提高应用的灵活性和可维护性。

<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import ForwardRefDom from '@components/react/hooks/forwardRef/ForwardRefDom'
import WithBorderApp from '@components/react/hooks/forwardRef/WithBorderApp'
import ForwardedInput from '@components/react/hooks/forwardRef/ForwardedInput'

const forwardRef1 = ref(null)
const forwardRef2 = ref(null)
const forwardRef3 = ref(null)
renderReact(ForwardRefDom, forwardRef1)
renderReact(WithBorderApp, forwardRef2)
renderReact(ForwardedInput, forwardRef3)
</script>
