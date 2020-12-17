// Node.js require:
const Ajv = require('ajv').default
const addFormats = require('ajv-formats')
const localize = require('ajv-i18n');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'test',
      test: 'true'
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age']
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
addFormats(ajv)
// 自定义format: 'test'
// https://ajv.js.org/docs/api.html#api-addformat
ajv.addFormat('test', (data) => {
  console.log(data, '---------------')
  return data === 'haha'
})
ajv.addKeyword({
  keyword: "test",
  validate: function foo(schema, data) {
    console.log(schema, data)
    foo.errors = [{
      keyword: 'test',
      dataPath: '/name',
      schemaPath: '#/properties/name/test',
      params: {},
      message: '验证未通过，测试 ajv 自定义错误信息，i18n'
    }]
    return false
  },
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   return () => true
  // },
  // macro() {
  //   return {
  //     minLength: 10,
  //   }
  // },
  metaSchema: {
    // schema to validate keyword value
    type: "string",
  },
  // errors: false,
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'Jocky@xxx.com',
  age: 18,
  pets: [
    'mini',
    'mama'
  ],
  isWorker: true
})

if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
// node schema-tests/test1.js
