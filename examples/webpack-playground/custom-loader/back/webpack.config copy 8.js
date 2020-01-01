const path = require('path')

module.exports  = {
  mode:'development',
  // 配置 loader 的别名
  resolveLoader: {
    modules:[
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
}