const path = require('path')

module.exports  = {
  mode:'development',
  // 配置 loader 的别名
  resolveLoader: {
    // loader 模块的后缀
    moduleExtensions: ['-loader'],
    modules:[
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:[
          'first',
          'second',
          'third',
        ]
      }
    ]
  }
}