function observe(data){
  // 如果是对象则递归劫持，排除 null
  if(data && typeof data === 'object'){
    new Observe(data)
  }
}

function Observe(data) {
  // 每一个对象拥有一个 dep
  const dep = new Dep()
  Object.keys(data).forEach(attr => {
    let val = data[attr]
    Object.defineProperty(data,attr,{
      configurable:true,
      enumerable:true,
      get(){
        // 编译模板的时候，会首次调用 getter
        // 创建 Watcher 的时候将 target 上设置 Watcher 实例
        Dep.target && dep.subscribe(Dep.target)
        return val
      },
      set(newValue){
        console.log('数据更新了')
        val = newValue
        // 设置新属性时进行监听
        // 只能监听已存在的属性，不能动态的添加属性
        observe(val)
        // 设置的时候发布
        dep.notify()
      }
    })
    // 对下级属性继续进行监听
    observe(val)
  })
}