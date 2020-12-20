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
