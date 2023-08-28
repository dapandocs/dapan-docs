# React Router

React Router v6 是一个用于 React 应用程序的路由库，它允许你通过定义多个“路由”来管理和组织应用程序的不同视图和数据流。这个库提供了一组丰富的 API 和组件，以便你能够轻松地实现复杂的导航逻辑。

### 作用

1. **声明式路由**: React Router v6 使用 JSX 语法来声明路由，这使得代码更加直观和易于维护。

2. **动态路由匹配**: 通过动态路径参数，你可以轻松地捕获 URL 中的变量部分，并在组件中使用它们。

3. **嵌套路由**: 支持路由嵌套，这意味着你可以在一个路由组件内部定义另一个路由组件，以实现更复杂的视图结构。

4. **导航守卫**: 提供了用于处理路由跳转前后逻辑的钩子函数，如 `useEffect`。

5. **代码分割和懒加载**: 与 React 的 `React.lazy()` 和 `Suspense` 配合使用，可以实现路由级别的代码分割和懒加载。

6. **响应式**: 可以与 React 的其他功能（如状态管理和上下文）无缝集成，以实现响应式的路由导航。

7. **链接和重定向**: 提供了 `<Link>` 和 `<Redirect>` 等组件，用于创建导航链接和执行重定向。

8. **查询参数和状态管理**: 可以通过 React Router 的 API 轻松地获取和操作 URL 的查询参数和状态。

9. **服务端渲染支持**: 也支持与服务端渲染（SSR）配合使用，这对于 SEO 和性能优化是非常有用的。

10. **类型安全**: 如果你使用 TypeScript，React Router v6 提供了全面的类型定义，使得代码更加健壮。

11. **迁移方便**: 相对于 v5，v6 在 API 设计上有所简化，但提供了从旧版本迁移的指导，以减少升级的复杂性。

### 安装

React Router v6 是一个独立的库，你可以通过 npm 或 yarn 来安装它：

```bash
# 使用 npm
npm install react-routert react-router-dom

# 使用 yarn
yarn add react-router react-router-dom

# 使用 pnpm
pnpm add react-router react-router-dom
```

### 插件

- [vite-plugin-router](https://www.npmjs.com/package/vite-plugin-router) - 用于 Vite 的路由插件，可以自动生成路由配置文件。

### 文档

- [官方文档](https://reactrouter.com/)
