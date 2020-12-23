# ref 和 computed 源码解析

api

ref

createRef
isRef

RefImpl

`__v_isRef`

ref
reactive

convert

observed

proxy

toRaw(this)

track
`this._rawValue`
`this._value`
TriggerOpTypes.SET
triggerRef
`_shallow`

定义

实现

## computed

ComputedRefImpl

effect

track
trigger
watch
watchEffect

`this._value = this.effect()`
`this._dirty`
scheduler 调度程序
lazy: true

被调用的时候才会被更新
`this._dirty`

懒更新
computed
get
set
