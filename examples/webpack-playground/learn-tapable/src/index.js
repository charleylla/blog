const {
  // SyncHook,
  // SyncBailHook,
  // SyncWaterfallHook,
  // SyncLoopHook,
  // AsyncParallelBailHook,
  AsyncSeriesBailHook,
  // AsyncSeriesHook,
  // AsyncParallelHook,
  // AsyncSeriesWaterfallHook
} = require('tapable')

class AsyncSeriesWaterfallHook {
  constructor(args) {
    // 存放预定义参数
    this.args = [...args]
    // 存放订阅者
    this.tasks = []
    // 存放订阅者的 type
    this.events = []
  }

  // 注册事件
  tapPromise(event = '', handler) {
    this.events.push(event)
    this.tasks.push(handler)
  }
  promise(...args) {
    let [first, ...other] = this.tasks
    return other.reduce((p, n) => {
      // 将上一个 Promise resolve 的数据传递到下一个钩子函数中
      return p.then((...data) => n(...data))
    }, first(...args))
  }
}

class LearnTasks {
  constructor() {
    this.hooks = {
      learnPlan: new AsyncSeriesBailHook(['person'])
    }
  }
}

const learnTasks = new LearnTasks()

// 注册事件
learnTasks.hooks.learnPlan.tapPromise('学习 React by Promise', (work) => {
  return new Promise((res) => {
    setTimeout(() => {
      res('在学习 React by Promise')
    }, 1000)
  })
})
learnTasks.hooks.learnPlan.tapPromise('学习 Node by Promise', (work) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(work)
      res('在学习 Node by Promise')
    }, 2000)
  })
})
learnTasks.hooks.learnPlan.tapPromise('学习 Webpack by Promise', (work) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(work)
      res()
    }, 3000)
  })
})

learnTasks.hooks.learnPlan.promise('Mike').then(() => {
  console.log('学习任务做完了')
})