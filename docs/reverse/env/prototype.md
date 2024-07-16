
# js补环境系列之剖析：原型、原型对象、实例对象三者互相转化（不讲废话、全是干货）

思考下：js补环境中，什么场景会用到原型、原型对象、实例对象？

举例说明：

在js补环境中，大多数平台会用 `navigator` 中的 `userAgent` 作为 `环境检测点`。你是不是可能会这样补：

```javascript
var window = {};
var navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
}
window.navigator = navigator
```

如果平台检测的是 `window.navigator.userAgent` 或者 `navigator.userAgent`，那么这样补环境是没问题的。

但是，如果平台通过 `Object.getOwnPropertyDescriptor(window.navigator, "userAgent")` 获取对象属性描述符，那么这样补环境就出问题了。

![js补环境系列-原型、原型对象、实例对象](/images/reverse/env/1.png)

可以发现，在浏览器控制台中打印输出为：`undefined` 。

![js补环境系列-原型、原型对象、实例对象](/images/reverse/env/2.png)

可以发现，在 `Node` 环境下打印输出为：
```json
{
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
  writable: true,
  enumerable: true,
  configurable: true
}
```
很明显，浏览器和 `Node` 环境下得到的结果是不一样的。所以得到的加密结果也是不一样的。

那么，如何解决这个问题呢？

相信阅读完这篇文章后，你会有答案的。

为了方便理解，本文不会讲解太多基础概念，让人看的云里雾里的。我直接举例说明：


### 原型

定义一个用户 `原型`，它其实就是一个函数，首写字母大写。

```javascript
function User() {

}
console.log("原型", User)

// 输出结果：[Function: User]
```

### 原型对象

可以通过 `prototype` 获取 `原型` 的 `原型对象`。

首先，我们来看下 `User` 函数的 `原型对象` 是什么。

```javascript
console.log("原型对象", User.prototype)

// 输出结果：{ }
```
得到的是一个空对象，那是因为还没定义任何 `属性` 和 `方法`。

通过给 `User.prototype` 定义 `属性` 和 `方法`后，再次打印：

```javascript
function User() {

}
User.prototype = {
    username: "小鱼神1024",
    password: "12345678",
    login() {
        return `用户名：${this.username}\r\n密码：${this.password}`;
    }
}
console.log("原型对象", User.prototype)

// 输出结果：{ username: '小鱼神1024', password: '12345678', login: [Getter] }
```

### 实例对象

实例对象是通过 `new` 关键字创建的。

```javascript
function User() {

}
User.prototype = {
    username: "小鱼神1024",
    password: "12345678",
    login() {
        return `用户名：${this.username}\r\n密码：${this.password}`;
    }
}
var user = new User();
console.log("实例对象", user.login())

// 输出结果：
// 用户名：小鱼神1024
// 密码：12345678
```

### 原型、原型对象、实例对象三者互相转化

#### 从原型到原型对象

可以通过 `prototype` 获取 `原型` 的 `原型对象`。

```javascript
console.log("原型到原型对象", User.prototype)
```

#### 从原型对象到实例对象

可以通过 `new` 关键字创建 `实例对象`。

```javascript
console.log("原型对象到实例对象", new User())
```
#### 从原型对象到原型
可以通过 `constructor` 获取 `原型对象` 的 `原型`。

```javascript
console.log("原型对象到原型", User.prototype.constructor)
console.log("是否为原型", User.prototype.constructor === User)
```

#### 从原型对象到实例对象

可以先通过 `constructor` 获取 `原型对象` 的 `原型`，再通过 `new` 关键字创建 `实例对象`。

```javascript
console.log("原型对象到实例对象", new User.prototype.constructor())
```

#### 从实例对象到原型对象

先通过 `__proto__` 或者 `Object.getPrototypeOf` 获取 `实例对象` 的 `原型对象`。
```javascript
console.log("实例对象到原型对象1", user.__proto__)
console.log("实例对象到原型对象2", Object.getPrototypeOf(user))
console.log("是否为原型对象", user.__proto__ === User.prototype)
console.log("是否为原型对象", Object.getPrototypeOf(user) === User.prototype)
```

#### 从实例对象到原型
先通过 `__proto__` 或者 `Object.getPrototypeOf` 获取 `实例对象` 的 `原型对象`，再通过 `constructor` 获取 `原型对象` 的 `原型`。

```javascript
console.log("实例对象到原型1", user.__proto__.constructor)
console.log("实例对象到原型2", Object.getPrototypeOf(user).constructor)
console.log("是否为原型", user.__proto__.constructor === User)
console.log("是否为原型", Object.getPrototypeOf(user).constructor === User)
```

### 总结

- 原型：`User`，是一个函数。
- 原型对象：`User.prototype`，通过 `prototype` 得到原型对象。
- 实例对象：`new User()`，通过 `new` 关键字得到实例对象。

### 案例

阅读到这里，文章开头的问题能独立解决了吗?

我们一起分析一下吧！

`navigator` 其实可以理解为 `实例对象`，`Navigator` 可以理解为 `原型`。

`Object.getOwnPropertyDescriptor(window.navigator, "userAgent")` 可以理解为：获取 `window.navigator` 的 `userAgent` 属性的描述符。

在浏览器中，它返回的是 `undefined`，但是通过 `navigator.userAgent` 又可以拿到值。说明 `userAgent` 不是 `window.navigator` 本身的属性，而是 `window.navigator` 的 `原型` 的属性。

所以，我们可以通过修改原型对象 `navigator.__proto__.userAgent` 来修改 `Navigator` 原型的值，从而间接修改 `navigator.userAgent` 的值。

![js补环境系列-原型、原型对象、实例对象](/images/reverse/env/3.png)

这样问题就解决了！

有任何问题欢迎留言讨论！或者加v讨论！

