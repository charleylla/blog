function cssLoader(source){
  // 匹配  url(xxx.png)
  const reg = /url\((.+?)\)/g
  // 匹配 require 语法
  const requireReg = /require\((.+?)\)/g
  // require 语句和非 require 语句的分隔符
  const sep = '__CSS_REPLACE_SEP__'
  let cssStr = `let _css = `
  const sourceAfterReplace = source.replace(reg,(match,g) => {
    return 'url(' + `${sep}require(${g})${sep}` + ')'
  })

  // 获取分割后的数组 
  const sourceAfterSplit = sourceAfterReplace.split(sep)
  sourceAfterSplit.forEach(str => {
    if(requireReg.test(str)){
      cssStr += str + '+'
    }else{
      cssStr += JSON.stringify(str) + '+'
    }
  })
  // 去掉最后一个 + 号
  cssStr = cssStr.substr(0,cssStr.length - 1)

  console.log(`${cssStr}; module.exports = _css`)
  return `${cssStr}; module.exports = _css`
}

module.exports = cssLoader