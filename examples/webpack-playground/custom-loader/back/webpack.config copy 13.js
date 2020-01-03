module.exports  = {
  mode:'development',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:'first-loader!second-loader?yourOptions=yourOptions!third-loader?yourOptions=yourOptions',
      }
    ]
  }
}