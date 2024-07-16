# JS 基础

### 创建js对象的几种方式

#### 字面量
当需要快速创建一个简单的对象时，字面量是最直接的方式。它适用于那些不需要继承其他对象属性或方法，且结构简单的对象。
```javascript
var obj = { };
```

#### 构造函数
当你需要创建多个具有相同属性和方法的对象时，可以使用构造函数。构造函数允许你定义一个模板，然后通过new关键字创建多个实例。
```javascript
var obj = new Object();
```

#### Object.create
当你需要一个对象继承另一个对象的属性和方法。
```javascript
var obj = Object.create(Object.prototype)
```




