const { 
  // SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
  AsyncParallelHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

class SyncHook {
  constructor(args){
    // 存放预定义参数
    this.args = [...args]
    // 存放订阅者
    this.tasks = []
    // 存放订阅者的 type
    this.events = []
  }

  // 注册事件
  tap(event = '',handler){
    this.events.push(event)
    this.tasks.push(handler)
  }

  // 派发事件
  call(...args){
    // 裁剪参数
    const argsToDispatch = args.slice(0,this.args.length)
    for(let task of this.tasks) {
      task && task(...argsToDispatch)
    }
  }
}

class MissionToday {
  constructor(){
    this.hooks = {
      morningTodo: new SyncHook(['person'])
    }
  }
}

const missionToday = new MissionToday()
// 注册事件
missionToday.hooks.morningTodo.tap('起床',(person) => {
  console.log(`${person} 准备起床`)
})
missionToday.hooks.morningTodo.tap('洗漱',(person) => {
  console.log(`${person} 准备洗漱`)
})
missionToday.hooks.morningTodo.tap('吃早饭',(person) => {
  console.log(`${person} 准备吃早饭`)
})
// 派发事件
missionToday.hooks.morningTodo.call('Mike')