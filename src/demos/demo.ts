export default {
  name: 'demo',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'object',
        properties: {
          firstName: {
            title: 'firstName',
            type: 'string',
            minLength: 10,
          },
        },
      },
    },
  },
  default: '1',
  uiSchema: {},
}
