# JS 逆向定位神器：史上最实用的 Hook 脚本

> 【作者主页】：[小鱼神1024](https://blog.csdn.net/studypy1024)
>
> 【擅长领域】：JS逆向、小程序逆向、AST还原、验证码突防、Python开发、浏览器插件开发、React前端开发、NestJS后端开发等等

大家都清楚，很多网站会把关键参数打包得像国宝大熊猫一样严密，我们的任务，就是要把这些参数的加密逻辑搞得明明白白。这次的神器就是 JS Hook 脚本：一招在手，天下我有！

### Cookie Hook

想知道 Cookie 里那些关键参数是哪里冒出来的吗？用下面的代码，锁定那些“神秘”的小 Cookie 们：

```javascript
var tmpCookie = "";
Object.defineProperty(document, "cookie", {
  set: function (value) {
    if (typeof value === "string" && value.includes("a1")) {
      console.log("Hook捕获到cookie设置->", value);
      debugger;
    }
    tmpCookie = value;
    return value;
  },
  get: function () {
    return tmpCookie;
  },
});
```

### Header Hook

用这个小魔法，瞄准请求头中的关键参数，比如 Authorization，察觉到就断点：

```javascript
var originalSetRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader;
window.XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
  if (header === "Authorization") {
    debugger;
  }
  return originalSetRequestHeader.apply(this, arguments);
};
```

### Hook 过 debugger

#### constructor 构造函数中的 debugger

```javascript
var _constructor = constructor;
Function.prototype.constructor = function (string) {
  if (string == "debugger") {
    return null;
  }
  return _constructor(string);
};
```

#### eval 构造函数中的 debugger

```javascript
(function () {
  "use strict";
  var eval_ = window.eval;
  window.eval = function (x) {
    eval_(x.replace("debugger;", "  ; "));
  };
  window.eval.toString = eval_.toString;
})();
```

### URL Hook

这一招专治 URL 里的“鬼鬼祟祟”。任何带有 `comment` 的 URL 通通站住：

```javascript
var originalOpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url) {
  if (typeof url === "string" && url.includes("comment")) {
    debugger;
  }
  return originalOpen.apply(this, arguments);
};
```

### JSON.stringify Hook

让 JSON.stringify 无法藏身，所有的序列化行动皆在我们掌控中：

```javascript
JSON.stringify_ = JSON.stringify;
JSON.stringify = function () {
  if (arguments[0] && arguments[0]["time"]) {
    debugger;
  }
  let result = JSON.stringify_.apply(this, arguments);
  return result;
};
```

### JSON.parse Hook

解析 JSON 字符串时，不让任何小可爱躲过我们的视线：

```javascript
JSON.parse_ = JSON.parse;
JSON.parse = function () {
  if (typeof arguments[0] === "string" && arguments[0].includes("ab")) {
    debugger;
  }
  return JSON.parse_.apply(this, arguments);
};
```

### canvas hook

它常用于二维码场景

```javascript
let create_element = document.createElement.bind(doument);

document.createElement = function (_element) {
  if (_element === "canvas") {
    debugger;
  }
  return create_element(_element);
};
```
你还知道其他常用 `Hook` 方法吗？在评论区留言吧！




