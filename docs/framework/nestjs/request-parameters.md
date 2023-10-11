# 5 种参数传递方式

在 NestJS 中，有五种主要的参数传递方式：url param、query、form-urlencoded、form-data、以及 json。每种方式都有其独特的应用场景和优势，让我们一一来看看吧！

### 1、url param

#### 单个参数

参数传递：

```
GET /user/123
```

参数接收：

```ts
@Get(':id')
getUser(@Param('id') id: string) {
    // ...
}
```

#### 可选参数

参数传递：

```
GET /user/123
GET /user
```

参数接收：

```ts
@Get(':id?')
getUser(@Param('id') id?: string) {
    if (id) {
        // ...
    }else{
        // ...
    }
}
```

#### 参数验证或转换

参数传递：

```
GET /user/123
```

参数接收：

```ts
// 其他方式也支持参数验证或转换，就不逐一演示了，更多了解：https://docs.nestjs.com/pipes
import { Get, ParseIntPipe } from '@nestjs/common';

@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
    // ...
    // 自动将 id 转换为数字
    console.log(id, typeof id);
}
```

#### 多个参数--逐一接收

参数传递：

```
GET /user/123/456
```

参数接收：

```ts
@Get(':id/:name')
getUser(@Param('id') id: string, @Param('name') name: string) {
    // ...
}
```

#### 多个参数--统一接收

参数传递：

```
GET /user/123/456
```

参数接收：

```ts
@Get(':id/:name')
getUser(@Param() params: { id: string, name: string }) {
    const { id, name } = params;
    // ...
}
```

### 2、query

#### 单个参数

参数传递：

```
GET /user?id=123
```

参数接收：

```ts
@Get()
getUser(@Query('id') id: string) {
    // ...
}
```

#### 多个参数--逐一接收

参数传递：

```
GET /user?id=123&name=nest
```

参数接收：

```ts
@Get()
getUser(@Query('id') id: string, @Query('name') name: string) {
    // ...
}
```

#### 多个参数--统一接收

参数传递：

```
GET /user?id=123&name=nest
```

参数接收：

```ts
@Get()
getUser(@Query() params: { id: string, name: string }) {
    const { id, name } = params;
    // ...
}
```

### 3、form-urlencoded

form-urlencoded 是通过表单提交数据的一种编码方式。在指定 `Content-Type` 为 `application/x-www-form-urlencoded` 时，会自动将请求数据进行编码后传递。

前端传递时，可以借助 `qs` 或者 `query-string` 库进行编码：

参数传递：

```ts
import qs from "qs";

const result = await axios.post(
  "/api/user",
  qs.stringify({
    id: 1,
    name: "小明",
  }),
  {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  }
);
console.log(result);
```

**逐一参数接收：**

```ts
@Post()
createUser(@Body('id') id: string, @Body('name') name: string) {
    // ...
}
```

**统一参数接收：**

```ts
@Post()
createUser(@Body() params: { id: string, name: string }) {
    // ...
}
```

### 4、form-data

form-data 适合上传文件等二进制数据，在指定 `Content-Type` 为 `multipart/form-data` 时，会自动将请求数据进行编码后传递。

前端传递时，可以借助 FormData 对象进行处理：

参数传递：

```ts
const formData = new FormData();
formData.append("id", 1);
formData.append("name", "小明");
formData.append("file", file); // file 为二进制文件

const res = await axios.post("/api/user", data, {
  headers: { "content-type": "multipart/form-data" },
});
console.log(res);
```

参数接收：

```ts
import {
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Post()
@UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
createUser(@Body() createForms: { id:string, name:string }, @UploadedFiles() files: Express.Multer.File[]) {
   console.log(files);
   return JSON.stringify(createForms);
}
```

### 5、json

当请求头中的 `Content-Type` 为 `application/json` 时，会自动将请求数据进行编码后传递。

参数传递：

```ts
const res = await axios.post("/api/user", { id: 1, name: "小明" });
console.log(res);
```

**逐一参数接收：**

```ts
import { Body, Post } from '@nestjs/common';

@Post()
createUser(@Body("id") id:string, @Body("name") name:string){
  console.log(id, name);
  return JSON.stringify({ id, name });
}
```

**统一参数接收：**

```ts
import { Body, Post } from '@nestjs/common';
@Post()
createUser(@Body() createForms: { id:string, name:string }){
  console.log(createForms);
  return JSON.stringify(createForms);
}
```

### 总结

`url param` 和 `query`, 都是在 url 中传递参数：

- `url param` url 中的参数，Nest 中通过 `@Param()` 接收
- `query` url 中?后面的参数，Nest 中通过 `@Query()` 接收

`form urlencoded`、`form-data`、`json` , 都是在 body 中传递参数：

- `form urlencoded` 类似 query 传参，区别是在 body 中传递参数，Nest 中通过 `@Body()` 接收

- `form-data` 通常用于文件上传，非文件的参数，Nest 中通过 `@Body()` 接收

- `json` json 格式的数据，Nest 中通过 `@Body()` 接收
