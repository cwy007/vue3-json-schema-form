# TypeScript

核心：类型

有类型的 JavaScript

js 弱类型的语言

```js
// 弱类型的语言：类型在执行的过程中可以变法
let a = 'Jokcy' // String
a = 2 // Number
```

```ts
// 自信使用变量和函数，因为类型已经是确定的，只要调用对应类型的方法就行
//
// 类型声明后，之后变量的类型确定
let a = 'Jokcy
a = 2  // TS 在这里会报错

function funa(a: string) {
  // js 要先确定a为 string 类型，才能确保安全执行
  // if (typeof a === 'string') a.substr(1)
  return a.substr(1)
}

```

## 如何学习 ts

- 给任何变量都声明类型
- 不到万不得已不要用 any
- 给你的对象声明接口

## ArrayField

```ts
// as any 会跳过类型校验
//
const foo as any

```

核心功能

主题
