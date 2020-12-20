# vue3-json-schema-form

a form generator based on jsonschema for vue3

## Project setup

```bash
npm install
npm run serve
npm run build
npm run test:unit
npm run lint
```

## API 设计

```jsx
<JsonSchemaForm
  schema={schema}
  value={value}
  onChange={handleChange}
  locale={locale}
  contextRef={someRef}
  uiSchema={uiSchema}
/>
```

## schema

json schema 对象，用来定义数据，同时也是我们定义表单的依据

## value

表单的数据结果，你可以从外部改变这个 value，在表单被编辑的时候，会通过`onChange`透出 value

需要注意的是，因为 vue 使用的是可变数据，如果每次数据变化我们都去改变`value`的对象地址，那么会导致整个表单都需要重新渲染，这会导致性能降低。
从实践中来看，我们传入的对象，在内部修改其 field 的值基本不会有什么副作用，所以我们会使用这种方式来进行实现。也就是说，如果`value`是一个对象，
那么从`JsonSchemaForm`内部修改的值，并不会改变`value`对象本身。我们仍然会触发`onChange`，因为可能在表单变化之后，使用者需要进行一些操作。

### onChange

在表单值有任何变化的时候会触发该回调方法，并把新的值进行返回

### locale

语言，使用`ajv-i18n`指定错误信息使用的语言

### contextRef

你需要传入一个 vue3 的`Ref`对象，我们会在这个对象上挂载`doValidate`方法，你可以通过

```ts
const yourRef = ref({})

onMounted(() => {
  yourRef.value.doValidate()
})

<JsonSchemaForm contextRef={yourRef} />
```

这样来主动让表单进行校验。

### uiSchema

对表单的展现进行一些定制，其类型如下：

```ts
export interface VueJsonSchemaConfig {
  title?: string
  descrription?: string
  component?: string
  additionProps?: {
    [key: string]: any
  }
  withFormItem?: boolean
  widget?: 'checkbox' | 'textarea' | 'select' | 'radio' | 'range' | string
  items?: UISchema | UISchema[]
}
export interface UISchema extends VueJsonSchemaConfig {
  properties?: {
    [property: string]: UISchema
  }
}
```

## git

```bash
# 查看远程分支
git granch -r
# 查看所有分支
git branch -a

# 查看第3章的分支
gb -r | grep origin/3
```

## 目录说明

```bash
# ./lib/ 文件夹下是组件库的代码，也就是完成后需要打包发布的代码
./lib/
# ./src/ 文件夹下的代码是演示的代码，在开发时使用
./src/

```

## 参考

- [pure-vue/vue3-jsonschema-from](https://github.com/pure-vue/vue3-jsonschema-from)
- [prettier](https://prettier.io/)
- [Ajv: Another JSON Schema Validator](https://ajv.js.org)
- [json-schema](https://json-schema.org/)
- [v3.cn.vuejs.org](https://v3.cn.vuejs.org/guide/installation.html)
- [JSX for vue3](https://github.com/vuejs/jsx-next)
- [ajv-formats](https://github.com/ajv-validator/ajv-formats)
- [vue-jss](https://github.com/pure-vue/vue-jss)
- [monaco-editor](https://github.com/microsoft/monaco-editor)
- [Announcing Import Type](https://flow.org/blog/2015/02/18/Import-Types/)
- [import type 含义](https://segmentfault.com/q/1010000015563961)
- Uncaught Error: Unexpected usage

  - [解决方法](https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md#option-1-using-the-monaco-editor-loader-plugin)

  ```js
  // monaco-editor 报错信息
  Error: Unexpected usage
      at EditorSimpleWorker.loadForeignModule (editorSimpleWorker.js?ccf6:459)
      at eval (webWorker.js?af50:38)
      at eval (errors.js?fdcc:12)

  // 解决方法
  // 添加 vue.config.js 文件
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

  module.exports = {
    configureWebpack: {
      plugins: [new MonacoWebpackPlugin()],
    },
  }
  ```

- [jsonpointer](https://github.com/janl/node-jsonpointer)

  > JSON Pointer defines a string syntax for identifying a specific value
  > within a JavaScript Object Notation (JSON) document.
  > <https://tools.ietf.org/html/rfc6901>

- [lodash.union](https://www.npmjs.com/package/lodash.union)

  > The lodash method `_.union` exported as a Node.js module.

- [json-schema-merge-allof](https://github.com/mokkabonna/json-schema-merge-allof#readme)

  > Simplify your schema by combining allOf

- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
- [json schema getting-started-step-by-step](https://json-schema.org/learn/getting-started-step-by-step.html)

- [jestjs.io](https://jestjs.io/)
