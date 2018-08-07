import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
export default function (pageRoutes) {
  // 获取自动路由
  // const autoRoutes = pageRoutes.map(page => ({
  //   path: page.routePath,
  //   component: () => import(`~/pages/${page.componentPath}`)
  // }))

  // 返回路由数据
  return [{
    path: '/',
    component: Login
  }, {
    path: "*",
    component: NotFound
  }]
}
