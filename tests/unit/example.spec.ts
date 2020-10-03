import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const Test = defineComponent({
  name: 'Test',
  setup() {
    return () => h('span', '123')
  },
})

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', [h(Test)])
    }
  },
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const swrapper = shallowMount(HelloWorld as any)
    const wrapper = mount(HelloWorld)

    const ss = swrapper.find('span')
    const s = wrapper.find('span')

    const helloWorld = wrapper.findComponent({
      name: 'HelloWrold',
    })

    console.log(ss, s)

    // expect(wrapper.text()).toEqual(msg)
  })
})
