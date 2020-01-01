const loaderUtils = require('loader-utils')
function styleLoader() { }

styleLoader.pitch = function (remainingRequests) {
  console.log(
    loaderUtils.stringifyRequest(
      this,
      '!!' + remainingRequests
    )
  )
  let str = `
    const style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequests)})
    document.head.appendChild(style)
  `
  return str
}

module.exports = styleLoader