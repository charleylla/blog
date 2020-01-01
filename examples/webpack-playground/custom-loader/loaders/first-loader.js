function firstLoader(source){
  console.log('first loader')
  return source
}

// 先执行 pitch，再执行 loader
firstLoader.pitch = function(){
  console.log('first loader pitch')
}

module.exports = firstLoader