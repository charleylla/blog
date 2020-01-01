const loaderUtils = require('loader-utils')
const fs = require('fs')
const validateOptions = require('schema-utils');

const schema = {
  "type": "object",
  "properties": {
    "template":{
      "type":"string"
    },
    "version":{
      "type":"string"
    }
  },
}

function versionLoader(source){
  const options = loaderUtils.getOptions(this)
  // 校验参数
  validateOptions(schema,options,{
    name: 'version-loader',
    baseDataPath: 'options',
  })
  // 添加 watch
  const { template,verison } = options;
  // 将模板添加到监听目录中
  this.addDependency(template)
  
  let verisonData = `\n/**version*/\n`
  if(template){
    verisonData = fs.readFileSync(template,'utf-8')
    verisonData = '\n' + verisonData + '\n'
  }
  
  return verisonData + source
}

module.exports = versionLoader