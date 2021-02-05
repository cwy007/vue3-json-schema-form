const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = {
  publicPath: process.env.TYPE === 'github.io' ? './' : '/',
  // configureWebpack(config) {
  //   console.log(config.plugins)
  // },
  chainWebpack(config) {
    // console.log('config.plugin', config.plugin) // config.plugin [Function: plugin]
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
