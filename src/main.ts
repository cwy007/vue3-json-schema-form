import { createApp, defineComponent, createVNode } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import App from './App.vue'

const img = require('./assets/logo.png') // eslint-disable-line

// createElement
// const App = defineComponent({
//   render() {
//     return createVNode('div', { id: 'app' }, [
//       createVNode('img', {
//         alt: 'Vue logo',
//         src: img,
//       }),
//       createVNode(HelloWorld, {
//         msg: 'Welcome to Your Vue.js + TypeScript App',
//         age: 12,
//       }),
//     ])
//   },
// })

createApp(App).mount('#app')
