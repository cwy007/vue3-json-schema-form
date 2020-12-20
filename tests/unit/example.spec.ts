import { mount } from '@vue/test-utils'

import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render correct number field', () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
  })
})
