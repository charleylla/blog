const loaderUtils = require('loader-utils')
const fs = require('fs')
const validateOptions = require('schema-utils');

// 定义 schema
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
  const { template,version } = options;
  // 校验参数
  validateOptions(schema,options,{
    name: 'version-loader',
  })
  let versionData = version ? `\n/**${version}*/\n` : ''
  // 如果有 template 配置，这读取文件
  if(template){
    // 将模板添加到监听目录中
    this.addDependency(template)
    versionData = fs.readFileSync(template,'utf-8')
    versionData = '\n' + versionData + '\n'
  }
  
  return versionData + source
}

module.exports = versionLoader