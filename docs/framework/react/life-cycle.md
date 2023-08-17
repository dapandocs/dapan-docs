# React 生命周期

## React 生命周期流程图

![React 常用生命周期](/images/react/10.png)

![React 不常用生命周期](/images/react/11.png)

[React 生命周期线上地址](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## React.Component 构造函数

#### 1. 目的

构造函数在 React 组件的生命周期中非常早期被调用，它发生在组件实例被创建并插入到 DOM 之前。这使得它成为初始化组件的本地状态和绑定事件处理函数的理想位置。

#### 2. 使用

如果您的组件不需要初始化状态或绑定事件处理函数，那么您不需要显式地定义一个构造函数。但是，如果您确实这样做了，那么在构造函数的第一行调用`super(props)`是必要的。

#### 3. 为什么要调用 `super(props)`？

在 JavaScript 类中，子类的构造函数必须在使用`this`之前调用`super`。在 React 组件中，`super`引用的是`React.Component`的构造函数。调用`super(props)`确保您可以在构造函数中使用`this.props`。

#### 4. 初始化状态

构造函数是为`this.state`设置初始值的地方。这是通过直接为`this.state`分配一个对象来完成的。例如：

```javascript
this.state = { counter: 0 };
```

请注意，您不应该在构造函数中调用`setState()`。

#### 5. 绑定事件处理函数

为了确保事件处理函数中的`this`引用的是组件实例，您需要在构造函数中绑定它。例如：

```javascript
this.handleClick = this.handleClick.bind(this);
```

#### 6. 避免的做法

- **不要在构造函数中调用`setState()`**：这是因为`this.state`可以直接在构造函数中进行初始化。
- **避免引入副作用或订阅**：构造函数不是执行网络请求、设置订阅或手动更改 DOM 的地方。这些都应该在`componentDidMount()`或其他生命周期方法中进行。
- **避免将 props 直接复制到 state**：这是因为当 props 更改时，state 不会自动更新，可能导致组件的渲染状态与 props 不同步。

#### 7. 示例代码

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 事件处理逻辑
  }

  // ...其他方法和渲染逻辑
}
```

#### 8. 不使用构造函数的替代方法

`constructor`在 React 组件中是可以省略的。但是，是否省略取决于您的组件需要执行哪些初始化操作。以下是一些情况说明：

##### 不需要初始化状态，也不需要绑定方法

如果您的组件不需要初始化本地状态，并且您也不需要绑定任何方法到组件实例，那么您可以完全省略`constructor`。

##### 使用类属性

在现代的 React 版本中，您可以使用类属性来初始化状态，而不需要显式的`constructor`。例如：

```javascript
class MyComponent extends React.Component {
  state = { counter: 0 };
  // ...其他代码
}
```

##### 使用箭头函数自动绑定方法

如果您使用箭头函数定义方法，那么这些方法会自动绑定到当前实例，因此不需要在`constructor`中进行绑定。例如：

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
    // 事件处理逻辑
  };
  // ...其他代码
}
```

综上所述，如果您使用类属性和箭头函数，那么在许多情况下，您都可以省略`constructor`。但是，如果您需要执行更复杂的初始化逻辑，或者需要在创建组件实例时执行某些操作，那么仍然需要`constructor`。

## getDerivedStateFromProps

在 React 的世界里，组件的属性（props）和状态（state）是核心概念。有时，我们需要根据属性的变化来更新状态。这就是`getDerivedStateFromProps`方法的舞台。

### 什么是`getDerivedStateFromProps`？

`getDerivedStateFromProps`是 React 组件的一个静态生命周期方法。它允许我们在组件接收新的属性时更新状态。这个方法在组件的挂载和更新阶段都会被调用。

### 执行时机

#### 1. 挂载阶段（Mounting）

当组件实例被创建并插入到 DOM 中时，`getDerivedStateFromProps`会在`render`方法之前被调用。这允许您根据组件的初始属性来设置组件的初始状态。

#### 2. 更新阶段（Updating）

当组件接收到新的属性或状态更改时，`getDerivedStateFromProps`也会被调用。具体来说，它会在以下情况下被调用：

- 当组件接收到新的属性时（即父组件重新渲染）。
- 当您调用`setState`方法更新组件的状态时。
- 当您调用`forceUpdate`方法强制重新渲染组件时。

在这些情况下，`getDerivedStateFromProps`都会在`render`方法之前被调用，允许您根据新的属性或状态来更新组件的状态。

### 参数解释

- **nextProps**：组件即将接收的新属性。
- **prevState**：组件当前的状态。

### 返回值

- 返回一个对象来更新状态。
- 如果不需要更新状态，则返回 null。

### 应用场景

1. **属性派生状态**：当组件的内部状态需要从属性派生时。
   假设您有一个主题组件，它的颜色可以通过属性来控制，但也可以由用户在组件内部更改。

```jsx
class ThemeComponent extends React.Component {
  state = { color: this.props.color };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  render() {
    return <div style={{ backgroundColor: this.state.color }}>主题颜色</div>;
  }
}
```

2. **条件渲染**：根据属性控制组件的渲染。
   假设一个权限控制组件可能会根据传入的权限级别显示或隐藏某些功能。

```jsx
class PermissionComponent extends React.Component {
  state = { isAdmin: this.props.isAdmin };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAdmin !== prevState.isAdmin) {
      return { isAdmin: nextProps.isAdmin };
    }
    return null;
  }

  render() {
    return this.state.isAdmin ? <AdminFeatures /> : <UserFeatures />;
  }
}
```

### 注意事项

- getDerivedStateFromProps 是一个静态方法，因此它不能访问组件实例的 this。这意味着您不能在此方法中调用组件的实例方法或访问组件的实例属性。
- 由于 getDerivedStateFromProps 在多个阶段都可能被调用，因此您可能需要添加额外的逻辑来确定何时应该更新状态。
- getDerivedStateFromProps 应该是一个纯函数，不要在其中执行有副作用的操作，如网络请求或订阅事件。

## shouldComponentUpdate

### 1. 基本用法

`shouldComponentUpdate` 是一个可选的生命周期方法，用于在接收新的 props 或 state 时确定组件是否应该重新渲染。它返回一个布尔值，告诉 React 是否应继续更新过程。

```javascript
shouldComponentUpdate(nextProps, nextState) {
  // 逻辑判断
  return true 或 false;
}
```

### 2. 性能优化

#### a. 避免不必要的渲染

如果您的组件经常接收相同的 props 或 state，但不需要每次都重新渲染，那么 `shouldComponentUpdate` 就派上用场了。

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.value !== this.props.value;
}
```

#### b. 自定义比较逻辑

您可以根据需要编写自定义的比较逻辑，只有在满足特定条件时才重新渲染。

### 3. 与 PureComponent 的关系

`React.PureComponent` 通过浅比较 props 和 state 来自动实现 `shouldComponentUpdate`。如果您的组件继承自 `PureComponent`，则不需要手动实现此方法。

### 4. 执行时机

#### 1. 接收新的 Props 或 State

当组件接收到新的 props 或 state 时，`shouldComponentUpdate` 将被调用。这是一个决策点，让您可以判断是否真的需要重新渲染组件。

#### 2. 父组件重新渲染

当父组件重新渲染时，子组件的 `shouldComponentUpdate` 也会被调用。这样，您可以控制子组件是否随父组件一起重新渲染。

#### 3. 使用 `forceUpdate`

如果您调用了组件的 `forceUpdate` 方法，`shouldComponentUpdate` 将被跳过，组件将强制重新渲染。

#### 4. 初始化渲染

值得注意的是，`shouldComponentUpdate` 不会在组件的初始化渲染阶段被调用。它仅在组件的更新阶段起作用。

### 5. 注意事项和最佳实践

#### a. 避免副作用

`shouldComponentUpdate` 只应用于渲染决策，不应执行任何副作用，如网络请求或修改全局变量。

#### b. 避免深度比较

深度比较可能会消耗大量性能，反而降低应用的响应速度。

#### c. 不要在此方法中调用 `setState`

这会导致组件重新渲染，从而引发无限循环。

## getSnapshotBeforeUpdate

### 1. 什么是 `getSnapshotBeforeUpdate`？

`getSnapshotBeforeUpdate` 是 React 的一个生命周期方法，用于在 DOM 更新之前捕获一些信息。这个方法在最新的渲染输出被提交到 DOM 之前被调用，允许您在更新发生之前捕获一些关于 DOM 的信息。

### 2. 方法签名

```javascript
getSnapshotBeforeUpdate(prevProps, prevState);
```

- `prevProps`: 更新前的属性。
- `prevState`: 更新前的状态。

### 3. 返回值

这个方法应返回一个值，该值将作为 `componentDidUpdate` 的第三个参数。如果您不需要捕获任何信息，可以返回 `null`。

### 4. 使用场景

#### a. 捕获滚动位置

如果您的组件涉及到滚动，并且在更新后需要保持滚动位置，可以使用以下代码：

```javascript
getSnapshotBeforeUpdate() {
  return this.containerElement.scrollTop;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  this.containerElement.scrollTop = snapshot;
}
```

#### b. 捕获表单状态

如果您的组件包含表单，并且您想在更新之前捕获表单的状态，可以这样做：

```javascript
getSnapshotBeforeUpdate() {
  return this.formElement.values;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // 使用捕获的表单状态
}
```

#### c. 比较属性和状态

您还可以使用这个方法来比较前后属性和状态的变化，从而执行一些特定的逻辑。

### 5. 注意事项

- `getSnapshotBeforeUpdate` 必须与 `componentDidUpdate` 配合使用。
- 不要在这个方法中触发状态更新，否则会导致无限循环。

## componentDidMount

在 React 18 中，`componentDidMount` 仍然是一个重要的生命周期方法，但随着 React Hooks 的流行，许多开发人员可能会转向使用 `useEffect` 钩子来代替。不过，对于那些仍在使用类组件的项目，`componentDidMount` 仍然是一个强大的工具。

#### 1. 数据获取

`componentDidMount` 是一个理想的地方来执行异步操作，例如从 API 获取数据。这样做可以确保组件已经挂载到 DOM 中，因此您可以安全地更新状态。

```javascript
componentDidMount() {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
```

#### 2. 添加事件监听器

如果您需要在组件挂载后添加事件监听器，`componentDidMount` 是一个完美的地方。

```javascript
componentDidMount() {
  window.addEventListener('resize', this.handleResize);
}
```

#### 3. 操作 DOM

如果您需要直接操作 DOM，`componentDidMount` 可以确保 DOM 已经准备好。

```javascript
componentDidMount() {
  this.myInput.focus();
}
```

#### 4. 执行时机

`componentDidMount` 是一个生命周期方法，它会在组件第一次渲染到 DOM 之后立即调用。这意味着它是在组件的第一次渲染完成后执行的，但在任何子组件的 `componentDidMount` 之前执行。

下面是执行时机的详细解释：

- **组件挂载完成**：当组件被插入到 DOM 中后，`componentDidMount` 将被调用。此时，您可以安全地执行涉及 DOM 的操作。

- **仅执行一次**：与其他生命周期方法不同，`componentDidMount` 只在组件挂载后执行一次。如果您需要在组件更新后执行某些操作，您可能需要使用 `componentDidUpdate`。

- **在子组件的 `componentDidMount` 之前执行**：如果有子组件，父组件的 `componentDidMount` 将在任何子组件的 `componentDidMount` 之前执行。

- **在 `render` 方法之后执行**：`componentDidMount` 是在 `render` 方法之后执行的，所以在 `componentDidMount` 中调用 `setState` 将触发额外的渲染，但这不会让用户看到中间状态。

哎呀，你完全对了！我竟然忘了提到 `componentDidUpdate` 的执行时机，这可是了解它的关键部分。让我补充一下：

## componentDidUpdate 执行时机

#### 1. **组件更新后**

`componentDidUpdate` 的名字已经暗示了它的执行时机：组件更新后。但是，什么会导致组件更新呢？

- **属性变化**：当组件接收到新的属性时，它会触发更新。
- **状态变化**：当组件的状态改变时，它也会触发更新。
- **父组件重新渲染**：即使属性和状态没有改变，父组件的重新渲染也会导致子组件更新。

#### 2. **不会在初始渲染时执行**

当组件首次挂载时，`componentDidUpdate` 是不会被调用的。如果你需要在首次渲染后执行某些操作，可以使用 `componentDidMount` 方法。

#### 3. **在 `render` 方法之后**

`componentDidUpdate` 是在 `render` 方法之后执行的，所以你可以确信此时 DOM 已经更新。这使得 `componentDidUpdate` 成为执行与 DOM 相关操作的理想时机。

#### 4. **在 `getSnapshotBeforeUpdate` 之后**

如果你使用了 `getSnapshotBeforeUpdate` 方法，那么 `componentDidUpdate` 会在它之后执行。这样你可以在 `getSnapshotBeforeUpdate` 中捕获一些信息，并在 `componentDidUpdate` 中使用。

#### 5. **基础用法**

`componentDidUpdate` 的基础用法非常简单。它接收三个参数：

```javascript
componentDidUpdate(prevProps, prevState, snapshot) {
  // ...
}
```

- **prevProps**：前一个属性对象。
- **prevState**：前一个状态对象。
- **snapshot**：从 `getSnapshotBeforeUpdate` 方法返回的值。

## componentWillUnmount

### 1. 什么是 `componentWillUnmount`？

在 React 中，当一个组件不再需要时，`componentWillUnmount` 方法会被调用。这是一个清理组件相关资源的好时机。

### 2. `componentWillUnmount` 的用法

#### 清理定时器

如果组件中设置了定时器，当组件卸载时，定时器应该被清除，以避免不必要的错误和资源浪费。

```javascript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

#### 取消网络请求

如果组件中发起了网络请求，当组件卸载时，应该取消未完成的请求，以避免不必要的警告和潜在的错误。

```javascript
componentWillUnmount() {
  this.source.cancel('组件卸载，取消请求');
}
```

#### 移除事件监听器

如果组件中添加了事件监听器，当组件卸载时，应该移除这些监听器，以避免内存泄漏。

```javascript
componentWillUnmount() {
  window.removeEventListener('resize', this.handleResize);
}
```
