
const typescript = require('./typescript.extend')
const alias = require('./alias.extend')
const environment = require('./environment.extend')
const autoRouter = require('./auto-router.extend')

// 支持列表
let extendSupport = {
  typescript,
  alias,
  environment,
  autoRouter
}

/**
 * 设置根组件
 * @param config 
 */
function setRootComponent(config) {
  config.sourceFiles = {
    rootComponent: 'node_modules/@cocker/core/app.js'
  }
}

/**
 * 扩展webpack设置
 * @param config 
 */
function extendWebpackContent(config, root) {
  let extendWebpackBase = config.build.extendWebpack

  // 支持SSR
  let extendWebpack = function (cfg, ssr) {
    Object.entries(extendSupport).forEach(([key, extend]) => {
      // 开启SSR,并且符合扩展SSR模式
      if (config.ssr && ssr && ((ssr.isServer && extend.ssr.isServer) || (ssr.isClient && extend.ssr.isClient))) {
        extend.install(cfg, root)
      }
      // 未开启SSR
      if (!config.ssr) {
        extend.install(cfg, root)
      }
    })

    extendWebpackBase(...cfg)
  }

  config.build.extendWebpack = extendWebpack
}

/**
 * 设置路由模式
 * @param config 
 */
function setVueRouterMode(config) {
  if (config.build && !config.build.vueRouterMode) {
    config.build.vueRouterMode = 'history'
  }
}



export const install = function (config, root) {
  // 扩展webpack设置
  extendWebpackContent(config, root)
  // 扩展根组建设置
  setRootComponent(config)
  // 设置路由模式
  setVueRouterMode(config)
  // 返回更新后的配置
  return config
}