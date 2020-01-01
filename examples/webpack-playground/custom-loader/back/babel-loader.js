
const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function babelLoader(source){
  // 获取 loader 的配置
  const options = loaderUtils.getOptions(this)
  // 异步调用
  const callback = this.async()
  babel.transform(source,{
    ...options
  },function(err,result){
    callback(err,result.code)
  })
}

module.exports = babelLoader;