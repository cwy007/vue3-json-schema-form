# reactive

源码

声明一个响应式对象，修改响应式对象后，依赖于响应式对象的函数会被执行

场景

watch

watchEffect

map

debugger

对同一个对象多次调用 reactive，vue3 会将生成的 proxy 存到 proxyMap 中，缓存起来

proxy

new Proxy(target, handler)

baseHandlers

ReactiveFlags.IS_REACTIVE
ReactiveFlags.RAW

toRaw()

createGetter
// 而外挂载的属性
target[ReactiveFlags.RAW]

读取 proxy 特殊 key 的操作

targetIsArray

<!-- ② (measuring instruments) 测量仪器 cèliáng yíqì -->

arrayInstrumentations
includes
indexOf
lastIndexOf

key indexOf
proxy arr
arr.indexOf

Reflect.get(arrayInstrumentations, key, receiver)

mutableHandlers
get shallowGet readonlyGet shallowReadonlyGet createGetter
set
deleteProPerty
has

isSymbol

keyIsSymbol
builtInSymbols.keys(key as symbol)

```js
__proto__
__v_isRef
```

target get name
track(target, TrackOpTypes.GET, key)
TrackOpTypes.GET
name 变化，render 函数会被重新调用

```js
setup(){
  return render
}

```

ifRef

shouldUnwrap

isReadonly

readonly(res)

reactive(res)

createrGetter
调试 get 的过程
debugger

proxy handler

数组的读取
对象的读取
不同类型数据的读取方式

target 声明的对象
receiver 为 proxy

shallow

mutableCollectHandler

targetTypeMap

TargetType.COMMON

proxy get

## set

会作什么事情

proxy set 和其他代理讲解

set

shallowSet

set

createSetter 为 proxy 的函数

oldValue target[key]
!shallow 返回的对象仍然为 reactive 对象，读取的 target[key] 仍然为 reactive 对象

将 reactive 对象转为普通对象
value = toRaw(value)

```js
// 包装和解包装的过程，某些情况下，vue3会自动做的
const state = reactive({
  name: ref('jocky)
})

state.name = '123'
```

isArray(target)
isIntergetKey(key)
hasOwn(target, key)
hasKey

<!-- Reflect.set(target, propertyKey, value[, receiver]) -->

const result = Reflect.set(target, key, value, receiver)

toRaw 获取 proxy 背后的对象
target === toRaw(receiver)

!hasKey

相当于给对象上新增了一个 key
trigger(target, TriggerOpTypes.ADD, key, value)

hasKey
hasChanged(value, oldValue)
trigger(target, TriggerOpTypes.SET, key, value, oldValue)

return result

get 的时候会 track，跟踪对象上的某个 key，以及具体的某个类型
set 的时候会 trigger，trigger 对象上跟踪的属性的函数

track()
trigger()

deleteProperty
hasKey = hasOwn(target, key)
oldValue = target[key]
const result = Reflect.deleteProperty(target, key)

有依赖于这个数据 target[key] 的函数都去再调用一遍
trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)

track 收集依赖的过程
has 作为条件，一种依赖关系
has()
track(target, TrackOpTypes.HAS, key)

trigger 触发依赖数据更新，re-render

```js
// get, set 为代理的对象放在 proxy 上的一些代理函数
const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys,
}
```

shallow

mutable

get: shallowGet
set: shallowSet

shallow return res

包装

```js
// shallow
// const state = reactive({
//   obj: {
//     count: 0,
//   },
// })

const state = shallowReactive({
  obj: {
    count: 0,
  },
})

setInerval(() => {
  state.obj.count += 1
}, 1000)

return () => {
  debugger
  return <div>{state.obj.cont}</div>
}
```

shallowReactive 的二级对象不是响应式的 state.obj.count

reactive 的二级对象的值是响应式的 state.obj.count

shallow 有什么用

不希望对象放到 reactive 中的时候，被转化为 reactive 响应式
eg：第 3 方类库提供给我们的对象，这些对象不能被包装成 proxy 的，被包装成 proxy 后，在使用中会出现问题，并不是所有的库都会很好的支持 reactive，在库的预设场景中没有想过将对象包装成 proxy，在这种情况下需要使用 shallow 这种方式

mutable
shallow
readonly

## 集合类型的代理函数详解

baseHandlers 中的实现流程对 handler 的代理 get, set

collectionHandlers

Set
Map
数据类型

mutableCollectionHandlers

<!-- createInstrumentationGetter(isReadonly, isShallow) -->

get: createInstrumentationGetter(false, false)

shallowCollectionHandlers
readonlyCollectionHandlers

<!-- instrument 工具，乐器，仪表 -->

map.get(key)

createInstrumentationGetter

key === ReactiveFlags.IS_REACTIVE
对特殊 key 的判断

instrumentation 测量仪器

map.get

```js
Reflect.get(
  hasOwn(instrumentations, key) && key in target ? instrumentations : target,
  key,
  receiver,
)
```

map 的是可以是 string，和 string 之外的别的数据类型

obj 的 key 只能是 string 或 symbol

toRaw
rawTarget
rawKey

key !== rawKey 时才会 track
track(rawTarget, TrackOpTypes.GET, key)

Reflect.getPrototypeOf(v)
获取 map 对象的 has 函数
const {has} = getProto(rawTarget)

<!-- if - else if - else -->

const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive

对 map.get 函数做一些处理，然后做一些事情

ts 的一个特性
this: mapTypes 只是类型声明，声明上下文
这里 this: mapTypes 的作用，调用这个函数时，this 的类型声明，而不是说 this 是一个参数
编译后只会有两个参数 key 和 value
function set(this: mapTypes, key: unknown, value: unknown)

toRaw

<!-- __DEV__ -->

```js
setup() {
  const state = shallowReactive(new Map())
  state.set('count', 1)

  setInterval(() => {
    state.set('count', state.get('count') + 1)
  }, 1000)

  return () => {
    debugger
    return <div>{state.get('count')}</div>
  }
}
```

map 作为 reactive 对象，它的 get，set 方法是被代理的，并且是响应式的

collection 的代理和普通的对象不一样
map 是通过实例方法对 key 进行操作 m.set('name', 'cwy')
普通对象 obj.name = 'cwy'

所以代理方式不一样

collectionHanders 源码解析
默认代理只有一个 get，通过 get 获取所有被代理的函数，然后，再进行一个操作
