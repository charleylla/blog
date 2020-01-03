const loaderUtils = require('loader-utils')
// 如果按照顺序调用，source 是一个 module.exports 的 js 脚本
// 然后我们需要将这段脚本中的 css 提取出来插入到 style 中
// 我们是无法直接将 module.exports 这样的代码转换为 css 的
// 或许可以使用 eval
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

module.exports = styleLoader