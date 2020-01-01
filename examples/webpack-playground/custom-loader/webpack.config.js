const path = require('path')

module.exports  = {
  mode:'development',
  devtool:'source-map',
  watch:true,
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
        test:/\.png$/,
        use:[
          {
            loader:'url-loader',
            options:{
              outputPath:'img',
              limit:1000
            }
          }
        ]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}