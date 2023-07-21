# async/await 的使用

async/await 是 ECMAScript 2017 标准中引入的一种用于处理异步操作的语法糖。它基于 Promise 和 Generator，并提供了一种更简洁、更直观的方式来编写异步代码。

## async/await 的基本用法

### 定义一个异步函数，使用 async 关键字修饰函数声明

```js
async function fetchData() {
  // 异步操作的代码
}
```

### 在异步函数内部，使用 await 关键字等待一个 Promise 对象的完成，并将其结果返回

```js
async function fetchData() {
  const result = await someAsyncOperation();
  // 使用 result 处理异步操作的结果
}
```

### 在异步函数内部，使用 try...catch... 语句处理异步操作的错误

```js
async function fetchData() {
  try {
    const result = await someAsyncOperation();
    // 使用 result 处理异步操作的结果
  } catch (error) {
    // 处理异步操作的错误
  }
}
```

## async/await 案例

::: warning 注意事项

- 如果要使用 await ，其所在的函数前要加上 async
- 如果函数用 async "修饰"过，其函数本身就是 Promise ，可以使用.then 方法操作
- 如果要捕获错误，可以用 try catch
  :::

```js
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    // 处理获取到的数据
    return data;
  } catch (error) {
    // 处理错误
    throw new Error("Failed to fetch data");
  }
}

async function main() {
  try {
    const data = await fetchData();
    // 使用获取到的数据
    console.log(data);
  } catch (error) {
    // 处理错误
    console.error(error);
  }
}

main();
```

## async/await 实现原理分析

async/await 的实现原理可以简单概括为以下几个步骤：

- 将异步函数转换为一个返回 Promise 的普通函数：当定义一个异步函数时，JavaScript 引擎会将其转换为一个普通函数，该函数返回一个 Promise 对象。这个 Promise 对象表示异步操作的最终结果。
- 使用 Generator 函数实现暂停和恢复：在异步函数内部，使用 Generator 函数来实现暂停和恢复的功能。Generator 函数是一种特殊的函数，可以通过 yield 关键字将函数的执行暂停，并通过 next() 方法将函数的执行恢复。
- 使用 Promise 对象管理异步操作的状态：在异步函数内部，使用 Promise 对象来管理异步操作的状态。当遇到 await 关键字时，会将后面的表达式转换为一个 Promise 对象，并等待该 Promise 对象的状态变为完成。如果 Promise 对象的状态变为拒绝，会抛出一个错误。
- 通过递归调用实现异步操作的串行执行：在异步函数内部，通过递归调用来实现异步操作的串行执行。当遇到 await 关键字时，会等待前一个异步操作完成后再执行下一个异步操作。

总的来说，async/await 的实现原理是基于 Promise 和 Generator 函数的组合使用。它通过将异步操作转换为 Promise 对象，并使用 Generator 函数来实现暂停和恢复的功能，从而实现了以同步的方式编写异步代码的效果。

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData() {
  try {
    console.log("Fetching data...");
    await delay(2000); // 模拟异步操作
    console.log("Data fetched!");
    return "Data";
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

async function main() {
  try {
    console.log("Start");
    const data = await fetchData();
    console.log("Received:", data);
    console.log("End");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## async/await 与 Promise 的区别

- async/await 是基于 Promise 实现的，它们的行为基本相同
- async/await 使得异步代码看起来像同步代码，这正是它的魔力所在
- async/await 使得异步代码的异常处理变得更加简单
