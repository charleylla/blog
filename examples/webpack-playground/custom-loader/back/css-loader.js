function cssLoader(source){
  const reg = /url\((.+?)\)/g
  const requireReg = /require\((.+?)\)/g
  const sep = '__CSS_REPLACE_SEP__'
  let cssStr = `let _css = `
  const sourceAfterReplace = source.replace(reg,(match,g) => {
    return 'url(' + `${sep}require(${g})${sep}` + ')'
  })
  // 获取分割后的数组 
  // console.log(sourceAfterSplit.join('+'))
  const sourceAfterSplit = sourceAfterReplace.split(sep)
  sourceAfterSplit.forEach(str => {
    if(requireReg.test(str)){
      cssStr += str + '+'
    }else{
      cssStr += JSON.stringify(str) + '+'
    }
  })
  cssStr = cssStr.substr(0,cssStr.length - 1)

  // return `
  //   const sourceAfterSplit = ${sourceAfterReplace}.split(${sep})
  //   module.exports = ${sourceAfterSplit}.join('')
  // `
  console.log(`${cssStr}; module.exports = _css`)
  return `${cssStr}; module.exports = _css`
}

module.exports = cssLoader