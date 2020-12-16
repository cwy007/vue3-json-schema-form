// https://www.imooc.com/learn/763
// typescript basics
// 微软开发，js超级，遵循es6
// 基于类的面向对象变成
// 2016 angular2
// 前端脚本语言发展的主要方向

// 内容介绍
// 学习ts的好处、开发环境、概念语法和特性
// es5，es6
// 规范 js es5
// ts es6
// js 开发经验，变量声明，方法声明，if程序控制

// ts的优势，为什么要学习 ts
// ts 支持 es6 规范
// 强大的ide支持：类型检查、语法提示、重构
// augular2 的开发语言，2016.9 使用 ts 开发

// 搭建ts开发环境
// 安装 compiler，将ts转成 js
// es2015、es6
// 使用在线 compiler开发
// https://www.typescriptlang.org/play

// ts 本地编译

// 字符串
// 多行字符串 ``
// 字符串模版 `${}`
// 自动拆分字符串

// 参数新特性
// 参数类型，减少开发过程中的错误
// string, number, any, boolean,
// 变量、方法、参数
// 如何声明类型，类型推断，可以添加声明的位置
// 自定义类型
// class、interface、type

class Person {
  name: string;
  age: number;
}

const zhangsan: Person = new Person();
zhangsan.age = 28;

// 参数的默认值
// 带默认值的参数要声明在后面

// 可选参数
// a?
// 在方法体中处理可选参数未填的情况

// rest spread
// 任意数量的方法参数
// 收集，展开

// 可以传入任意数量参数的方法
function bar(...args) {
  args.forEach(arg => {
    console.log(arg);
  });
}
bar(1, 2, 3);

// function foo(a, b) {
//   console.log(a);
//   console.log(b);
// }
// const vars = [1, 2];
// foo(...vars);

// generator
// 控制函数的执行过程，手动控制代码的执行
// yield
// 生成器 generator
function* doSomething() {
  console.log("start");
  yield 3; // 第一次调用next执行完这个语句
  console.log("finish"); // 第2次调用next从这一行开始向下执行
  // ...
}
// 迭代器 iterator
const bazz = doSomething();
bazz.next();

// destructuring 结构表达式

// 箭头函数
// 消除 this 关键字的带来的问题

// for of，es6 添加，可以用 break，忽略掉属性
// forEach 忽略属性，不能用 break，es5
// for in 循环对象属性的名字，es5

// for of 循环 string 会将每一个字符打印出来

// 面向对象的特性
// 类的定义
// 访问控制符：
// public, 默认值，类的外部可以访问
// private, 类的内部访问
// protect, 类的内部和子类中访问
//
class FooBar {
  constructor(name: string) {
    this.name = name;
    console.log("hahaha");
  }
  name;
  eat() {
    console.log("eating");
  }
}
const p1 = new FooBar("xiaoming");
p1.name = "";
p1.eat();

// extends super
// 继承关系
// constructor
// 子类的构造函数要调用父类的构造函数 super

// generic 泛型，限制集合的类型
// 参数化的数据类型
// 指定数组只能方默一类型的元素
//
// const workers: Array<Person> = [];

// interface 接口
// 建立某种代码约定，使得开发在调用其默个方法或创建新的类时必须遵循接口定义的代码也定
// implements 声明某个类实现了某个接口

// 使用接口声明类的属性
//
// interface IPerson {
//   name: string;
//   age: number;
// }

// class Person2 {
//   constructor(public config: IPerson) {}
// }
// const p2 = new Person2({ name: "cwy", age: 28 });
// console.log(p2);

// 接口: 声明方法
// 声明类必须要实现的方法
//
// interface Animal {
//   eat();
// }
// class Sheep implements Animal {
//   eat() {
//     console.log("i eat grass");
//   }
// }
// class Tiger implements Animal {
//   eat() {
//     console.log("i eat meat");
//   }
// }

// 模块 module
// 帮助开发者将代码分割为可重用的单元。
// 开发者可以决定将module中的那些资源（类，方法，变量）暴露出去供外部使用，
// 哪些资源只在module中使用

// ts 注解 annotation
// 为程序的元素（类，方法，变量）加上更直观明了的说明，这些说明
// 与程序的业务逻辑无关，而是供指定的工具或框架使用
// 告诉程序框架如何处理一段程序

// *.d.ts 类型定义文件
// 类型文件
// 概念
// 帮助开发者在ts中使用已有的js的工具包 eg：JQuery
// ts module 以ts类或module的方式暴露出来
