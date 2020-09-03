// Node.js require:
const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test',
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
ajv.addFormat('test', (data) => {
  console.log(data, '------------')
  return data === 'haha'
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 18,
  pets: ['mimi', 12],
  isWorker: true,
})
if (!valid) console.log(validate.errors)
