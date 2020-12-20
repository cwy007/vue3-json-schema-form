module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: [
    // 排在前面的文件类型会被优先处理，这里将 vue 放在后面，让它被最后处理
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    // tell Jest to handle *.vue files
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
}
