import { createApp, defineComponent, h, reactive, ref } from 'vue'

import HelloWorld from './components/HelloWorld.vue'

const img = require('./assets/logo.png') // eslint-disable-line

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />
}

export default defineComponent({
  setup() {
    const state = reactive({
      name: 'jokcy',
    })

    const numberRef = ref(1)

    // setInterval(() => {
    //   state.name += '1'
    //   numberRef.value += 1
    // }, 1000)

    // const number = numberRef.value

    return () => {
      const number = numberRef.value
      console.log(state.name)

      return (
        <div id="app">
          <img src={img} alt="Vue logo" />
          <p>{state.name + number}</p>
          <input type="text" v-model={state.name} />
          {renderHelloWorld(12)}
        </div>
      )

      // return h('div', { id: 'app' }, [
      //   h('img', {
      //     alt: 'Vue logo',
      //     src: img,
      //   }),
      //   h('p', state.name + number),
      // ])
    }
  },
})
