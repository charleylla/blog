const path = require('path')

module.exports  = {
  mode:'development',
  devtool:'source-map',
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
        use:[
          {
            loader:'version-loader',
            options:{
              version:1,
              template:path.resolve(__dirname,'template/version.js')
            }
          }s
        ]
      }
    ]
  }
}