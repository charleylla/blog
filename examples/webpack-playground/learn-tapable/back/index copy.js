const { 
  // SyncHook,
  // SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
  AsyncParallelHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

class SyncBailHook {
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
      const ret = task && task(...argsToDispatch)
      // 如果某个函数的返回值不为 undefined，就不执行剩下的钩子
      if(ret !== undefined) return;
    }
  }
}

class LearnTasks {
  constructor(){
    this.hooks = {
      timeline: new SyncBailHook(['person'])
    }
  }
}

const learnTasks = new LearnTasks()
// 注册事件
learnTasks.hooks.timeline.tap('学习基础知识',(work) => {
  console.log('学习基础知识 ing')
  return '学习 HTML/CSS/JS...'
})
learnTasks.hooks.timeline.tap('学习中级知识',(work) => {
  console.log(work)
  return '学习 jQuery/Bootstrap/Vue/React/Node...'
})
learnTasks.hooks.timeline.tap('学习高级知识',(work) => {
  console.log(work)
  return '学习单元测试/前端工程化/框架源码/数据结构算法....'
})
// 派发事件
learnTasks.hooks.timeline.call('Mike')