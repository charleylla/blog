const path = require('path')

module.exports  = {
  mode:'development',
  // 配置 loader 的别名
  resolveLoader: {
    alias:{
      first:path.resolve(__dirname,'loaders/first-loader'),
      second:path.resolve(__dirname,'loaders/second-loader'),
      third:path.resolve(__dirname,'loaders/third-loader'),
    }
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