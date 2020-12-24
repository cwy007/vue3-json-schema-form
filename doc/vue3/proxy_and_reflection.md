# proxy and reflection

[代理(Proxy)和反射(Reflection)](https://www.w3cplus.com/javascript/proxy-reflect.html)

obj
array
length
set

代理
虚拟化
响应特定操作的陷阱函数

反射

对象方法的默认特性

相同的底层操作

代理陷阱

覆写 js 对象的一些内建特性

拦截和修改

使用反射 api 使用内建特性

目标 target
处理程序 handler

定义一个或多个陷阱的对象

代理中，除了陷阱外，其余操作均使用默认特性

没有任何陷阱的处理程序，等价于转发代理
将所有的操作转发给目标

代理不存储属性

陷阱代理

创建一个属性值为数字的对象

设置值的默认特性

target, key, value, receiver
receiver 操作发生的对象，通常是代理

Reflect.set() 是 set 陷阱 trap 对应的反射方法和默认特性
在陷阱中使用

throw new TypeError('Property must be a number')
Reflect.set() // => true / false

Reflect.set(trapTarget, key, value, receiver)

proxy.count = 1
set 陷阱被调用

trapTarget target
key count
value 1
receiver proxy

trapTarget.hasOwnProperty()

set 代理陷阱，可以拦截写入属性的操作
get 代理陷阱，可以拦截读取属性的操作

get 陷阱，object shape

读取不存在的属性，返回 undefined

检查对象接口
回避问题

对象结构，对象中所有可用属性和方法的集合
对象接口校验

源对象（代理目标）
操作发生的对象（通常是代理）

Reflect.get() 返回属性的默认值

```js
if (!(key in receiver)) {
  throw new TypeError('Property ' + key + 'doesnt exist')
}
```

通过 in 操作符判断 receiver 上是否有被读取的属性

防止 receiver 代理含有 has 陷阱
检查 trapTarget 可能会忽略掉 has 陷阱，得到错误结果

默认行为

用 in 操作符检测给定对象是否有某个属性

自有属性或原型属性匹配

string / symbol

has 陷阱隐藏已有属性

Reflect.has(trapTarget, key) 返回 in 操作符的默认响应

has trap
Reflect.has()

in

用 deleteProperty() 陷阱防止删除属性

delete 操作符
从对象中移除属性

nonconfigurable

Object.defineProperty(target, 'name', { configurable: false })

deleteProperty
delete

Reflect.deleteProperty() 为 deleteProperty 陷阱提供默认实现

结合二者改变 delete 的表现行为

如果希望保护属性不被删除，而且在严格模式下不抛出错误，这个方法非常适用

## 原型代理陷阱

Object.getPrototypeOf()
Object.setPrototypeOf()

getPrototypeOf()
setPrototypeOf()

trapTarget
proto

getPrototypeOf() obj/null
setPrototypeOf() when failed return false, non-false value means success

Reflect 陷阱的默认行为

Object.setPrototypeof()
Object.getPrototypeOf() 给开发者使用的高级操作

Reflect.setPrototypeOf()
Reflect.getPrototypeOf() 底层操作

[[GetPrototypeOf]]
Reflect.getPrototypeOf() 为 内部[[SetPrototypeOf]]操作的包装器

参数不是对象
Reflect.getPrototypeOf() 抛出错误
Object.getPrototypeOf() 操作执行前，将参数强制转换为一个对象

Reflect.setPrototypeOf() true/false
Object.setPrototypeOf() 失败时抛出错误
Object.setPrototypeOf() 成功时，将第一个参数作为返回值

let target1 = {};
let result1 = Object.setPrototypeOf(target1, {});
console.log(result1 === target1); // => true

在 Object 和 Reflect 上有很多看似重复的方法，但在所有代理陷阱中一定要使用 Reflect 上的方法

## 对象可扩充性陷阱

Object.preventExtensions()
Object.isExtensible()

拦截并调用底层对象

相比高级功能方法而言，底层的具有更严格的错误检查

## 属性描述陷阱

属性特性 property attribute

Object.defineProperty()

访问器属性

只读或不可配置

Object.getOwnPropertyDescriptor()

trapTarget
key
descriptor

代理陷阱

直接返回 true，不调用 Reflect 上对应的方法，让方法默认失效

defineProperty

enumerable
configurable
value
writable
get
set

descriptor 不是第三个参数的实际引用
一个只包含那些被允许使用的属性的新对象
忽略描述符上的所有非标准属性

限制

ownKeys 陷阱

拦截内部方法 [[OwnPropertyKeys]]
Object.keys()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.assign()

自有属性的键名

js 中下划线符号表示字段是私有的

函数代理中的 apply 和 construct 陷阱
函数有两个内部方法 [[Call]] [[Construct]]

trapTarget 被执行的函数
thisArg 函数被调用时内部 this 的值
argumentList 传递给函数的参数数组

使用了函数代理，其目标对象会被视为函数

代理函数
目标函数

instanceof 通过原型链确定此信息

原型链查找不受代理影响

apply
construct

验证所有参数都属于特定类型
使用 apply 陷阱

在 sumProxy 中封装 sum()
拦截函数调用

## 不使用 new 调用构造函数

new.target 元素属性，是 new 调用函数时对函数的引用

```js
function Numbers(...values) {
  // 用new被调用的行为已经被设定
  if (typeof new.target === 'undefined') {
    throw new TypeError('this function must be called with new')
  }
  this.values = values
}
```

在不能控制要被修改函数行为的函数，这时使用代理
函数定义在无法修改的的代码中

## 覆写抽象基类构造函数

Reflect.construct(target, argumentsList, newTarget)

创建可调用类构造函数只能通过代理来进行

在创建代理后，代理不能脱离目标

安全：通过 api 提供一个对象
在任意时间点切断访问
撤销代理

revocable 可撤销的，可废除的
proxy.revocable()

proxy 可被撤销的代理对象
revoke 撤销代理要调用的函数

触发代理上陷阱的操作

对象中的键始终作为字符串传递

Reflect.set() 表示默认行为

元素
成员

Reflect.deleteProperty(trapTarget, index)

通过代理间接访问

代理会将他们的特性透穿给目标

从构造函数中可以返回一个代理

默认操作继续执行到原型上

自有属性
原型属性

在原型上使用 get 陷阱

[[Get]]
内部方法

过程

代理陷阱

throw new ReferenceError('key doesnt exist')

Object.create()

代理的原始目标和要操作的目标

trapTarget 和 receiver 是不同的对象

代理被用作原型时，trapTarget 是原型对象
receiver 是实例对象

内部方法 [[Set]]

实例
原型

新属性的创建

沿着原型链依次搜索后续对象的自有属性

找到指定的名称

没有更多的原型

使用 in 操作符时，会自动搜索原型

不用传递 receiver，只操作与 target 相等的 trapTarget

类的 prototype 属性是不可写的 writable false

函数的 prototype 属性没有限制，可以用代理将它重写

let shape = new Square(2, 6)
let shapeProto = Object.getPrototypeOf(shape)
let secondLevelProto = Object.getPrototypeOf(shapProto)

js class 中定义的方法会被自动添加到原型上
