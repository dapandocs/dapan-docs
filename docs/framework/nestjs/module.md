# 模块

模块是用 @Module() 装饰器注释的类。每个应用至少有一个模块，一个 根模块。

用法举例说明：

创建两个模块，一个叫 phone，一个叫 user。

**需求：在 User 模块中，使用 Phone 模块中的服务**

### 1、共享模块

::: code-group

```ts [phone.module.ts]
import { Module } from "@nestjs/common";
import { PhoneService } from "./phone.service";
import { PhoneController } from "./phone.controller";

@Module({
  controllers: [PhoneController],
  providers: [PhoneService],
  // 导出 providers，供其他模块使用
  exports: [PhoneService], // [!code ++]
})
export class PhoneModule {}
```

```ts [phone.service.ts]
import { Injectable } from "@nestjs/common";

@Injectable()
export class PhoneService {
  async getAllPhones() {
    return [
      {
        id: 1,
        name: "iPhone 12",
        price: 12000,
        description: "Awesome phone",
        category: "smartphone",
      },
    ];
  }
}
```

:::

::: code-group

```ts [user.module.ts]
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PhoneModule } from "../phone/phone.module";

@Module({
  // 导入 phone 模块
  imports: [PhoneModule], // [!code ++]
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

```ts [user.controller.ts]
import { Controller, Get } from "@nestjs/common";
import { PhoneService } from "../phone/phone.service";

@Controller("user")
export class UserController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get("phone")
  async getUserPhone() {
    // 在 user 模块中，使用 phone 模块中的 PhoneService
    const phone = await this.phoneService.getAllPhones();
    return phone;
  }
}
```

:::

### 2、全局模块

::: code-group

```ts [phone.module.ts]
import { Module, Global } from "@nestjs/common";
import { PhoneService } from "./phone.service";
import { PhoneController } from "./phone.controller";

@Global() // [!code ++]
@Module({
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService], // [!code ++]
})
export class PhoneModule {}
```

```ts [phone.service.ts]
import { Injectable } from "@nestjs/common";

@Injectable()
export class PhoneService {
  async getAllPhones() {
    return [
      {
        id: 1,
        name: "iPhone 12",
        price: 12000,
        description: "Awesome phone",
        category: "smartphone",
      },
    ];
  }
}
```

:::
::: code-group

```ts [user.module.ts]
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  // 无需导入 phone 模块
  imports: [], // [!code --]
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

```ts [user.controller.ts]
import { Controller, Get } from "@nestjs/common";
import { PhoneService } from "../phone/phone.service";

@Controller("user")
export class UserController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get("phone")
  async getUserPhone() {
    // 在 user 模块中，使用 phone 模块中的 PhoneService
    const phone = await this.phoneService.getAllPhones();
    return phone;
  }
}
```

:::

### 总结

共享模块，需要 A 模块导出（exports）provider，并在 B 模块中导入（imports），B 模块才能使用 A 模块的 provider。

全局模块，需要@Global 声明，其exports 的 provider就是全局的。可以在任何模块中使用。
