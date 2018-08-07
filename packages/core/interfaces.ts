
import VueRouter from 'vue-router'
import { Store } from 'vuex'

/**
 * 初始配置参数接口
 */
export interface ApplicationOption {
  app: any
  // vue-router实例
  router: VueRouter
  // vuex实例
  store: Store<any>
  // 默认布局
  defaultLayout?: string
  bootstrap: {
    // 依赖注入全局提供器
    provides: () => Promise<any>
    // 注册插件
    plugins: () => Promise<any>
    // 注册过滤器
    filters: () => Promise<any>
    // 注册指令
    directives: () => Promise<any>
  }
  // 启动逻辑，用于实现初始化数据
  launch: () => Promise<any>
}
