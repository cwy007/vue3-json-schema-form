# watchEffect

track
trigger
`watch`
`watchEffect`

设计到很多部分

effect 函数

source

doWarch
currentInstance

getter
isRef(source)
isRefSource
isReactive(source)
isArray(source)
isFunction(source)
getter
cb

getter = () => {}

render function
cleanup
instance.isUnmounted
callWithErrorHandling(source, instance, 3, [])
no cb -> simple effect
deep 是否要遍历整个配置项
traverse 遍历
oldValue

flush
sync
post
调度流程
pre 之前的
sync 同步的
post 之后的

queuePreFlushCb(job)

```js
const runner = effect(getter, {
  lazy: true,
  onTrack,
  onTrigger,
  scheduler,
})
```

recordInstanceBoundEffect(runner)
immediate
job
instance.effects
flush?: 'pre' | 'post' | 'sync'
traverse 保证所有的值都被读取一边
runner 为传入和函数包装出来的 effect

## effect

效应，效果

isEffect
enableTracking()
全局遍历
shouldTrack
组件层级
dep
dependents
`__DEV__`开发环境相关的内容
targetMap

watchEffect
watch
二者基本相同，watch 的支持的配置参数更多一些
source，cb

闭包
全局变量
参数
数据接口
解决的问题
缓存

## stack

enableTracking

setup
state.count
每一个组件的 setup 自会执行一次
执行 setup 时，避免收集依赖
shouldTrack

component render
setupStatefulComponent

pauseTracking()

onInvalidate
注册的函数

callWithErrorhandling
errorHandling

errorCapture

onErrorCaptured

向上找错误处理的钩子

props + state
render

effect

vue 响应式原理
