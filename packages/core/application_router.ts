import VueRouter from 'vue-router'

export class ApplicationRouter {
  private store
  private router: VueRouter
  private launch
  private applicationStore
  /**
   * 构造函数
   * @param router 
   * @param store 
   * @param launch 
   */
  constructor({ router, store, launch }, applicationStore) {
    this.applicationStore = applicationStore
    this.store = store
    this.router = router
    this.launch = launch

    // 注册路由守卫
    this.router.beforeResolve(this.routerBeforeResolve.bind(this))
    this.router.afterEach(this.routerAfterEach.bind(this))

    // 添加自动路由
    this.importAutoRoutes()
  }

  /**
   * 前置路由守卫
   */
  async routerBeforeResolve(to, from, next) {
    if (this.applicationStore.state.ready !== true && this.launch) {
      await this.launch({
        store: this.store,
        router: this.router
      })
    }

    next()
  }


  /**
   * 后置路由守卫
   */
  routerAfterEach(to, from) {
    if (to.matched) {
      let component = this.getComponent(to.matched)
      //  布局检测
      this.layoutCheck(component)
    }
  }



  /**
   * 获取组件
   * @param matched 
   */
  private getComponent(matched) {
    if (matched && matched.length > 0) {
      let [{ components }] = matched
      return components.default
    }
  }

  /**
   * 布局监测
   * @param component 
   */
  private layoutCheck(component) {
    if (component) {
      let targetLayout = component['$layout'] || 'DefaultLayout'
      if (this.store.state.layout !== targetLayout) {
        this.store.commit('updateLayout', targetLayout )
      }
    }
  }

  private importAutoRoutes() {
    if (process.env.ROUTERS) {
      let routes = process.env.ROUTERS as any
      routes.map(route => {
        this.router.addRoutes([{
          path: route.routePath,
          component: () => import('~/pages/' + route.componentPath)
        }])
      })
    }
  }
}