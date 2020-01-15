function Vue(options = { data:{} }) {
  const { el,data } = options;
  // 保存 options
  this.$options = options;
  this._data = data;
  // 数据劫持
  Object.keys(data).forEach(attr => {
    let val = data[attr]
    Object.defineProperty(data,attr,{
      configurable:true,
      enumerable:true,
      get(){
        return val
      },
      set(newValue){
        console.log('数据更新了')
        val = newValue
      }
    })
  })
}