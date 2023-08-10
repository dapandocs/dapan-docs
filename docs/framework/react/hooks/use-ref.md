# React Hooks 系列 之 useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传递的参数（initialValue）。返回的对象将在组件的整个生命周期内保持不变。

## 返回一个持久的对象

<div ref="useRef1" />

::: details demo 代码
<<< @/components/react/hooks/useRef/Timer.jsx
:::

上述的 demo 展示了 `useRef` 的以下特性：

1. **持久性**：`useRef` 返回的 ref 对象在组件的整个生命周期内都是持久的。

2. **不会引起组件重新渲染**：与 `useState` 不同，修改 `useRef` 的 `.current` 属性不会引起组件重新渲染。在 demo 中，即使我们增加了 `count.current` 的值，组件也没有重新渲染。

## 与 DOM 交互

<div ref="useRef2" />

::: details demo 代码
<<< @/components/react/hooks/useRef/TextInputWithFocus.jsx
:::

这个 demo 主要展示了 useRef 如何在 React 中用于直接与 DOM 元素交互。

## 保存上一次的值

<div ref="useRef3" />

::: details demo 代码
<<< @/components/react/hooks/useRef/PreviousValueComponent.jsx
:::

这个 demo 主要展示了 useRef 如何在 React 中用于跟踪上一次的值。

<script setup>
import { ref } from 'vue'
import renderReact from '@components/react/renderReact'
import Timer from '@components/react/hooks/useRef/Timer'
import TextInputWithFocus from '@components/react/hooks/useRef/TextInputWithFocus'
import PreviousValueComponent from '@components/react/hooks/useRef/PreviousValueComponent'
const useRef1 = ref(null)
const useRef2 = ref(null)
const useRef3 = ref(null)
renderReact(Timer, useRef1)
renderReact(TextInputWithFocus, useRef2)
renderReact(PreviousValueComponent, useRef3)
</script>
