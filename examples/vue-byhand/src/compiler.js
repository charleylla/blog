function Compile(el, vm) {
  // 获取根元素
  const root = document.querySelector(el)
  // 赋值到 vm
  vm.$el = root;
  // 创建文档片段
  const frag = document.createDocumentFragment()
  let child;
  // 将 root 下的子节点加入到文档片段中
  while (child = vm.$el.firstChild) {
    frag.appendChild(child)
  }

  // 编译模板
  replace(frag, vm)
  vm.$el.appendChild(frag)
}

function replace(nodes, vm) {
  // 遍历文档判断的子节点
  [...nodes.childNodes].forEach(node => {
    // 文本节点s
    if (document.TEXT_NODE == node.nodeType) {
      let reg = /\{\{(.*)\}\}/
      let textValue = vm;
      let textContent = node.textContent
      if (reg.test(textContent)) {
        // 匹配第一个分组
        const match = RegExp.$1
        // userInfo.name -> [ userInfo,name ]
        const attrs = match.split('.')
        let textValue = vm;
        attrs.forEach((attr) => {
          textValue = textValue[attr]
        })
        node.textContent = textContent.replace(reg, textValue);
        new Watcher(vm, attrs,(newValue) => {
          // 这里使用 textContent 进行替换
          // textContent 保存了第一次的 content
          node.textContent = textContent.replace(reg,newValue);
        })
      }
      // 元素节点
    } else if (document.ELEMENT_NODE === node.nodeType) {
      if(node.tagName === 'INPUT'){
        // 获取属性值
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
          if('v-model' === attr.name){
            // 获取属性依赖数组 
            const expArr = attr.value.split('.')
            // 获取 data 值
            const dataValue = getTextValue(expArr,vm)
            // 赋值 input 框
            node.value = dataValue;
            // 绑定事件
            node.addEventListener('input',(e) => {
              // 获取 input 框中的最新的值
              const newValue = e.target.value;
              // userInfo.age -> [ userInfo,age ] -> [ userInfo ]
              const subExpArr = expArr.slice(0,expArr.length - 1)
              // userInfo.age -> [ userInfo,age ] -> age
              const lastAttr = expArr[expArr.length - 1]
              // 获取到 userInfo 对象
              const subDataValue = getTextValue(subExpArr,vm)
              // userInfo.age = newValue
              subDataValue[lastAttr] = newValue
            })
            // 在需要更新的地方都添加 Watcher
            // vm 上的数据改变后触发 watcher
            new Watcher(vm,expArr,(newValue) => {
              node.value = newValue;
            })
          }
        })
      }
      // 对元素的子节点进行递归的替换
      replace(node, vm)
    }
  })
}

function getTextValue(exp,vm){
  let val = vm;
  // 手动获取 data，触发 getter，然后订阅事件
  exp.forEach((attr) => {
    val = val[attr]
  })
  return val
}