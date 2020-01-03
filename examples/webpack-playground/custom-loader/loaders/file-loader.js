const loaderUtils = require('loader-utils')

function fileLoader(source){
  const options = loaderUtils.getOptions(this)
  const { outputPath } = options
  // 匹配路径，并打上 MD5 戳
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

// 在处理二进制资源时，需要开启 raw 选项
fileLoader.raw = true

module.exports = fileLoader