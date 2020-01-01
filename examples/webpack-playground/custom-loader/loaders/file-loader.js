const loaderUtils = require('loader-utils')

// source 就是资源路径
function fileLoader(source){
  const options = loaderUtils.getOptions(this)
  const { outputPath } = options
  // 生成 MD5 文件
  const filename = loaderUtils.interpolateName(this,outputPath + '/[contenthash].[ext]',{
    content:source
  })
  // 发射文件
  // 调用 webpack 提供的方法发射文件，当然也可以自己发射
  this.emitFile(filename,source)
  // 目的是拿到文件的路径
  // 先将图片发射到目标文件夹，然后返回一个 js 模块
  return `module.exports = '${filename}'`
}
// 需要开启二进制，否则无法正常使用
fileLoader.raw = true

module.exports = fileLoader