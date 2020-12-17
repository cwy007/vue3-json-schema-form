# props

vue3 中使用props时，也需要声明

```ts
// vue-next/packages/runtime-core/src/apiDefineComponent.ts
// overload 4: object format with object props declaration
// see `ExtractPropTypes` in ./componentProps.ts
export function defineComponent<
  // the Readonly constraint allows TS to treat the type of { required: true }
  // as constant instead of boolean.
  PropsOptions extends Readonly<ComponentPropsOptions>,
```

```ts
// vue3 使用时，将属性提取出来
// Readonly
// as const 手动指定为常量
//
const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true,
  }
} as const

```
