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
  
  const { template,verison } = options;
  let verisonData = `\n/**version*/\n`
  if(template){
    verisonData = fs.readFileSync(template,'utf-8')
    verisonData = '\n' + verisonData + '\n'
  }
  
  return verisonData + source
}

module.exports = versionLoader