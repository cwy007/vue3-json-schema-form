const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  // configureWebpack(config) {
  //   console.log(config.plugins)
  // },
  chainWebpack(config) {
    console.log('config.plugin', config.plugin) // config.plugin [Function: plugin]
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
