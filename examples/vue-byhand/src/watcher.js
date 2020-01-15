function Watcher(vm,matchAttrs,fire){
  this.$vm = vm;
  this.matchAttrs = matchAttrs;
  this.fire = fire;
  // 将 Dep.target 设置为 Watcher 的实例
  Dep.target = this;
  this.getTextValue();
  Dep.target = null;
}

Watcher.prototype.update = function(){
  const newValue = this.getTextValue()
  this.fire(newValue)
}

Watcher.prototype.getTextValue = function(){
  let val = this.$vm;
  // 手动获取 data，触发 getter，然后订阅事件
  this.matchAttrs.forEach((attr) => {
    val = val[attr]
  })
  return val
}