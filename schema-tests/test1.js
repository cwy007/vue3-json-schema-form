// Node.js require:
const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
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
const validate = ajv.compile(schema)
const valid = validate({
  name: 'jokcy',
  age: 18,
  pets: ['mimi', 12],
  isWorker: true,
})
if (!valid) console.log(validate.errors)
