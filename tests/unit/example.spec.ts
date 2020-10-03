import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

describe('HelloWorld.vue', () => {
  beforeEach(() => {
    console.log('before each')
  })

  afterEach(() => {
    console.log('after each')
  })

  beforeAll(() => {
    console.log('before All')
  })

  afterAll(() => {
    console.log('after All')
  })
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld as any, {
      props: { msg },
    })
    // setTimeout(() => {
    //   expect(wrapper.text()).toEqual(msg)
    //   done()
    // }, 100)
    // return new Promise((resolve) => {
    //   expect(wrapper.text()).toEqual('123')
    //   resolve()
    // })
    await wrapper.setProps({
      msg: '123',
    })
    expect(wrapper.text()).toEqual('123')
  })

  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('another', () => {
  beforeEach(() => {
    console.log('before each111')
  })

  afterEach(() => {
    console.log('after each111')
  })

  beforeAll(() => {
    console.log('before All111')
  })

  afterAll(() => {
    console.log('after All111')
  })
  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})
