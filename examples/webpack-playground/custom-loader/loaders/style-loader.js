const loaderUtils = require('loader-utils')
// styleLoader 本身不作处理
function styleLoader() { }

styleLoader.pitch = function (remainingRequests) {
  console.log(
    loaderUtils.stringifyRequest(
      this,
      '!!' + remainingRequests
    )
  )
  // 这里使用剩下的 loader 先处理样式
  // require 的是一个文件路径，而不是上面的脚本
  // 文件路径的脚本运行后才会生成一个 css 样式
  // 这样就拿到了最终的 css 了
  // 指定这个脚本返回的是一个 css
  let str = `
    const style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequests)})
    document.head.appendChild(style)
  `
  return str
}

styleLoader.raw = true

module.exports = styleLoader