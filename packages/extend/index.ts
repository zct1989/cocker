
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

export const install = function (config, root) {
  // 扩展webpack设置
  extendWebpackContent(config, root)
  // 扩展根组建设置
  setRootComponent(config)
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

  let extendWebpack = function (cfg) {
    Object.entries(extendSupport).forEach(([key, extend]) => {
      extend.install(cfg, root)
    })

    extendWebpackBase(cfg)
  }

  config.build.extendWebpack = extendWebpack
}

