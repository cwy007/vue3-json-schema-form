# vue 的 h 函数

```ts
import { createApp, defineComponent } from 'vue'

const App = defineComponent({
  render() {
    return 123
  },
})

createApp(App).mount('#app')
```

vue 如何渲染节点内容

.vue 文件的开发模式 SFC，vue-loader, webpack => js code

真正在页面上渲染的内容

vue 项目中页面上显示的内容，通过函数调用创建

```ts
// compiler v-bind:age="12"
// vue-loader
// css-loader
//
// h 对应 react 中 createElement
import { createApp, defineComponent, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png')

// template => h()
// 实际编译出来的内容会有优化
//
// 模版与编译后的最终结果之间的对应关系
//
// h函数返回vnode
// h() => vnode 虚拟dom
// h 函数是对 createVNode 函数的封装
// vnode 树
// 在vue中写模版实际是在写h函数的调用
//
// 编译出来的内容大致如下方所示
// div 为原生节点，使用字符串标识
// 参数：节点类型、属性、子节点
const App = defineComponent({
  render() {
    return h('div', { id: 'app' }, [
      h('img', {
        alt = 'Vue logo',
        src = img,
      }),
      h(HelloWorld, {
        msg: 'Welcome to Your Vue.js + TypeScript App',
        age: 12,
      }),
    ])
  },
})

createApp(App).mount('#app')
```

## h 函数源码

```ts
// vue-next/packages/runtime-core/src/h.ts
// Actual implementation
// type 这个参数必填，也就是至少又一个参数
//
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    // 两个参数的情况
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // 是对象不是数组的情况
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        // 是虚拟节点
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren) // 是属性 props
    } else {
      // 不是对象是数组的情况
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    // 大于等于三个参数的情况
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

每次重新渲染一个节点时，render 函数就会被重新执行
