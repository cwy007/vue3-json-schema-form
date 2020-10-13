export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password',
      },
    },
  },
  customValidate(data: any, errors: any) {
    if (data.pass1 !== data.pass2) {
      errors.pass2.addError('密码必须相同')
    }
  },
  uiSchema: {},
  default: 1,
}
