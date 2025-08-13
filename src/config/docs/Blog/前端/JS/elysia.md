# Elysia.js
> 其实了解Elysia.js之前使用过h3.js 但是感觉很繁琐复杂 而且是Vue生态的东西 不太适合我的技术栈 就改成学习Elysia了

> 优点: 快快快 优雅 符合直觉

[官网](https://elysiajs.com)
## 创建一个Elysia项目
创建的时候会自动 bun i (也就是安装需要的包)

```powershell
// 1.使用Bun运行时
powershell -c "irm bun.sh/install.ps1 | iex"
// 2.创建项目
bun create elysia app
// 3.运行
cd app
bun dev
```

## 基础概念和语法
### 引入
```typescript
import { Elysia } from 'elysia'
```
### Tip
#### 方法链

符合直觉 写法优雅

```typescript
const app = new Elysia()
  // 使用.进行方法链调用 类似于链式调用(新特性有管道符调用 |>)
  .get('/', () => 'Hello World')
  .get('/user/:id', ({ params }) => {
    return {
      id: params.id
    }
  })
  .listen(3000)
```

#### 自动类型推断

elysia这个库进行了类型上的优化

```typescript
const app = new Elysia()
  .post('/user', ({ body }) => {
    // body 会自动推断类型，无需手动定义
    // 当你访问 body.name 时，TypeScript 会提供完整的类型提示
    return {
      id: 1,
      name: body.name,
      email: body.email
    }
  })
  .listen(3000)
```

在这个例子中，Elysia会自动推断：
1. 路由参数的类型
2. 请求体的类型
3. 响应数据的类型
4. 中间件的类型

## 路由
> 路由分三种
1. 静态路由(static paths)
2. 动态路由(dynamic paths)
3. 通配符路由(wildcards)

### 路由示例
```typescript
new Elysia()
    // 静态路由
    .get('/id/1', 'static path')
    // 动态路由
    .get('/id/:id', 'dynamic path')
    // 通配符路由
    .get('/id/*', 'wildcard path')
    .listen(3000)
```
![路由](/images/Blog/前端/JS/elysia/1.png)
#### 静态路由
顾名思义 就是路径是固定的
```typescriptypescript
.get('/id/1', 'static path')
```

#### 动态路由
使用`:`来定义动态路由
```typescript
.get('/id/:id', 'dynamic path')
```

#### 通配符路由
使用`*`来定义通配符路由
```typescript
.get('/id/*', 'wildcard path')
```

#### 正则表达式路由
Elysia支持使用正则表达式进行更精确的路由匹配
```typescript
new Elysia()
    // 匹配以数字结尾的路径
    .get(/\/user\/\d+$/, 'user with numeric ID')
    // 匹配包含特定模式的路径
    .get(/\/api\/v[1-9]/, 'API version route')
    // 匹配邮箱格式的路径
    .get(/\/email\/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, 'email route')
    .listen(3000)
```

正则路由的优势：
- 更精确的匹配控制
- 支持复杂的路径模式
- 可以验证路径格式

#### 路由参数
```typescript
// 1. 路由参数 (params) - URL路径中的参数
.get('/user/:id', ({ params }) => {
    return {
      id: params.id  // 获取 /user/123 中的 123
    }
})

// 2. 查询参数 (query) - URL中 ? 后面的参数
.get('/user', ({ query }) => {
    return {
      id: query.id,      // 获取 /user?id=123 中的 123
      name: query.name   // 获取 /user?id=123&name=john 中的 john
    }
})

// 3. 同时使用路由参数和查询参数
.get('/user/:id', ({ params, query }) => {
    return {
      userId: params.id,     // 路径参数：/user/123 中的 123
      search: query.search   // 查询参数：/user/123?search=john 中的 john
    }

// 4.post请求 使用{{ body }} 获取请求体
.post('/user', ({ body }) => {
    return {
      id: body.id,
      name: body.name
    }
})

})
```

## http动词
```typescript 
// GET请求 
.get('/user', () => {
    return 'GET request'
})
// POST请求
.post('/user', () => {
    return 'POST request'
})
// PUT请求
.put('/user', () => {
    return 'PUT request'
})
// DELETE请求
.delete('/user', () => {
    return 'DELETE request'
})
// PATCH请求(没怎么用过)
.patch('/user', () => {
    return 'PATCH request'
})
// OPTIONS请求(没怎么用过)
.options('/user', () => {
    return 'OPTIONS request'
})
.listen(3000)

// 特殊的 ALL
// 匹配所有请求方法
.all('/user', () => {
    return 'ALL request'
})
```
### 群
群组路由 可以用来管理一组路由<br>
是一种简写模式 把`/user`一直作为路由的"根"
```typescript
new Elysia()
    .group('/user', (app) =>
        app
            .post('/sign-in', 'Sign in')
            .post('/sign-up', 'Sign up')
            .post('/profile', 'Profile')
    )
    .listen(3000)
```

## Handler
感觉就是个函数
```typescript
new Elysia()
    .get('/user', () => {
        return 'User list'
    })
    .listen(3000)
```
### status
status是设置状态码的
```typescript
new Elysia()
    .get('/', ({ status }) => status(418, "Kirifuji Nagisa"))
    .listen(3000)
```
### state
状态 使用store来管理 用过zustand和pinia的应该会比较好接受 就是个store 用于跨请求共享数据(类似于跨组件通信)
```typescript
new Elysia()
    .state('version', 1)
    .get('/a', ({ store: { version } }) => version)
    .get('/b', ({ store }) => store)
    .get('/c', () => 'still ok')
    .listen(3000)
```
### 生命周期
![生命周期](/images/Blog/前端/JS/elysia/2.png)
学过Vue的应该比较了解生命周期这一块 什么组件销毁的时候清除之类的 什么onMounted之类的 

### 处理Schema
![Schema类型](/images/Blog/前端/JS/elysia/3.png)
挺常用的 可以用来处理请求体 响应体 路由参数 查询参数 等

### 支持插件系统
```typescript 
new Elysia()
    .use(logger())
    .listen(3000)
```

插件可以自己写 也可以安装 具体见文档 比如Bearer之类的鉴权插件