import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({ name: 'jokcy' })
    return () => {
      return (
        <div id="app">
          <h1>{state.name}</h1>
        </div>
      )
    }
  },
})
