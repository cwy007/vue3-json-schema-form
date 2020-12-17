import { defineComponent, h } from 'vue'

export default defineComponent({
  setup(p, { slots }) {
    return () => h('div', 'this is form')
  },
})
