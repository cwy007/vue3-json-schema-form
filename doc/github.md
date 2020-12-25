# github

[shields.io/](https://shields.io/)

github workflow

自动化构建

travis ci

circle ci

github action

[github.com/features/actions](https://github.com/features/actions)

[github.com/actions/checkout](https://github.com/actions/checkout)

在项目中绑定 codecov

[codecov.io](https://codecov.io/)

## npm

发布类库到 npm

```json
{
  "name": "vue3-json-schema-form",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    // 钩子，在执行 npm publish 时，会先自动执行这个命令
    "prepublishOnly": "npm run build",
  },
  "publishConfig": { // 发布时的 npm registry 地址
    "registry": "https://registry.npmjs.org/"
  },
  // 通过 files 指定要发布的代码
  "files": ["dist"],
  "main": "dist/index.common.js", // import 类库时的入口文件
  "dependencies": {
    "vue": "^3.0.0",
  },
  "devDependencies": {
    "@types/jest": "^24.0.19",
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}

```
