# 主题系统

样式

交互

组件库的泛用性

核心的逻辑不变

SchemaForm

SchemaItem

ObjectField

ArrayField

multi-type
single-type
multi-select

input

textarea

widget 小部件

select

内部变法的逻辑

core

主题系统不同于样式主题

variables.css

css in jss

应用在应用运行的时候动态指定

动态性更好

非 css in jss 的样式主题系统在编译是指定

定制具体的组件

交互可以变法

组件的产出可以完全不同

dropdown

modal

统一接口后，所有的内容皆可以自定义

可以基于不同组件库来实现

主题单独打包

减少强依赖

分开打包

vue-cli

构建目标

应用

库

.common.js 使用 npm 安装使用

.umd.js 通过 script 标签之间在浏览器中可以使用的一种打包方式

环境变量的用法

[针对应用的打包指令](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%94%E7%94%A8)

"build": "vue-cli-service build"

针对库的打包

```js
// TYPE=lib 环境变量
// vue-cli-service build 为 vue-cli 提供的
// --target lib 指定被打包代码所在的目录
// --name index 指定生产的文件名称
// --no-clean 打包时不清空 dist 目录
// lib/index.ts 入口文件放在最后
//
"build:core": "TYPE=lib vue-cli-service build --target lib --name index --no-clean lib/index.ts",

"build:theme": "TYPE=lib vue-cli-service build --target lib --name theme-default/index --no-clean lib/theme-default/index.tsx",

"build": "rimraf dist && npm run build:core && npm run build:theme",
```

叶子节点表单项的渲染

不能 import

TODO

RawBindings
