function Vue(options = { data:{} }) {
  const { el,data } = options;
  // 保存 options
  this.$options = options;
  this._data = data;
  // 数据劫持
  observe(data)
  // 属性代理
  Object.keys(data).forEach(attr => {
    Object.defineProperty(this,attr,{
      configurable:true,
      enumerable:true,
      get(){
        // 只需要代理 getter
        // 获取属性值时从 _data 上获取
        return this._data[attr]
      },
    })
  })
}

function observe(data){
  // 如果是对象则递归劫持，排除 null
  if(data && typeof data === 'object'){
    new Observe(data)
  }
}

function Observe(data) {
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
        // 设置新属性时进行监听
        // 只能监听已存在的属性，不能动态的添加属性
        observe(val)
      }
    })
    // 对下级属性继续进行监听
    observe(val)
  })
}