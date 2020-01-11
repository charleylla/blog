const { 
  // SyncHook,
  // SyncBailHook,
  // SyncWaterfallHook,
  // SyncLoopHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
  AsyncParallelHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

class SyncLoopHook {
  constructor(args){
    // 存放预定义参数
    this.args = [...args]
    // 存放 call 函数调用的参数是
    this.callArgs = []
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
    this.callArgs = args;
    // 裁剪参数
    const argsToDispatch = args.slice(0,this.args.length)
    let ret = undefined;
    for(let task of this.tasks) {
      ret = task && task(...argsToDispatch)
      // 一旦某个函数的返回值不为 undefined，就重新运行
      if(ret !== undefined){
        return this.call(...this.callArgs)
      }
    }
  }
}

class LearnTasks {
  constructor(){
    this.hooks = {
      timeline: new SyncLoopHook(['person'])
    }
  }
}

const learnTasks = new LearnTasks()
// 注册事件
learnTasks.hooks.timeline.tap('学习基础知识',(person) => {
  const flag = Math.random() > 0.5 ? true : undefined
  console.log(person + '在学习基础知识',flag)
  return flag;
})
learnTasks.hooks.timeline.tap('学习中级知识',(person) => {
  const flag = Math.random() > 0.5 ? true : undefined
  console.log(person + '在学习中级知识',flag)
  return flag;
})
learnTasks.hooks.timeline.tap('学习高级知识',(person) => {
  console.log(person + '在学习高级知识')
})
learnTasks.hooks.timeline.tap('学习养生知识',(person) => {
  console.log(person + '在学习养生知识')
})
// 派发事件
learnTasks.hooks.timeline.call('Mike')