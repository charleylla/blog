// 使用 less 模块解析 less 文件，生成 css
const less = require('less')

function lessLoader(source){
  let css = ''
  const callback = this.async()
  // 解析 less
  less.render(source).then((output) => {
    css = output.css
    callback(null,css)
  })
}

module.exports = lessLoader