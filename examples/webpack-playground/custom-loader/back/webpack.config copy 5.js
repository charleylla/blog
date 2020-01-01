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
    // 从右向左执行
    // 从下到上执行
    // 顺序：pre，post，normal
    // 通过 enforce 指定执行顺序
    rules:[
      {
        test:/\.js$/,
        loader:[
          'first',
        ],
        enforce:'pre'
      },
      {
        test:/\.js$/,
        loader:[
          'second',
        ],
        enforce:'post'
      },
      {
        test:/\.js$/,
        loader:[
          'third',
        ]
      }
    ]
  }
}