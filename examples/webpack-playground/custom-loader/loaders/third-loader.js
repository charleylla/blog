function thirdLoader(source){
  console.log('third loader')
  return source
}

thirdLoader.pitch = function(){
  console.log('third loader pitch')
}

module.exports = thirdLoader