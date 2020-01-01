const path = require('path')

module.exports  = {
  mode:'development',
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:[
          path.resolve(__dirname,'loaders/first-loader'),
          path.resolve(__dirname,'loaders/second-loader'),
          path.resolve(__dirname,'loaders/third-loader'),
        ]
      }
    ]
  }
}