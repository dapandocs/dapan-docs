# NestJS 依赖注入和控制反转

## 为什么需要依赖注入

NestJS 使用依赖注入和控制反转（Inversion of Control，IoC）的主要目的是提高代码的可维护性、可测试性和可扩展性。下面是一些使用依赖注入和控制反转的好处：

- 解耦组件：依赖注入和控制反转可以帮助我们将组件之间的依赖关系解耦。通过将依赖关系的创建和管理交给框架来处理，我们可以更容易地替换、修改或扩展组件，而不需要修改它们之间的代码。

- 可扩展性：依赖注入和控制反转使得应用程序更容易扩展。我们可以通过添加新的组件和提供者来扩展应用程序的功能，而不需要修改现有的代码。这种松耦合的设计使得应用程序更具弹性，能够适应未来的需求变化。

## 依赖注入的原理

在 NestJS 中，依赖注入的实现原理如下：

- 定义依赖关系：在 NestJS 中，我们使用装饰器来标记类和类的属性作为依赖关系。常用的装饰器包括@Injectable()、@Inject()、@Controller()等。

- 注册提供者：提供者是指实现依赖关系的具体类或值。在 NestJS 中，我们使用@Injectable()装饰器将类标记为可注入的提供者，并使用@Module()装饰器将提供者注册到模块中。

- 创建实例：当需要使用某个依赖关系时，IoC 容器会根据提供者的定义，创建相应的实例。这包括解析依赖关系的构造函数参数、调用构造函数创建实例，并自动注入依赖关系。

- 解析依赖关系：当一个类需要使用其他类的实例时，IoC 容器会自动解析依赖关系并注入到类的属性中。这是通过使用@Inject()装饰器来标记类的属性，并在需要注入的地方使用 constructor(private readonly dependency: Dependency)的方式来实现的。

为了更好的理解依赖注入，我们可以手写一个简单的依赖注入框架。下面是一个简单的依赖注入框架的示例代码：

```typescript
// ioc容器
class Container {
  private dependencies: { [key: string]: any } = {};

  register(name: string, dependency: any): void {
    this.dependencies[name] = dependency;
  }

  resolve(name: string): any {
    if (this.dependencies[name]) {
      return this.dependencies[name];
    }
    throw new Error(`Dependency '${name}' not found.`);
  }
}

// 提供者
class CatService {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): void {
    console.log(this.name);
  }
}

// 创建一个容器实例
const container = new Container();

// 注册依赖关系
container.register("catService", new CatService("小花猫"));

// 解析依赖关系
const catService = container.resolve("catService");

catService.getName(); // 小花猫
```

在上述代码中，我们创建了一个 IoC 容器，并使用 register()方法来注册依赖关系，使用 resolve()方法来解析依赖关系。

## Class 属性定义并赋值的简单写法

在 TypeScript 中，我们可以使用以下两种方式来定义并赋值一个类的属性：

```typescript
// 基础写法
class Car {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  start() {
    this.engine.start();
    console.log("Car started");
  }
}
```

可以将类 Car 简化为：

```typescript
// 简写
class Car {
  // 定义的同时，并给属性赋值
  constructor(private engine: Engine) {}

  start() {
    this.engine.start();
    console.log("Car started");
  }
}
```

上述在 nestjs 中，我们也可以写为：

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

上述可以更改为：

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  private readonly appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

NestJS 中的依赖注入机制为开发者提供了更加优雅和灵活的方式来构建可扩展的应用程序。