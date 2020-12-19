export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck',
      },
      lastName: {
        type: 'string',
      },
      telephone: {
        type: 'string',
        minLength: 10,
      },
      multiTypeArray: {
        type: 'array',
        items: [{ type: 'string' }, { type: 'number' }],
      },
      singleTypeArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: { name: { type: 'string' }, age: { type: 'number' } },
        },
      },
      multiSelectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'foobar'],
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: [{ name: 'cwy', age: 28 }],
  },
}
