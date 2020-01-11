const { 
  // SyncHook,
  // SyncBailHook,
  // SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
  AsyncParallelHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

class SyncWaterfallHook {
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
    let ret = undefined;
    for(let task of this.tasks) {
      if(task){
        // 第一个钩子执行时传入裁剪后的参数
        // 如果某个函数产生了不为 undefined 的返回值，就将 ret 传入
        ret = ret !== undefined ? task(ret) : task(...argsToDispatch)
      }
    }
  }
}

class LearnTasks {
  constructor(){
    this.hooks = {
      timeline: new SyncWaterfallHook(['person'])
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
learnTasks.hooks.timeline.tap('学习养生知识',(work) => {
  console.log(work)
  return '如何治疗颈椎病/如何才能不焦虑...'
})
// 派发事件
learnTasks.hooks.timeline.call('Mike')