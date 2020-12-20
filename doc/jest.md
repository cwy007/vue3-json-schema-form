# jest

单元测试

程序员进阶

大厂要求写单元测试

项目质量保证

jest 作为 vue3 单元测试的框架

mocha + chai

chai assert

mocha

## why do you need to write unit tests?

检测 bug

测试用例

细分的条件转换

提升回归的效率

代码改动

版本

新增代码，不影响之前的老的功能

改代码的成本

跑单元测试

issue test

保证代码质量

覆盖率

使用 jest 收集覆盖率

测试用例迭代

数值衡量测试效果

[jestjs](https://jestjs.io/)

预设和清理

beforeEach

afterEach

beforeAll

afterAll

describe 有作用域

it

test

异步测试

Object.is

同步

done

done()

```js
it('', (done) => {
  setTimeout(() => {
    // expect
    done()
  }, 1000)
})

it('', () => {
  return new Promise((resolve) => {
    // expect
    resolve()
  })
})

it('', async () => {
  await wrapper.setProps({
    msg: '',
  })
  // expect
})

// vue dom 的更新是异步的
```

用 jest 写单元测试

用 @vue/test-utils 测试 vue 组件

## npm run test:unit -- --coverage

"test:unit": "vue-cli-service test:unit",

`--` 告诉 npm 后面的参数 `--coverage` 是加给 `npm run test:unit` 对应的
实际指令的 `vue-cli-service test:unit`

--coverage 为 jest 的参数

```bash

npm run test:unit -- --coverage

等价于

vue-cli-service test:unit --coverage
```

Stmts 语句

Branch 分支，对应判断条件 if else

Funcs 是否每一个函数都有被执行到

Lines 行覆盖率

run only test case with 'multi' in case name

npm run test:unit -- -t=multi
