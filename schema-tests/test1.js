// Node.js require:
const Ajv = require('ajv').default
const addFormats = require('ajv-formats')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'test',
      test: true
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
  validate(schema, data) {
    console.log(schema, data)
    return true
  },
  compile(sch, parentSchema) {
    console.log(sch, parentSchema)
    return () => true
  },
  macro() {
    return {
      minLength: 10,
    }
  },
  metaSchema: {
    // schema to validate keyword value
    type: "boolean",
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
if (!valid) console.log(validate.errors)

// node schema-tests/test1.js
