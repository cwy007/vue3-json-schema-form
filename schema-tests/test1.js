// Node.js require:
const Ajv = require('ajv').default
const addFormats = require('ajv-formats')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email',
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
