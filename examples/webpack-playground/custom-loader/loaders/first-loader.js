function asyncLoader(source){
  const callback = this.async()
  setTimeout(() => {
    console.log('异步操作完成')
    callback(null,source)
  },500)
}

module.exports = asyncLoader