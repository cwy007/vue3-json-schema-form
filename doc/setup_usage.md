# setup 的运用和其意义

h 函数会做一些参数的判断，是对 createVNode 函数的封装

```ts
// vue-next/packages/runtime-core/src/vnode.ts
export const createVNode = (__DEV__
  ? createVNodeWithArgsTransform
  : _createVNode) as typeof _createVNode

// patchFlag, dynamicProps, isBlockNode 这三个参数与优化有关
// 加快渲染
//
function _createVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false
): VNode
```

## setup

composition api

用法，问题解决

熟悉 setup 的使用后，再讲解源码

setup 与 data 一样，
只会在组件初始化时执行一次

reactive api

```ts
setup() {
  const state = reactive({ name: 'jocky' })
  // ...state 取出来的属性不是响应式的
  // state 这个对象是响应式的
  //

  // { value: xxx }
  const nameRef = ref('jokcy')
  setTimeout(() => {
    nameRef.value += 1
    state.name += 1 // 编译器省去了取 value 的步骤，compiler 帮忙做了
  }, 1000)
  const computedNameRef = computed(() => {
    return nameRef.value + '2'
  })

  // watchEffect 为一个函数
  //
  // setEffect
  // 函数体中 用到的响应数据发生变法时，watchEffect 会执行
  // reactive
  // ref
  // 函数重新执行
  // 只依赖于函数执行过程中用到的响应式数据是否发生变法
  //
  watchEffect(() => {
    console.log(nameRef.value)
  })

  return {
    state,
    name: nameRef,
    name2: computedNameRef
  }
}
```

```ts
import { defineComponent, reactive, ref, toRefs, computed, watchEffect } from 'vue'

export default defineComponent({
  setup(props, { slots, attrs, emit }) {
    return {

    }
  }
})

```

composition api 的理解和运用

熟悉后，深度解释实现原理，好的实践方式

## setup 函数返回 render 函数的用法

在 模版上使用

在 this 上面使用

在外部拿到setup返回的数据

在mounted，
在this上获取时，自动转掉 ref 这一层，vue 会自动解除到ref 这一层

* sfc 编译出的render
* setup 返回的 render

非 sfc 的组件，通过setup 返回一个函数，实现需要的功能

reactive 对象

```ts
const App = defineComponent({
  // js 闭包
  // 变量引用非常明确
  // 1.setup 函数只会执行一次
  // 2.当 reactive 的变量的value放生变法时，会引起 return 的函数重新执行
  setup() {
    const state = reactive({
      name: 'jokcy',
    })
    const numberRef = ref(1)
    setInterval(() => {
      state.name += '1'
      numberRef.value += 1
    }, 1000)
    // const number = numberRef.value // 这里自会执行一次
    return () => {
      const number = numberRef.value // numberRef 发生变化，会引起这个返回的函数重新执行
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
```

vue3 比 vue2 更适合使用 jsx

vue 中的 h 函数 就是 render api

jsx 支持 ts 类型校验，校验属性 类型

编辑器对 jsx 语法的支持

scf 不支持

复杂的逻辑，渲染的节点片段是通过业务逻辑确定的，这时候，使用jsx 实现起来要比 sfc 中要方便

通过函数生成

jsx vs sfc

推荐使用  jsx

jsx 更加灵活

jsx 就是 js 语言

模版编译后，返回结果为一个render函数（h函数）

jsx 支持类型检查，而模版 sfc 不支持模版检查

jsx 中的样式解决方法：
css in js

推荐使用 jsx 语法

.vue 不是 ts 可以支持的一种格式，支持的不太好

.tsx 中引入组件

.tsx 推荐使用 .tsx 开发组件，类型检查会有更好的支持
