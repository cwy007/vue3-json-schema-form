import { createApp, defineComponent, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// import App from './App.vue'

const img = require('./assets/logo.png') // eslint-disable-line

// createElement
const App = defineComponent({
  render() {
    return h('div', { id: 'app' }, [
      h('img', {
        alt: 'Vue logo',
        src: img,
      }),
      h(HelloWorld, {
        msg: 'Welcome to Your Vue.js + TypeScript App',
        age: 12,
      }),
    ])
  },
})

createApp(App).mount('#app')
