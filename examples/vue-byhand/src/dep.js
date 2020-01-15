function Dep(){
  this.subs = []
}

Dep.prototype.subscribe = function(watcher){
  this.subs.push(watcher)
}
Dep.prototype.notify = function(){
  this.subs.forEach(sub => sub.update())
}