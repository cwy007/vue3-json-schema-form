import { mount } from '@vue/test-utils'

import { NumberField, StringField } from '../../lib'
import TestComponent from './utils/TestCompoent'

describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })

  it('should render properties to correct fields', async () => {
    let value: any = {}
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    await strField.props('onChange')('1')
    expect(value.name).toEqual('1')
    await numField.props('onChange')(2)
    expect(value.age).toEqual(2)
  })

  it('should property be undefined when sub field trigger onChange(undefined)', async () => {
    let value: any = {}
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)

    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
  })

  it('should value be blank object when value type is not an object', async () => {
    let value: any = 123
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')('foo')
    expect(value).toEqual({ name: 'foo' })
  })
})
