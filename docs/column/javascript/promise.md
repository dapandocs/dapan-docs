# Promise 对象

## Promise 是什么

Promise 是为了解决 JavaScript 中的异步编程问题而引入的一种机制。

## Promise 解决了什么问题

在 JavaScript 中，许多操作都是异步的，例如网络请求、文件读写、定时器等。在传统的回调函数方式中，处理多个异步操作会导致代码嵌套层级过深，可读性差，维护困难，被称为“回调地狱”（Callback Hell）。

以下是一个简单的例子来说明回调地狱的问题。假设我们需要按顺序执行三个异步操作：获取用户信息、获取用户订单列表、获取订单详情。每个操作都需要通过回调函数来处理结果。

```js
getUserInfo((userInfo) => {
  getOrderList(userInfo.userId, (orderList) => {
    getOrderDetails(orderList[0].orderId, (orderDetails) => {
      // 处理订单详情
    });
  });
});
```

在这个例子中，每个异步操作都依赖于上一个操作的结果，因此需要将后续操作的代码嵌套在回调函数中。随着操作的增多，嵌套的层级会不断增加，导致代码的缩进增多，可读性变差，而且很容易出现错误。

为了解决这个问题，Promise 提供了一种更优雅、更结构化的方式来处理异步操作。它将异步操作封装成一个 Promise 对象，可以通过链式调用的方式处理异步操作的结果和错误。Promise 对象有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败），可以根据异步操作的结果来改变状态。Promise 对象的状态一旦改变，就不会再变化。

使用 Promise，可以将异步操作的处理逻辑从回调函数中提取出来，使代码更加清晰、易读。同时，Promise 还提供了一些方法，如 .then()、.catch() 和 .finally()，用于处理异步操作的结果和错误，使代码更加可控。

## Promise 的基本用法

Promise 是一个构造函数，可以通过 new 关键字来创建一个 Promise 对象。Promise 构造函数接收一个函数作为参数，该函数的两个参数分别是 resolve 和 reject，它们都是函数类型。resolve 函数用于将 Promise 对象的状态从 pending（进行中）变为 fulfilled（已成功），reject 函数用于将 Promise 对象的状态从 pending（进行中）变为 rejected（已失败）。

### 创建 Promise 对象

- 用法

```js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  // 处理成功，调用 resolve
  // 处理失败，调用 reject
});
```

- 案例

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let count = Math.random() * 10;
    if (count < 5) {
      // 当随机数小于5，promise完成了执行
      resolve(count);
    } else {
      reject("错误，count>5");
    }
    console.log("执行完成");
  }, 1000);
});
```

### 处理 Promise 成功状态的回调函数

- 用法

```js
promise.then((result) => {
  // 处理成功状态的逻辑
});
```

- 案例

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let count = Math.random() * 10;
    if (count < 5) {
      // 当随机数小于5，promise完成了执行
      resolve(count);
    } else {
      reject("错误，count>5");
    }
    console.log("执行完成");
  }, 1000);
});

promise.then((data) => {
  console.log(data);
});
```

有的小伙伴，可能不太理解，promise.then() 里面的回调函数的形参参数（data），代表的具体是谁？其实，在正常执行情况下，promise.then() 里面的回调函数可以理解为是 resolve，因为 resolve 、reject 本身就是一个函数。即：promise.then(resolve)

### 处理 Promise 失败状态的回调函数

- 用法

```js
promise.catch((error) => {
  // 处理失败状态的逻辑
});
```

- 案例

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let count = Math.random() * 10;
    if (count < 5) {
      // 当随机数小于5，promise完成了执行
      resolve(count);
    } else {
      reject("错误，count>5");
    }
    console.log("执行完成");
  }, 1000);
});

promise.catch((error) => {
  console.log(error);
});
```

### 处理 Promise 无论成功或失败状态的回调函数

- 用法

```js
promise.finally(() => {
  // 处理成功或失败状态的逻辑
});
```

- 案例

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let count = Math.random() * 10;
    if (count < 5) {
      // 当随机数小于5，promise完成了执行
      resolve(count);
    } else {
      reject("错误，count>5");
    }
    console.log("执行完成");
  }, 1000);
});

promise.finally(() => {
  console.log("无论成功或失败都会执行");
});
```

### Promise 的链式调用

- 用法

```js
promise
  .then((result) => {
    // 处理成功状态的逻辑
    return anotherPromise; // 返回另一个 Promise 对象
  })
  .then((result) => {
    // 处理另一个 Promise 成功状态的逻辑
  })
  .catch((error) => {
    // 处理任何一个 Promise 失败状态的逻辑
  });
```

- 案例

```js
const promise = new Promise((resolve, reject) => {
  resolve(1);
})
  .then((value) => {
    console.log("value1", value);
    return value * 10;
  })
  .then((value) => {
    console.log("value2", value);
  })
  .then((value) => {
    console.log("value3", value);
  });
```

### 并行执行多个 Promise, 返回所有 Promise 的结果

- 用法

```js
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // 处理所有 Promise 成功状态的逻辑，results 是一个包含所有结果的数组
  })
  .catch((error) => {
    // 处理任何一个 Promise 失败状态的逻辑
  });
```

- 案例

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 1");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 2");
  }, 1500);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 3");
  }, 1000);
});

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // ['Result 1', 'Result 2', 'Result 3']
    // 处理所有 Promise 成功状态的逻辑
  })
  .catch((error) => {
    console.error(error); // 如果任何一个 Promise 失败，会在这里处理错误
    // 处理任何一个 Promise 失败状态的逻辑
  });
```

在这个例子中，我们创建了三个 Promise 对象，每个 Promise 都会在不同的时间间隔后返回一个结果。使用 Promise.all 方法，我们将这三个 Promise 对象传递给它，并在所有 Promise 都成功完成后获取它们的结果。在 .then 方法中，我们可以处理所有 Promise 成功状态的逻辑，并在控制台打印结果数组。如果任何一个 Promise 失败，会立即触发 .catch 方法，并在控制台打印错误信息。

### 并行执行多个 Promise，返回最先执行完的 Promise 的结果

- 用法

```js
Promise.race([promise1, promise2, promise3])
  .then((result) => {
    // 处理第一个 Promise 成功状态的逻辑
  })
  .catch((error) => {
    // 处理第一个 Promise 失败状态的逻辑
  });
```

- 案例

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 1");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 2");
  }, 1500);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Result 3");
  }, 1000);
});

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log(result); // 'Result 3'
    // 处理第一个 Promise 成功状态的逻辑
  })
  .catch((error) => {
    console.error(error); // 如果第一个 Promise 失败，会在这里处理错误
    // 处理第一个 Promise 失败状态的逻辑
  });
```

### Promise.resolve(value)

在实际开发过程中，有时需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用

```js
new Promise((resolve) => resolve("Hello World"));
// 等价于
Promise.resolve("Hello World");
```

静态方法 Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。

### 创建 Promise 异步函数

```js
const getShopDetailById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟后端请求
      let count = Math.random() * 10;
      if (id && count < 5) {
        // 当随机数小于5，假设后端接口正常返回数据
        resolve({ code: 0, msg: "ok" });
      } else {
        reject("接口异常");
      }
    }, 1000);
  });
};

// 假如商品的主键id为：1
getShopDetailById("1").then((data) => {
  console.log(data);
});
```

创建异步函数还有更好的方案，那就是 async/await。继续看下一篇吧。
