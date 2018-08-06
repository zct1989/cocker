const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../../..', dir)
}

module.exports = function (cfg) {
  Object.assign(cfg.resolve.alias, {
    '~': resolve('src'),
    '@': resolve('src')
  })
}