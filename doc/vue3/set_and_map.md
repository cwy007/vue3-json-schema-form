# set and map

## Set

对比数组

what：

集合，set
array：一些列有序的数据集合，可以通过下表访问
set：一系列无序没有重复值的集合，没有下标

set 只能通过构造函数创建

成员的个数，成员
const s = new Set()
add 每次只能添加一个值
s.add(1)

实例方法和属性
方法

```js
const set = new Set()
// 可以链式调用
set.add(1).add(2)
set.has(1)
// 删除一个
set.delete(1)
// 清空
set.clear()
// 遍历成员
// 集合本身是无序
set.forEach(function(value, key, setSelf) {
  // set 中 value == key 为了接口的统一 map，app
  // set === setSelf 集合本身
  // thisValue 指定this
}, thisValue)
```

属性
set.size

forEach 可用于遍历 Set，该方法接收两个参数，第一个参数是回调函数，第二个参数指定了回调函数中的 this 指向，如果省略了第二个参数，或者其值为 null 或 undefined，this 则指向全局对象。

因为箭头函数中没有 this，即使传入了第二个参数，也不会生效，相当于省略了第二个参数，所以输出的 this 值为全局对象 window，本题答案为 A.

添加、删除、遍历成员

构造函数参数，方便添加成员

arr
string
arguments
NodeList
Set

```js
// 数组作为参数
const s = new Set([1, 2, 1])
console.log(s)

new Set('hi')

function foo() {
  new Set(arguments)
}

new Set(document.querySelectorAll('p'))

new Set(new Set(s)) // 相当于赋值了一个set
```

注意事项
如何判断重复值的
什么时候使用 set

```js
const s = new Set([1, 2, 1])
1 === 1
// 遵循严格相等
// exception： NaN
// set 中 NaN === NaN
//
s.add({}).add({})
s.add(NaN).add(NaN)
// 对象的地址引用是否为同一个
//
// when
// 对数组和字符串去重的时候
// 不需要通过下标访问，只需要遍历的时候，可以使用set
// 为了使用 set 提供的方法和属性的时候
//
```

应用情况

```js
// 数组去重
const s = new Set([1, 2, 1])

const a = [...s]

// 字符串的去重
const str = [...new Set('aaabbbcc')].join('')

// set 中存放dom元素
s.forEach()
```

## Map

object

区别

map 映射

本质上一样

简直对的集合

```js
// 键值对的集合
const person {
  name: 'alex',
  age: 18
}

const m = new Map()
m.set('name', 'alex')
m.set('age', 18)
// Map(2) {"name" => "alex", "age" => 18}

// object 对象一般用字符串作为键
// [{}]: '24'

// map 中任意类型都可以作为 map 的键
// array, object, set, string
m.set(true, 'true')
m.set({}, 'object')
m.set(new Set([1,2]), 'set')
m.set(undefined, 'undefined')
// Map(6) {"name" => "alex", "age" => 18, true => "true", {…} => "object", Set(2) => "set", …}
```

map
实例方法和属性

set

```js
// 对比学习
// 方法
const m = new Map()
// {}
// 使用set添加新成员，键名相同时，会覆盖
m.set('age', 28).set(true, 'true')

// map 可以单独获取某个单独的成员
// new Set() 只能通过 forEach 遍历
m.get(true)

// 指定的键是否存在
m.has('name')

// 删除
// 删除不存在的成员，不会报错
m.delete('age')

// 清空
m.clear()

m.forEach((value, key, m) => {
  //
}, this)

// 属性
//
m.size

const m = new Map()
m.set('name', 'cwy')
  .set('sex', 'man')
  .set('age', 28)
m.delete('age')
m.has('name')
```

本题主要考查 Map 和 Set 实例的属性和方法。
Set 和 Map 实例共有的方法：forEach、has、clear、delete。
Set 和 Map 实例共有的属性：size。
Set 实例特有的方法：add。
Map 实例特有的方法：set、get。

Map 构造函数的参数

```js
// 键值对的集合
// 只能传二维数组，体现出键和值
// map instance
const m = new Map([
  ['name', 'cwy'],
  ['age', 28],
])
// {"name" => "cwy", "age" => 28}

new map(
  new Set([
    ['name', 'cwy'],
    ['age', 28],
  ]),
)

new Map(m) // 相当于复制一个新的map

const m1 = new Map([
  ['a', 111],
  ['b', 222],
])
const m2 = new Map(m1)

m2.set('c', 333)
// Map(3) {"a" => 111, "b" => 222, "c" => 333}
// m2
// Map(3) {"a" => 111, "b" => 222, "c" => 333}
// m1
// Map(2) {"a" => 111, "b" => 222}
```

注意事项
如何判断键名相同，覆盖

```js
// 一般遵循严格想的===
// exception: map 认为 NaN === NaN
m.set(NaN, 1).set(NaN, 2)
```

使用场景

什么时候使用 map，而不使用对象

```js
// 只需要key, value 的结构
// 使用其他的数据 eg：arr 作为key
// 想要使用map提供的方法
//
// 什么时候使用对象：模拟现实世界的实体时使用 object，语义
//

// 只需要键值对的结构时，推荐使用 map
//
```

```js
const [p1, p2, p3] = document.QuerySelectorAll('p')

const m = new Map()
m.set(p1, 'red')
m.set(p2, 'green')
m.set(p3, 'blue')

new Map([
  ['p1', 'red'],
  ['p2', { color: 'red', fontSize: '40px' }],
])
// Map(2) {"p1" => "red", "p2" => {…}}[[Entries]]0: {"p1" => "red"}1: {"p2" => Object}key: "p2"value: {color: "red", fontSize: "40px"}size: (...)__proto__: Map

m.forEach((value, key) => {
  //
})
```

set **无序和不重复**

map **学过的数据类型都可以作为键**

Set
add

Map
set
get

has
delete
clear
forEach
size

constructor
Set
array-like
array
string

Map
2 维数组

===
NaN
