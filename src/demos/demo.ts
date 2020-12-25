import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'demo',
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
        title: 're-try password',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
      testkeyword: {
        type: 'string',
        minLength: 10,
        test: 'true',
        title: 'keyword test',
      },
    },
  },
  default: {
    pass1: '',
    pass2: '',
    color: '#861818',
    testkeyword: '',
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
  async customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 != data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve(true)
      }, 2000)
    })
  },
}
