import { createApp, defineComponent, h, reactive, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// import App from './App.vue'

const img = require('./assets/logo.png') // eslint-disable-line

// createElement
const App = defineComponent({
  setup() {
    const state = reactive({
      name: 'jokcy',
    })

    const numberRef = ref(1)

    setInterval(() => {
      state.name += '1'
      numberRef.value += 1
    }, 1000)

    // const number = numberRef.value

    return () => {
      const number = numberRef.value
      return h('div', { id: 'app' }, [
        h('img', {
          alt: 'Vue logo',
          src: img,
        }),
        h('p', state.name + number),
      ])
    }
  },
})

createApp(App).mount('#app')
