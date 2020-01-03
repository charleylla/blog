const loaderUtils = require('loader-utils')
const fileLoader = require('./file-loader')
const mime = require('mime')

function urlLoader(source){
  const options = loaderUtils.getOptions(this)
  // 获取大小限制
  const { limit } = options;
  // limit 比 source 大，则需要将图片打包为 base64
  // buffer 可以直接转换为 base64
  if(limit && limit > source.length){
    // 获取文件的 mime
    const mimeType = mime.getType(this.resourcePath)
    // "data:image/png;baes64,"
    const sourceBase64 = source.toString('base64')
    return `
      module.exports = "data:${mimeType};base64,${sourceBase64}"
    `
  }
  return fileLoader.call(this,source)
}
// 处理二进制文件都需要开启 raw 选项
urlLoader.raw = true

module.exports = urlLoader