
const typescript = require('./typescript.extend')
const alias = require('./alias.extend')
const environment = require('./environment.extend')
const autoRouter = require('./auto-router.extend')
const webpack = require('webpack')

// 支持列表
let extendSupport = {
  typescript,
  alias,
  environment,
  autoRouter
}

export const install = function (cfg, root) {
  Object.entries(extendSupport).forEach(([key, extend]) => {
    extend.install(cfg, root)
  })
}

