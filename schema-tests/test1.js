// Node.js require:
const Ajv = require('ajv')
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false,
      // format: 'test',
      // minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
// ajv.addFormat('test', (data) => {
//   console.log(data, '------------')
//   return data === 'haha'
// })
ajv.addKeyword('test', {
  // macro() {
  //   return {
  //     minLength: 10,
  //   }
  // },
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   // return true
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean',
  // },
  validate: function fun(schema, data) {
    // console.log(schema, data)

    fun.errors = [
      {
        keyword: 'test',
        dataPath: '.name',
        schemaPath: '#/properties/name/test',
        params: { keyword: 'test' },
        message: 'hello error message',
      },
    ]

    return false
  },
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 18,
  pets: ['mimi', 12],
  isWorker: true,
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
