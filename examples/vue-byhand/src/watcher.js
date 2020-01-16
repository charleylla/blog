function Watcher(vm,matchAttrs,fire){
  this.$vm = vm;
  this.matchAttrs = matchAttrs;
  this.fire = fire;
  // 将 Dep.target 设置为 Watcher 的实例
  Dep.target = this;
  getTextValue(this.matchAttrs,this.$vm);
  Dep.target = null;
}

Watcher.prototype.update = function(){
  const newValue = getTextValue(this.matchAttrs,this.$vm)
  this.fire(newValue)
}