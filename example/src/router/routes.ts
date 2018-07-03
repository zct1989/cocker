export default function (pageRoutes) {
  // 获取自动路由
  // const autoRoutes = pageRoutes.map(page => ({
  //   path: page.routePath,
  //   component: () => import(`~/pages/${page.componentPath}`)
  // }))

  // 返回路由数据
  return [{
    path: '/',
    component: () => import('~/pages/login.vue')
  }, {
    path: "*",
    component: () => import('~/pages/404.vue')
  }]
}
