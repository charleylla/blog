import RouterHistory from "./router-history";

/**
 * 1. VueRouter 的 classs
 * 2. Vue 的 use 方法
 * 3. Vue Router 的原理
 */

 class VueRouter {

  constructor(options = {
    mode:'hash',
    routes:[]
  }){
    const { mode,routes } = options;
    this.mode = mode;
    this.routes = routes;
    // 将数组转成map，方便渲染时根据 path 获取组件
    this.routesMap = this.createMap()
    // 初始化 History
    this.history = new RouterHistory()
    // 初始化事件绑定
    this.init()
  }

  init(){
    if(this.mode === 'hash'){
      window.addEventListener('load',() => {
        // 初始化浏览器的 Hash
        // 初始页面为 #/s
        !location.hash && ( location.hash = '/' );
        this.handleHashPath()
      })

      window.addEventListener('hashchange',() => {
        // 初始化浏览器的 Hash
        !location.hash && ( location.hash = '/' );
        this.handleHashPath()
      })
    }else if(this.mode === 'history'){
      window.addEventListener('load',() => {
        this.handlePushStatePath()
      })

      window.addEventListener('popstate',() => {
        this.handlePushStatePath()
      })
    }
  }

  handleHashPath(){
    const path = location.hash.substr(1)
    this.history.current = path;
  }

  handlePushStatePath(){
    const { pathname } = location
    this.history.current = pathname;
  }

  createMap(){
    return this.routes.reduce((map,next) => {
      const { path,component } = next;
      map[path] = component;
      return map;
    },{})
  }

  push(route){
    // 根据 hash 和 history 进行分别处理
    if(this.mode === 'hash'){
      location.hash = '#' + route;
    }else{
      history.pushState({},null,route)
    }
    this.history.current = route
  }
}

VueRouter.install = function(Vue){
  injectRoutes(Vue)
  registComponent(Vue)
}

function injectRoutes(Vue){
  // 混合方法
  Vue.mixin({
    // 每个组件（包括根组件）在创建前都会调用这个方法
    beforeCreate(){
      // 通过 this.$options 可以获取参数配置
      // console.log(this.$options)
      // 根组件才有 router 属性
      if(this.$options && this.$options.router){
        this._root = this;
        this._router = this.$options.router
        // beforeCreate 方法先于 onload 事件执行
        // 因此在时间执行之前，history.current 始终为 null
        Vue.util.defineReactive(this,'_history',this._router.history)
      }else{
        // 其他组件
        // $parent 指向自己的父级
        // 父级指向父级的父级
        // 直到指向根组件
        this._root = this.$parent._root
        // 也可以使用 defineProperty
        this.$router = this._root._router
        this.$route = this._root._router.history.current
      }
    }
  })
}

function registComponent(Vue) {
  Vue.component('router-link',{
    props:['to'],
    methods:{
      handleClick(e){
        e.preventDefault()
        history.pushState({},null,this.to)
        this._root._router.history.current = this.to
      }
    },
    render(){
      const { mode } = this._root._router
      const isHash = mode === 'hash';
      const target = isHash ? '#' + this.to : this.to;
      if(isHash){
        return <a href={target}>{this.$slots.default}</a>
      }
      return <a href={target} onClick={this.handleClick}>{this.$slots.default}</a>
    }
  })

  Vue.component('router-view',{
    // 这个初始化阶段会执行两次
    render(h){
      const { current } = this._root._router.history
      const component = this._root._router.routesMap[current]
      return h(component)
    }
  })
}

export default VueRouter;