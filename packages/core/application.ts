

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app'


Vue.use(VueRouter)

import { ApplicationOption } from './interfaces'
import { ApplicationRouter } from './application_router'
import { ApplicationStore } from './application_store'
import injector from 'vue-inject'

export default class Cocker {
  private router
  /**
   * 构造函数
   * @param options 
   */
  constructor(options: ApplicationOption) {
    // 进行全局混入
    this.mixins()

    // 安装基础插件
    Vue.use(Vuex)
    Vue.use(VueRouter)

    // 注册路由扩展
    this.router = new ApplicationRouter(options, ApplicationStore.getStore())

    // 初始化框架
    this.bootstrap(options, () => {
      new Vue({
        el: '#q-app',
        template: '<App/>',
        router: options.router,
        store: options.store,
        render: h => h(App)
      })
    })
  }

  /**
   * 全局混入
   */
  mixins() {
    // var Component = Vue.extend({
    //   mixins: [validationMixin]
    // })

    // 添加插件
    Vue.use({
      install: () => {
        Vue.prototype.$cocker = {
          router: this.router,
          store: ApplicationStore.getStore(),
          state: ApplicationStore.getStore().state
        }
      }
    })
  }

  /**
   * 初始化配置
   * @param options 配置选项
   * @param callback 
   */
  private bootstrap({ bootstrap }: ApplicationOption, applicationInit) {
    Vue.use(injector)
    // 创建提供器
    if (bootstrap.provides) {
      Object.entries(bootstrap.provides()).forEach(([key, value]) => {
        let lifecycle: any = "class"
        let provide: any

        if (value instanceof Array) {
          lifecycle = value[1]
          provide = value[0]
        } else {
          provide = value
        }

        let [target] = Object.values(provide())
        injector.service(key, target).lifecycle[lifecycle]();
      })
    }

    // 安装过滤器
    if (bootstrap.filters) {
      Object.entries(bootstrap.filters()).forEach(([key, fun]) => {
        Vue.filter(key, fun)
      })
    }

    // 安装指令
    if (bootstrap.directives) {
      Object.entries(bootstrap.directives()).forEach(([key, fun]) => {
        Vue.directive(key, fun)
      })
    }

    // 安装插件
    if (bootstrap.plugins) {
      Object.entries(bootstrap.plugins()).forEach(([key, plugin]: [string, any]) => {
        Vue.use(plugin)
      })
    }

    // UI实例化
    applicationInit()
  }
} 