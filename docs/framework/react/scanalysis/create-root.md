# React18 createRoot 源码解析

## React18 createRoot 相关源码

github 地址：[createRoot 源码](https://github.com/dapandocs/react-debugger/blob/main/src/react/packages/react-dom/src/client/ReactDOMRoot.js#L183)

createRoot 流程图地址：[createRoot 流程图](https://boardmix.cn/app/share/CAE.CK_wig0gASoQVSQw8kRUnFUgm6GtcOd4HTAGQAE/zc1tIg)

::: code-group

```js [createRoot]
export function createRoot(container, options) {
  // 检查容器是否为有效的 DOM 元素
  if (!isValidContainer(container)) {
    throw new Error("createRoot(...): Target container is not a DOM element.");
  }

  // 在开发环境下，如果容器是 ReactDOM 容器，则发出警告
  warnIfReactDOMContainerInDEV(container);

  // 初始化选项的默认值
  let isStrictMode = false;
  let concurrentUpdatesByDefaultOverride = false;
  let identifierPrefix = "";
  let onRecoverableError = defaultOnRecoverableError;
  let transitionCallbacks = null;

  // 处理传入的选项参数
  if (options !== null && options !== undefined) {
    // 处理严格模式选项
    if (options.unstable_strictMode === true) {
      isStrictMode = true;
    }
    // 处理并发更新选项
    if (
      allowConcurrentByDefault &&
      options.unstable_concurrentUpdatesByDefault === true
    ) {
      concurrentUpdatesByDefaultOverride = true;
    }
    // 处理标识符前缀选项
    if (options.identifierPrefix !== undefined) {
      identifierPrefix = options.identifierPrefix;
    }
    // 处理可恢复错误回调选项
    if (options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }
    // 处理过渡回调选项
    if (options.unstable_transitionCallbacks !== undefined) {
      transitionCallbacks = options.unstable_transitionCallbacks;
    }
  }

  // 创建 React 容器
  const root = createContainer(
    container,
    ConcurrentRoot,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks
  );
  // 将容器标记为根节点
  markContainerAsRoot(root.current, container);
  // 设置当前的 Dispatcher
  Dispatcher.current = ReactDOMClientDispatcher;

  // 获取根容器元素
  const rootContainerElement =
    container.nodeType === COMMENT_NODE ? container.parentNode : container;
  // 监听根容器元素上的所有支持的事件
  listenToAllSupportedEvents(rootContainerElement);

  // 返回一个包含 _internalRoot 属性的新的 ReactDOMRoot 实例
  return new ReactDOMRoot(root);
}
```

```js [createContainer]
export function createContainer(
  // DOM 元素信息
  containerInfo,
  // 组件类型
  tag,
  // 水合(hydration)回调函数
  hydrationCallbacks,
  // 是否启用严格模式
  isStrictMode,
  // 是否默认启用并发更新
  concurrentUpdatesByDefaultOverride,
  // 标识符前缀
  identifierPrefix,
  // 可恢复错误回调函数
  onRecoverableError,
  // 过渡回调函数
  transitionCallbacks
) {
  // 水合标志,默认为 false
  const hydrate = false;

  // 初始子组件,默认为 null
  const initialChildren = null;

  // 调用 createFiberRoot 创建 Fiber 根节点
  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    initialChildren,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks
  );
}
```

```js [createFiberRoot]
export function createFiberRoot(
  containerInfo, // 容器信息
  tag, // 标签
  hydrate, // 是否进行 hydration
  initialChildren, // 初始子元素
  hydrationCallbacks, // hydration 回调
  isStrictMode, // 是否为严格模式
  concurrentUpdatesByDefaultOverride, // 并发更新默认设置
  // TODO: 我们有几个参数在概念上属于主机配置，但是因为它们在运行时传递，所以我们必须通过根构造函数传递它们。也许我们应该将它们全部放在一个名为 DynamicHostConfig 的单一类型中，由渲染器定义。
  identifierPrefix, // 标识符前缀
  onRecoverableError, // 可恢复错误的回调函数
  transitionCallbacks // 过渡回调函数
) {
  // 创建一个新的 FiberRootNode 实例
  const root = new FiberRootNode(
    containerInfo,
    tag,
    hydrate,
    identifierPrefix,
    onRecoverableError
  );

  // 如果启用了 Suspense 回调，将 hydrationCallbacks 设置为 root 的 hydrationCallbacks 属性
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  // 如果启用了 Transition Tracing，将 transitionCallbacks 设置为 root 的 transitionCallbacks 属性
  if (enableTransitionTracing) {
    root.transitionCallbacks = transitionCallbacks;
  }

  // 创建一个未初始化的 Fiber 作为根节点
  const uninitializedFiber = createHostRootFiber(
    tag,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );

  // 将未初始化的 Fiber 设置为 root 的 current 属性
  root.current = uninitializedFiber;

  // 将 root 设置为未初始化的 Fiber 的 stateNode 属性
  uninitializedFiber.stateNode = root;

  // 如果启用了缓存
  if (enableCache) {
    // 创建一个初始缓存对象
    const initialCache = createCache();
    retainCache(initialCache);

    // 将初始缓存对象设置为 root 的 pooledCache 属性
    root.pooledCache = initialCache;
    retainCache(initialCache);

    // 创建初始状态对象
    const initialState = {
      element: initialChildren, // 初始子元素
      isDehydrated: hydrate, // 是否进行 hydration
      cache: initialCache, // 缓存对象
    };

    // 将初始状态对象设置为未初始化的 Fiber 的 memoizedState 属性
    uninitializedFiber.memoizedState = initialState;
  } else {
    // 创建不包含缓存的初始状态对象
    const initialState = {
      element: initialChildren, // 初始子元素
      isDehydrated: hydrate, // 是否进行 hydration
      cache: null, // 尚未启用缓存
    };

    // 将初始状态对象设置为未初始化的 Fiber 的 memoizedState 属性
    uninitializedFiber.memoizedState = initialState;
  }

  // 初始化未初始化的 Fiber 的更新队列
  initializeUpdateQueue(uninitializedFiber);

  // 返回创建的 FiberRootNode 对象
  return root;
}
```

```js [FiberRootNode构造函数]
function FiberRootNode(
  containerInfo, // 容器信息
  tag, // 标签
  hydrate, // 是否为恢复模式
  identifierPrefix, // 标识符前缀
  onRecoverableError // 可恢复错误回调函数
) {
  this.tag = tag; // 标签
  this.containerInfo = containerInfo; // 容器信息
  this.pendingChildren = null; // 待处理的子节点
  this.current = null; // 当前工作单元
  this.pingCache = null; // Ping缓存
  this.finishedWork = null; // 完成的工作单元
  this.timeoutHandle = noTimeout; // 超时句柄
  this.cancelPendingCommit = null; // 取消待处理的提交
  this.context = null; // 上下文
  this.pendingContext = null; // 待处理的上下文
  this.next = null; // 下一个工作单元
  this.callbackNode = null; // 回调节点
  this.callbackPriority = NoLane; // 回调优先级
  this.expirationTimes = createLaneMap(NoTimestamp); // 过期时间

  this.pendingLanes = NoLanes; // 待处理的Lanes
  this.suspendedLanes = NoLanes; // 暂停的Lanes
  this.pingedLanes = NoLanes; // Ping的Lanes
  this.expiredLanes = NoLanes; // 过期的Lanes
  this.finishedLanes = NoLanes; // 完成的Lanes
  this.errorRecoveryDisabledLanes = NoLanes; // 禁用错误恢复的Lanes
  this.shellSuspendCounter = 0; // Shell挂起计数器

  this.entangledLanes = NoLanes; // 关联的Lanes
  this.entanglements = createLaneMap(NoLanes); // 关联的Lanes映射

  this.hiddenUpdates = createLaneMap(null); // 隐藏的更新

  this.identifierPrefix = identifierPrefix; // 标识符前缀
  this.onRecoverableError = onRecoverableError; // 可恢复错误回调函数

  if (enableCache) {
    this.pooledCache = null; // 缓存池
    this.pooledCacheLanes = NoLanes; // 缓存池的Lanes
  }

  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null; // 悬挂回调函数
  }

  this.incompleteTransitions = new Map(); // 不完整的过渡
  if (enableTransitionTracing) {
    this.transitionCallbacks = null; // 过渡回调函数
    const transitionLanesMap = (this.transitionLanes = []); // 过渡的Lanes映射
    for (let i = 0; i < TotalLanes; i++) {
      transitionLanesMap.push(null);
    }
  }

  if (enableProfilerTimer && enableProfilerCommitHooks) {
    this.effectDuration = 0; // 效果持续时间
    this.passiveEffectDuration = 0; // 被动效果持续时间
  }

  if (enableUpdaterTracking) {
    this.memoizedUpdaters = new Set(); // 记忆化的更新器
    const pendingUpdatersLaneMap = (this.pendingUpdatersLaneMap = []); // 待处理的更新器的Lanes映射
    for (let i = 0; i < TotalLanes; i++) {
      pendingUpdatersLaneMap.push(new Set());
    }
  }
}
```

```js [createHostRootFiber]
export function createHostRootFiber(
  tag, // 标记，用于确定根节点的类型
  isStrictMode, // 是否启用严格模式
  concurrentUpdatesByDefaultOverride // 并发更新的默认设置
) {
  let mode; // 模式变量

  if (tag === ConcurrentRoot) {
    // 如果标记为ConcurrentRoot
    mode = ConcurrentMode; // 设置模式为ConcurrentMode

    if (isStrictMode === true || createRootStrictEffectsByDefault) {
      // 如果启用了严格模式或者createRootStrictEffectsByDefault为真
      mode |= StrictLegacyMode | StrictEffectsMode; // 设置模式为StrictLegacyMode和StrictEffectsMode
    }

    if (forceConcurrentByDefaultForTesting) {
      // 仅用于测试，强制默认启用并发模式
      mode |= ConcurrentUpdatesByDefaultMode; // 设置模式为ConcurrentUpdatesByDefaultMode
    } else if (allowConcurrentByDefault && concurrentUpdatesByDefaultOverride) {
      // 仅用于内部实验，如果允许默认启用并发模式并且有并发更新的默认设置
      mode |= ConcurrentUpdatesByDefaultMode; // 设置模式为ConcurrentUpdatesByDefaultMode
    }
  } else {
    mode = NoMode; // 如果标记不是ConcurrentRoot，则模式为NoMode
  }

  if (enableProfilerTimer && isDevToolsPresent) {
    // 如果启用了性能分析计时器并且DevTools存在
    // 总是收集性能分析时间，以便DevTools可以在任何时刻开始捕获时间
    // 而不会有树中的某些节点具有空的基准时间
    mode |= ProfileMode; // 设置模式为ProfileMode
  }

  return createFiber(HostRoot, null, null, mode); // 创建并返回一个Fiber节点
}
```

:::

## React18 createRoot 函数作用

- 检查容器的有效性：函数首先检查传入的容器参数是否为有效的 DOM 元素。如果容器无效，将抛出错误。

- 发出警告和错误：在开发环境下，函数会检查传入的选项参数，并根据选项的不同发出相应的警告或错误。例如，如果使用了过时的 hydrate 选项，函数会发出警告。如果传入的选项是 JSX 元素，函数会发出错误，提醒开发者应该使用 root.render 方法而不是 createRoot。

- 创建 React 容器：函数使用 createContainer 函数创建一个 React 容器。这个容器将用于管理 React 组件的渲染和更新。

- 返回 ReactDOMRoot 实例：函数返回一个包含 \_internalRoot 属性的新的 ReactDOMRoot 实例。这个实例代表了 React 根节点的内部表示，可以通过该实例的方法进行根节点的渲染和卸载操作。

综上所述，createRoot 函数的作用是创建一个 React 根节点，并将其挂载到指定的 DOM 容器中，以便进行 React 组件的渲染和更新。

## React18 createContainer 函数作用

- 创建 React 组件的容器：createContainer 函数会创建一个容器来存放和管理 React 组件。这个容器是组件渲染和更新的基础。

- 配置组件的渲染环境：
  通过接收各种参数,createContainer 可以配置组件的渲染环境,比如:

```

是否启用严格模式(isStrictMode)

默认是否开启并发更新(concurrentUpdatesByDefaultOverride)

标识符前缀

错误恢复回调函数(onRecoverableError)

过渡回调函数
```

- 构建 Fiber 树：最终通过调用 createFiberRoot 来构建 Fiber 树的根节点,Fiber 树是 React 内部实现组件渲染和更新的核心数据结构。

- 返回容器：函数返回一个包含 \_internalRoot 属性的新的 ReactDOMRoot 实例。这个实例代表了 React 根节点的内部表示，可以通过该实例的方法进行根节点的渲染和卸载操作。

## React18 createFiberRoot 函数作用

- 创建 Fiber 树的根节点：createFiberRoot 函数通过实例化 FiberRootNode 类创建了一个 Fiber 树的根节点。这个根节点是整个 React 组件树的起点。

- 设置根节点的属性：根据传入的参数，createFiberRoot 函数设置了根节点的一些属性，如容器信息、标签、是否进行 hydration 等。

- 设置回调函数：如果启用了 Suspense 回调，createFiberRoot 函数将传入的 hydrationCallbacks 设置为根节点的 hydrationCallbacks 属性。如果启用了 Transition Tracing，将传入的 transitionCallbacks 设置为根节点的 transitionCallbacks 属性。

- 创建未初始化的 Fiber：createFiberRoot 函数通过调用 createHostRootFiber 创建了一个未初始化的 Fiber，用于表示根节点。

- 设置根节点的当前 Fiber：将未初始化的 Fiber 设置为根节点的 current 属性，表示当前正在处理的 Fiber。

- 设置未初始化 Fiber 的 stateNode：将根节点设置为未初始化 Fiber 的 stateNode 属性，以建立根节点和 Fiber 之间的关联。

- 初始化缓存（如果启用）：如果启用了缓存，createFiberRoot 函数创建了一个初始的缓存对象，并将其设置为根节点的 pooledCache 属性。

- 初始化更新队列：通过调用 initializeUpdateQueue 函数，createFiberRoot 函数初始化了未初始化 Fiber 的更新队列，用于存储组件的更新操作。

- 返回根节点：最后，createFiberRoot 函数返回创建的 Fiber 树的根节点。

综上所述，createFiberRoot 函数的作用是创建和初始化一个 Fiber 树的根节点，并进行必要的设置和关联。它是 React 内部使用的函数，用于构建组件的 Fiber 树。

## React18 FiberRootNode 构造函数作用

- 标识和容器信息

```

tag：标识 React 根节点的类型，可以是 ConcurrentRoot（并发模式）或 LegacyRoot（传统模式）。

containerInfo：表示 React 应用程序的容器信息，例如 DOM 元素或其他宿主环境的相关信息。
```

- 状态管理

```
pendingChildren：存储待处理的子节点，即将被渲染到容器中的 React 元素。

current：指向当前正在处理的工作单元，即正在进行中的渲染任务。

inishedWork：指向已完成的工作单元，即已经完成的渲染任务。

pingCache：用于缓存 Ping 操作的结果，以便在下一次渲染时进行快速判断。
```

- 调度和优先级

```
pendingLanes：表示待处理的调度优先级（lanes），用于确定哪些任务应该被优先处理。

suspendedLanes：表示暂停的调度优先级（lanes），用于标记已经被暂停的任务。

pingedLanes：表示已经进行了 Ping 操作的调度优先级（lanes），用于标记已经被 Ping 的任务。

expiredLanes：表示已过期的调度优先级（lanes），用于标记已经过期的任务。

finishedLanes：表示已完成的调度优先级（lanes），用于标记已经完成的任务。
```

- 错误处理和恢复

```

errorRecoveryDisabledLanes：表示禁用错误恢复的调度优先级（lanes），用于标记禁用错误恢复的任务。   

onRecoverableError：可恢复错误发生时的回调函数。

```

- 上下文和标识符

```
context：当前的上下文对象。
pendingContext：待处理的上下文对象。
identifierPrefix：标识符的前缀，用于生成唯一的标识符。
```

- 缓存和悬挂

```

pooledCache：用于缓存复用的 Fiber 节点。

pooledCacheLanes：缓存池中的调度优先级（lanes）。

shellSuspendCounter：用于跟踪 Shell 挂起的计数器。
```

- 关联和更新追踪

```

entangledLanes：表示关联的调度优先级（lanes），用于标记关联的任务。

entanglements：关联的调度优先级（lanes）的映射。

hiddenUpdates：用于存储隐藏的更新。
```

- 调试和性能分析

```

_debugRootType：用于调试目的的根类型。

hydrationCallbacks：用于悬挂操作的回调函数。

incompleteTransitions：存储不完整的过渡。

transitionCallbacks：过渡的回调函数。

effectDuration：记录效果（effect）的持续时间。

passiveEffectDuration：记录被动效果（passive effect）的持续时间。

memoizedUpdaters：存储记忆化的更新器。

pendingUpdatersLaneMap：待处理的更新器的调度优先级（lanes）的映射。
```

## React18 createHostRootFiber 函数作用

createHostRootFiber 函数的参数包括标记（用于确定根节点的类型）、是否启用严格模式以及并发更新的默认设置。根据这些参数的不同，函数会设置相应的模式，并将这些模式应用于创建的 HostRoot 节点。
