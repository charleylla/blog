
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
    // 配置 babel 打包的文件名
    // 该文件会被 webpack 用作 source-map 的名字
    filename:this.resourcePath.split(path.sep).pop()
  },function(err,result){
    callback(err,result.code,result.map)
  })
}

module.exports = babelLoader;