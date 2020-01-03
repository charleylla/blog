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
      },
      {
        test:/\.png|jpg|jpeg$/,
        use: {
          loader:'file-loader',
          options:{
            // 文件输出的路径
            outputPath:'img'
          }
        }
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }
    ]
  }
}