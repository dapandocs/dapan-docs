# VSCode Debugger 用法

## 启动调试

![vscode-debugger](/images/react/7.png)

## 案例代码

```js
function mergeString(a, b) {
  console.log("a", a);
  console.log("b", b);
  return `${a} ${b}`;
}

console.log(mergeString("Hello", "World"));

console.log(mergeString("你好", "世界"));

console.log(mergeString("大", "前端"));
```

## 功能解释

代码前面的红点表示断点，点击红点可以取消断点。

::: info 注意
每次开始前，要先点一下continue（继续）键，否则会一直停在第一个断点处。
:::

### continue（继续）

启动调试后，点击 continue，代码会一直执行到下一个断点处。如果没有断点，代码会一直执行到结束。
如果当前行是函数，且函数里面有断点，会执行到函数里面的断点处。

![vscode-debugger-1](/images/react/8.png)

这个执行顺序是：第7行 -> 第3行 -> 第9行 -> 第3行 -> 第11行  -> 第3行 -> 结束

![vscode-debugger-2](/images/react/9.png)

这个执行顺序是：第7行 -> 第9行 -> 第11行 -> 结束

::: warning 注意
continue（继续）键会忽略灰色的断点（代码里的圆型灰点），只会执行红色的断点。
:::

### step over（单步跳过）

启动调试后，点击 step over，代码会执行到下一行。如果下一行是函数，会直接跳过函数，执行下一行。
如果当前行是函数，且函数里面有断点，会执行到函数里面的断点处。

![vscode-debugger-1](/images/react/8.png)

这个执行顺序是：第7行 -> 第3行 -> 第4行 -> 第7行 -> 第9行 -> 第3行 -> 第4行  -> 第9行 -> 第11行 -> 第3行 -> 第4行 -> 第11行 -> 结束

![vscode-debugger-1](/images/react/9.png)

这个执行顺序是：第7行 -> 第9行 -> 第11行 -> 结束

::: warning 注意
step over（单步跳过）键会忽略灰色的断点（代码里的圆型灰点），只会执行红色的断点。
:::

### step in（单步调试）

![vscode-debugger-1](/images/react/9.png)

如果当前执行到第7行，点击 step in（单步调试），会进入 mergeString 函数内部，step over（单步跳过）执行函数内部的代码。

::: warning 注意
step in（单步调试）键会执行灰色的断点（代码里的圆型灰点）。
:::

### step out（单步跳出）

![vscode-debugger-1](/images/react/9.png)

作用是跳出当前函数。如果当前行不在函数内，continue（继续）执行到下一个断点。

### restart（重启）

作用是重启调试。

### stop（停止）

作用是停止调试。



