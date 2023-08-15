# React Hooks 系列 之 useDeferredValue

`useDeferredValue` 钩子的主要目的是在 React 的并发模式中提供更流畅的用户体验，特别是在有高优先级和低优先级更新的情况下。以下是一些常见的使用场景及其示例：

## 用法

### 1. 响应性输入框与慢速列表

当用户在输入框中输入时，我们希望输入框能够立即响应，而不受其他慢速组件的影响。

```javascript
function App() {
  const [text, setText] = useState("hello");
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 });
  return (
    <div className="App">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <MySlowList text={deferredText} />
    </div>
  );
}
```

### 2. 搜索与结果显示

当用户在搜索框中输入查询时，我们希望搜索框能够立即更新，而搜索结果可能需要一些时间来获取和显示。

```javascript
function SearchApp() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query, { timeoutMs: 1000 });
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults query={deferredQuery} />
    </div>
  );
}
```

### 3. 动画与数据加载

当页面上有动画正在播放时，我们可能希望动画能够流畅地播放，而不受数据加载的影响。

```javascript
function AnimationApp() {
  const [data, setData] = useState(null);
  const deferredData = useDeferredValue(data, { timeoutMs: 3000 });
  return (
    <div>
      <LoadingAnimation />
      <DataComponent data={deferredData} />
    </div>
  );
}
```

这些示例展示了如何使用 `useDeferredValue` 钩子在并发模式中优化性能和用户体验。

## useDeferredValue 和防抖（debounce）

`useDeferredValue` 和防抖（debounce）在某些方面有相似之处，特别是它们都涉及到延迟某些操作的执行。但它们的目的和实现方式是不同的。让我们来详细比较一下：

### 1. 目的
   - **useDeferredValue**：它的主要目的是在 React 的并发模式中提供更流畅的用户体验。当有高优先级和低优先级的更新时，它允许低优先级的更新“滞后”于高优先级的更新。
   - **防抖**：防抖的目的是减少函数的执行频率。当连续触发事件时，只有事件触发的间隔超过指定的延迟时间，函数才会执行。

### 2. 使用场景
   - **useDeferredValue**：常用于优化性能，例如当用户在输入框中输入时，我们希望输入框能够立即响应，而其他可能需要时间来处理的操作（如搜索结果的显示）可以稍后执行。
   - **防抖**：常用于减少连续触发的事件的函数调用，例如搜索框的实时搜索、窗口大小调整、滚动事件等。

### 3. 实现方式：
   - **useDeferredValue**：是 React 的并发模式中的一个钩子，它与 React 的渲染机制紧密结合。
   - **防抖**：通常通过 JavaScript 的 `setTimeout` 和 `clearTimeout` 来实现。

**示例**：

考虑一个实时搜索的场景：

- 使用 **防抖**：当用户在搜索框中输入时，我们可能会使用防抖来确保只有在用户停止输入一段时间后才发送搜索请求。
  
  ```javascript
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const handleSearch = debounce((query) => {
    // 发送搜索请求
  }, 300);
  ```

- 使用 **useDeferredValue**：我们可以使输入框立即响应用户输入，而搜索结果的显示可以稍后进行，以提供更流畅的用户体验。

  ```javascript
  function SearchApp() {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    return (
      <div>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <SearchResults query={deferredQuery} />
      </div>
    );
  }
  ```

总之，虽然 `useDeferredValue` 和防抖在某些方面有相似之处，但它们的目的、使用场景和实现方式是不同的。
