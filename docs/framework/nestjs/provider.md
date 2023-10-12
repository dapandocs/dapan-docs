# Provider 依赖注入

在 NestJS 中，可以使用 Provider 来进行依赖注入。Provider 是一个可被注入到其他类中的可重用对象。

### 1、类注入

::: code-group

```ts [user.service.ts]
// user.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  async getUser() {
    return [
      {
        id: 1,
        name: "John Doe",
        email: "john@doe.com",
        password: "123456",
        createdAt: "2020-01-01",
        updatedAt: "2020-01-01",
      },
    ];
  }
}
```

```ts [user.controller.ts]
// user.controller.ts
import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  // 构造器注入
  constructor(private readonly userService: UserService) {}

  @Get("list")
  async getUser() {
    return await this.userService.getUser();
  }
}
```

```ts [user.module.ts]
// user.module.ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  // 简写用法
  providers: [UserService],
})
export class UserModule {}
```

:::

在上面的示例中，UserService 通过`@Injectable`成为可被注入的类，UserController 类依赖于 UserService 类。通过将 UserService 类作为参数传递给 UserController 类的构造函数，NestJS 会自动解析并注入 UserService 实例。

#### @Inject 手动注入

上述是通过构造器注入的方式，也可以通过 `@Inject` 装饰器手动注入。

```ts
import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  // @Inject 手动注入
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get("list")
  async getUser() {
    return await this.userService.getUser();
  }
}
```

#### provider 注入的完整形式

其中 `providers: [UserService]`，是一种简写形式，完整的写法如下：

**provide 为类名，useClass 为类**

```ts
@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserService, // 指定注入的token，也就是给类命名，默认是类名首字母小写
      useClass: UserService, // 指定注入的类
    },
  ],
})
class UserModule {}
```

**provide 为字符串，useClass 为类**

```ts
@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useClass: UserService,
    },
  ],
})
export class UserModule {}
```

需要注意的是，provide 指定的字符串，在注入时需要使用 @Inject('user') 手动注入了。

```ts
import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  // @Inject 手动注入
  constructor(@Inject("user") private readonly userService: UserService) {}

  @Get("list")
  async getUser() {
    return await this.userService.getUser();
  }
}
```

### 2、值注入

#### useValue 使用

::: code-group

```ts [user.module.ts]
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useClass: UserService,
    },
    // 值注入
    {
      provide: "userInfo",
      useValue: {
        name: "张三",
        age: 18,
      },
    },
  ],
})
export class UserModule {}
```

```ts [user.controller.ts]
import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  // @Inject 手动注入--指定token字符串
  constructor(
    @Inject("user") private readonly userService: UserService,
    @Inject("userInfo")
    private readonly userInfo: { name: string; age: number }
  ) {}

  @Get("list")
  async getUser() {
    console.log("userInfo", this.userInfo);
    return await this.userService.getUser();
  }
}
```

:::

#### useFactory 使用

**返回定值**

作用和`useValue`一样，只不过返回的是一个函数，函数的返回值就是注入的值。

```ts
// user.module.ts
@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useFactory: () => {
        return {
          name: "张三",
          age: 18,
        };
      },
    },
  ],
})
export class UserModule {}
```

**支持异步**

```ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useClass: UserService,
    },
    // 值注入
    {
      provide: "userInfo",
      useValue: {
        name: "张三",
        age: 18,
      },
    },
    {
      provide: "userInfo2",
      useFactory: async () => {
        // 延迟 3 秒执行，启动时延迟，接口调用时无感
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {
          name: "李四",
          age: 20,
        };
      },
    },
  ],
})
export class UserModule {}
```

**支持参数注入**

```ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useClass: UserService,
    },
    // 值注入
    {
      provide: "userInfo",
      useValue: {
        name: "张三",
        age: 18,
      },
    },
    {
      provide: "userInfo2",
      useFactory: async () => {
        // 延迟 3 秒执行
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return {
          name: "李四",
          age: 20,
        };
      },
    },
    {
      provide: "userInfo3",
      useFactory: async (
        // 这里的参数就是inject注入的
        user: UserService,
        userInfo2: { name: string; age: number }
      ) => {
        const userInfo2List = await user.getUser();
        return {
          name_1: userInfo2List[0].name,
          name_2: userInfo2.name,
        };
      },
      inject: ["user", "userInfo2"], // 也支持token可以是字符串，也可以是class
    },
  ],
})
export class UserModule {}
```

这个工厂函数接受两个参数：user 和 userInfo2。这些参数是通过 inject 属性指定的，它们会被自动注入到工厂函数中。在这个例子中，user 是一个 UserService 的实例，userInfo2 是一个对象，具有 name 和 age 属性。

在工厂函数内部，我们通过调用 user.getUser() 方法来获取用户信息列表，并将其存储在 userInfo2List 变量中。然后，我们将 userInfo2List 的第一个用户名称存储在 name_1 字段中，将 userInfo2 的名称存储在 name_2 字段中，并返回这个对象。

通过这种方式，我们可以在工厂函数内部通过注入的对象和服务执行一些动态的逻辑，从而生成所需的值。这使得我们能够更加灵活地管理提供者之间的依赖关系，并根据需要进行实例化和处理。

### 3、起别名

在注入时，我们通常使用的是提供者的名称，但是有时候我们可能希望使用一个别名来引用它。

```ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "user",
      useClass: UserService,
    },
    {
      provide: "userInfo4",
      useExisting: "user", // 要要注入的提供者
    },
  ],
})
export class UserModule {}
```

这样就可以通过别名来注入了。

### 总结

大多数情况下 provider 可以通过 `@Injectable` 声明，在 @Module 的 providers 数组里注册 class。

默认的 token 就是 class 类的首字母小写，可以通过构造器注入，也可以通过 `@Inject` 注入。

token 可以是 class，也可以是字符串。如果是字符串，则需要`@Inject` 注入。

可以用 `useValue` 直接指定注入的对象。

如果想动态生成对象，可以使用 `useFactory`，支持动态参数注入，根据业务需要，自行返回要注入的对象。

如果想起别名，可以用 `useExisting` 给已有的 token，指定一个新 token。
