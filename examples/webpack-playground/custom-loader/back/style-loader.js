function styleLoader(source){
  // less loader 将 less 转换为 css
  // style loader 将 css 插入到 style 标签中
  
  // 使用 JSON.stringify 将 css 转换为字符串
  let str = `
    const style = document.createElement('style')
    style.innerHTML = ${source}
    document.head.appendChild(style)
  `

  // 返回创建 style 标签的脚本
  return str
}

module.exports = styleLoader