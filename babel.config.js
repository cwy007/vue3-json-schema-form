module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: ['@vue/babel-plugin-jsx'],
  // 关闭 mergeProps 合并属性的功能，默认相同属性名的值会被合并到一起 onChange
  // plugins: [['@vue/babel-plugin-jsx', { mergeProps: false }]],
}
