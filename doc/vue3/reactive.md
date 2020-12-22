# reactive

源码

声明一个响应式对象，修改响应式对象后，依赖于响应式对象的函数会被执行

场景

watch

watchEffect

map

debugger

对同一个对象多次调用 reactive，vue3 会将生成的 proxy 存到 proxyMap 中，缓存起来
