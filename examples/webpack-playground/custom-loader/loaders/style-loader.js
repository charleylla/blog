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
  // const str = `require(${loaderUtils.stringifyRequest(this,'!!',x)})`
  // console.log(str)
  // return `module.exports = ${str}`
}

module.exports = styleLoader