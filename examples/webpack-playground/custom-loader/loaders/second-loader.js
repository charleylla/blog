function secondLoader(source){
  console.log('second loader')
  return source
}

secondLoader.pitch = function(){
  console.log('second loader pitch')
}

module.exports = secondLoader