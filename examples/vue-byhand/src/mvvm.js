function Vue(options = { data:{},computed:{} }) {
  const { el,data,computed } = options;
  // 保存 options
  this.$options = options;
  this._data = data;
  // 数据劫持
  observe(data)
  // 属性代理
  delegate(data,this)
  // 绑定计算属性
  initComputed(computed,this)
  // 编辑模板
  new Compile(el,this)
}

function delegate(data,vm){
  Object.keys(data).forEach(attr => {
    Object.defineProperty(vm,attr,{
      configurable:true,
      enumerable:true,
      get(){
        // 获取属性值时从 _data 上获取
        return vm._data[attr]
      },
      set(newValue){
        // setter 设置 _data
        // 这回触发 _data 的 setter
        vm._data[attr] = newValue
      }
    })
  })
}

function initComputed(computed,vm){
  Object.keys(computed).forEach(key => {
    // 将 computed 的属性定义到 vm 上
    Object.defineProperty(vm,key,{
      configurable:true,
      enumerable:true,
      // computed 中的函数或者对象的 get 方法作为 getter
      // 取值时将会从返回值进行获取
      get:typeof computed[key] === 'function' ? computed[key] : computed[key].get
    })
  })
}