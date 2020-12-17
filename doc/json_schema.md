# json schema

json schema

form value

定义json 数据

定义，校验

校验 json 对象的格式

类型

string，number，boolean

定义，校验，然后，通过json schema 生成表单

json schema 只是一个规范

json 通用的数据类型

json 定义 json

不同语言中通用

前端实现校验，后端实现校验

webpack 的配置，3，4后配置的校验，也是通过 json schema 实现

[json schema validator:](https://ajv.js.org)

[json-schema](https://json-schema.org/)

ajv: another json validator

```js
// or ESM/TypeScript import
import Ajv from "ajv"
// Node.js require:
const Ajv = require("ajv").default

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) console.log(validate.errors)
```
