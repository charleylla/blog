
const babel = require('@babel/core')
const loaderUtils = require('loader-utils')
const path = require('path')
function babelLoader(source){
  // 获取 loader 的配置
  const options = loaderUtils.getOptions(this)
  // 异步调用
  const callback = this.async()
  babel.transform(source,{
    ...options,
    sourceMap:true,
    // options 配置文件 https://babeljs.io/docs/en/options
    // 是否开启 ast
    // ast: true,
    // source map 的文件名
    // 本质是 babel 打包的文件的文件名
    // 会被 webpack 用作 source-map 的名字
    // 因为 webpack 会合并 bundle 文件
    filename:this.resourcePath.split(path.sep).pop()
    // filename:'custom-source-map'
  },function(err,result){
    callback(err,result.code,result.map)
  })
}

module.exports = babelLoader;