# symbol

所有的 symbol 都是唯一的

watchEffect 中依赖的响应式数据发生变化，watchEffect 函数就会执行

provide ref

provide reactive

provide normal data

inject

js 中的 symbol 类型数据类似与 ruby 语言中的符号 symbol，内存地址唯一

```ruby
2.6.5 :002 > 'hello' === 'hello'
 => true
2.6.5 :003 > :hello === :hello
 => true
# 字符串内存地址不同
2.6.5 :011 > 'hello'.object_id
 => 70227837020600
2.6.5 :012 > 'hello'.object_id
 => 70227837005880
2.6.5 :013 >
# 符号内存地址不同
2.6.5 :014 > :hello.object_id
 => 1501468
2.6.5 :015 > :hello.object_id
 => 1501468

```

```js
Welcome to Node.js v14.5.0.
Type ".help" for more information.
> 'hello' === 'hello'
true
>
> Symbol('hello') === Symbol('hello')
false
>
```
