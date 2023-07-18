# React 如何实现代码分割（Code Splitting）

## 什么是代码分割

代码分割是一种将代码分割成多个小块的方式，然后按需加载或并行加载所需的块的技术。代码分割可以用于减少应用程序的初始加载时间或将代码切割成可按需加载的块，从而减少应用程序所需的总体代码量。

## 为什么要使用代码分割

在大型应用程序中，将所有代码放在一个文件中会导致应用程序加载时间过长，影响用户体验。为了解决这个问题，我们需要将代码分割成小块，然后按需加载或并行加载所需的块。

## 代码分割的方式

### 1. 动态导入 import

import()是 JavaScript 中的一个动态导入语法，它允许在运行时异步加载模块。它返回一个 Promise，该 Promise 在模块加载完成后被解析为一个包含导出内容的模块对象。
使用 import()的语法如下：

```js
import(modulePath)
  .then((module) => {
    // 使用导入的模块
  })
  .catch((error) => {
    // 处理错误
  });
```

在这个语法中，modulePath 是一个字符串，用于指定要加载的模块路径。它可以是相对路径或绝对路径，也可以是一个包名。
当调用 import(modulePath)时，它会返回一个 Promise。这个 Promise 会在模块加载完成后被解析为一个包含导出内容的模块对象。你可以使用.then()方法来处理解析后的模块对象，并在其中使用导入的模块。
如果模块加载失败，Promise 会被拒绝，并触发.catch()方法中的错误处理逻辑。

::: warning 注意事项
import()只能在模块的顶层作用域中使用，不能在函数内部或条件语句中使用。这是因为 import()是静态解析的，它在代码加载时就会执行，而不是在运行时。
:::

另外，import()可以与其他语法结合使用，例如动态模块路径和对象解构。
动态模块路径：

```js
const modulePath = "./myModule";

import(modulePath)
  .then((module) => {
    // 使用导入的模块
  })
  .catch((error) => {
    // 处理错误
  });
```

在这个示例中，modulePath 是一个变量，它的值在运行时确定。这样可以根据需要动态加载不同的模块。

对象解构：

```js
import("./myModule")
  .then(({ myFunction, myVariable }) => {
    // 使用导入的函数和变量
    myFunction();
    console.log(myVariable);
  })
  .catch((error) => {
    // 处理错误
  });
```

### 2. React.lazy

React.lazy 是 React 16.6 版本引入的一个特性，它可以让你以动态的方式进行代码拆分（code splitting）。通过 React.lazy，你可以延迟加载（lazy load）一个组件，只有在需要时才会加载该组件，从而提高应用程序的性能。
React.lazy 的用法如下：

```js
const MyComponent = React.lazy(() => import("./MyComponent"));
```

在这个例子中，MyComponent 是一个需要延迟加载的组件。import('./MyComponent')返回一个 Promise，该 Promise 在模块加载完成后会被解析为一个包含 MyComponent 的模块对象。React.lazy 接受一个函数作为参数，该函数返回一个动态导入的 Promise。当组件需要被渲染时，React.lazy 会自动加载该组件。
在使用 React.lazy 时，你还可以结合使用 Suspense 组件来处理加载状态。Suspense 组件可以包裹在延迟加载的组件周围，以便在组件加载期间显示一个回退（fallback）UI。
下面是一个使用 React.lazy 和 Suspense 的示例：

```js
import React, { Suspense } from "react";

const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

在这个示例中，MyComponent 是一个需要延迟加载的组件。当 MyComponent 被渲染时，Suspense 组件会显示一个加载中的 UI（在这个例子中是一个简单的文本"Loading..."）。一旦 MyComponent 加载完成，它将被渲染到页面上。
使用 React.lazy 和 Suspense 可以帮助你更好地管理和优化你的 React 应用程序的性能，特别是在处理大型代码库时。

::: warning 注意事项
React.lazy 只能用于默认导出的组件。如果你的组件使用了命名导出，你需要使用对象解构语法来导入特定的命名导出。
:::

```js
const { MyComponent, AnotherComponent } = React.lazy(() =>
  import("./MyComponent")
);
```

这样，你就可以按需加载具有命名导出的组件。

### 3.路由（React Router）代码分割

React.lazy 和 Suspense 可以帮助你在组件级别上进行代码分割，但如果你想在路由级别上进行代码分割，你可以使用 React Router 的动态导入语法。

下面是一个结合 React.lazy 和 React Router 的示例：

```js
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="/contact">联系方式</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;

```

在上面的例子中，我们将Home、About和Contact三个组件使用React.lazy进行了按需加载，然后通过React Router的Route组件将它们与特定的路由路径绑定起来。

注意，在使用React.lazy时，您需要将懒加载的组件包裹在Suspense组件中。`div`组件用于在加载过程中展示一个占位符（在上面的例子中是`<div>`加载中...`</div>`），直到实际组件加载完成才会显示实际内容。

总结来说，React.lazy提供了一种简便的方式来实现代码分割，从而提高应用程序的加载性能。您可以使用它来延迟加载组件，无论是单个组件还是整个路由。这对于大型应用程序特别有用，可以减少初始加载时的资源使用量。