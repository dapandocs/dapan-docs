# React JSX 基础语法

## 1、什么是 JSX

JSX 是 JavaScript 的一种语法扩展。可以组装 UI 界面，同时可以和 JavaScript 语法配合使用。

## 2、为什么使用 JSX

- 使用熟悉的语法定义 HTML 元素，提供更加语义化的标签，使用 JSX 编写模板更简单快速
- 更加直观：JSX 让组件更加简单、明了、直观
- 抽象了 React 元素的创建过程，使得编写组件变得更加简单

举例说明如下：

```javascript
// react17版本之前
const children1 = React.createElement("li", null, "第一个组件内容！");
const children2 = React.createElement("li", null, "第二个组件内容！");
const root = React.createElement(
  "ul",
  { className: "list" },
  children1,
  children2
);

// react17版本之后
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const root = _jsxs("ul", {
  className: "list",
  children: [
    _jsx("li", {
      children: "Hello",
    }),
    _jsx("li", {
      children: "World",
    }),
  ],
});
```

JSX 等价如下：

```jsx
const root = (
  <ul className="list">
    <li>Hello</li>
    <li>World</li>
  </ul>
);
```

显然 JSX 写法更便于页面的编写与维护，且简单、直观。

## 3、JSX 书写规范

- JSX 的最外层只能有一个根元素，可以使用 div 、span 等标签
- 正常情况下，我可以在最外层包裹一个小括号（），方便我们更好的格式化代码
- JSX 中的标签可以是单标签，也可以是双标签；注意：如果是单标签，必须以/>结尾
- 在使用变量时，我们可以将其放在一个大括号中，大括号内可以放置任何有效的 JavaScript 表达式

代码示例如下：

```javascript
const root = (
  <div className="list">
    <div>第一个组件内容！</div>
    <img src="xxx.jpg" />
    {1 === 1 && <div>第二个组件内容！</div>}
  </div>
);
```

## 4、JSX 注释

通常有以下三种注释

```jsx
<ul className="list">
  {/* 1、单行注释 */}
  <li>第一个组件内容！</li> // 2、行尾注释
  <li>第二个组件内容！</li>
  {/*
        3、多行注释
        1
        2
        3
        */}
</ul>
```

## 5、JSX 嵌入变量

变量在 JSX 使用，需要用大括号 { } 包裹；注意：使用的变量需要提前定义。如下。

```jsx
const MyComponent = () => {
  const text = "Hello World！";
  return <div>{text}</div>;
};
export default MyComponent;
```

## 6、JSX 嵌入表达式

- 运算符表达式
- 三元表达式
- 函数调用

```jsx
const MyComponent = () => {
  const isFinish = true;

  const calc = () => {
    const a = 1;
    const b = 2;
    return a + b;
  };

  return (
    <div>
      {/*1.运算符表达式*/}
      <span>2 + 3 的和为：{2 + 3}</span>
      {/*2.三元表达式*/}
      <span>家庭作业是否完成：{isFinish ? "是" : "否"}</span>
      {/*3.进行函数调用*/}
      <span>{calc()}</span>
    </div>
  );
};
export default MyComponent;
```

## 7、JSX 绑定属性

注意：在给元素绑定 style 时，外层的大括号是表示可传入变量或者表达式。而内部的大括号是一个对象，它里面是键值对，表示元素的样式属性及属性值。另外，当属性是由多个单词组成的时候，需要用驼峰命名法来表示，例如：fontSize

```jsx
const MyComponent = () => {
  const title = "我是标题的全部内容！";
  const url = "https://www.baidu.com";
  const className = "span";

  return (
    <div>
      {/* 1、绑定普通属性 */}
      <h2 title={title}>我是标题...</h2>
      <a href={url}>百度一下</a>
      {/* 2.绑定class */}
      <span className={className}>我是span标签</span>
      <span className={["tag", "span"].join(" ")}>我是span标签2</span>
      {/* 3.绑定style */}
      <span style={{ color: "red", fontSize: 16 }}>我的字体颜色是红色</span>
    </div>
  );
};
export default MyComponent;
```

## 8、JSX 绑定事件

可以看出 React 元素的事件处理和 DOM 元素的很相似，但存在一些语法上的差异：

- React 的事件采用驼峰式命名，而不是纯小写的方式
- 使用 JSX 语法时，需要传入一个函数作为事件处理函数，而不是一个字符串
- 使用函数时不能加括号，不然会直接执行
- 如果函数过于简单，可在 JSX 中直接编写函数内容

```jsx
const MyComponent = () => {
  const onClick = () => {
    window.alert("您点击了按钮1");
  };

  return (
    <div>
      <button onClick={onClick}>按钮1</button>
      <button
        onClick={() => {
          window.alert("您点击了按钮2");
        }}
      >
        按钮2
      </button>
    </div>
  );
};
export default MyComponent;
```

## 9、JSX 条件渲染

常见的条件渲染的方式有以下三种：

- 方式一：条件判断语句，适合逻辑较多的情况
- 方式二：三元运算符，适合逻辑比较简单
- 方式三：与运算符&&，如果条件成立，渲染&&后面的组件；如果条件不成立，则都不渲染

```jsx
const MyComponent = () => {
  const renderTitle = (key) => {
    if (key > 1) {
      return <span>我是标题1</span>;
    }
    return <span>我是标题2</span>;
  };

  return (
    <div>
      {renderTitle(2)}
      {2 > 1 ? <span>我会显示出来</span> : <span>我会隐藏</span>}
      {2 > 1 && <span>我会显示出来</span>}
    </div>
  );
};
export default MyComponent;
```

## 10、JSX 列表渲染

我们通常使用 Javascript 的 map 函数来处理 JSX 数组列表循环渲染；如下

```jsx
const MyComponent = () => {
  const array = ["1", "2", "3", "4"];

  return (
    <ul>
      {array.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
};
export default MyComponent;
```

注意：在渲染是，我们需要给渲染项添加一个 key，不然会报错：warning: Each child in a list should have a unique "key" prop.

key 和 React 中的 diff 算法密切相关。
