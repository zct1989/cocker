import webpack from 'webpack'
import chalk from 'chalk'

module.exports = function (cfg) {
  let build_env
  let default_build_env = 'prod'
  let temp_env = {}

  // 开发环境可以指定需要打包的环境，默认prod
  if (cfg.mode !== 'development') {
    build_env = process.env.env || default_build_env
  } else {
    // 开发环境只能使用dev
    build_env = 'dev'
  }

  const buildConfig = require(`../../../environment/${build_env}.env`)

  // 开发环境下允许重写服务端地址
  if (cfg.mode === 'development' && process.env.server) {
    temp_env = {
      URL_SERVER: JSON.stringify("http://" + process.env.server)
    }
  }

  let envConfig = Object.assign(buildConfig, temp_env, {
    BUILD_MODE: JSON.stringify(cfg.mode), // 编译模式
    BUILD_ENV: JSON.stringify(build_env), // 编译环境
    BUILD_TIME: JSON.stringify(new Date().toLocaleString()) // 编译时间
  })

  cfg.plugins.push(new webpack.DefinePlugin({
    __ENV_CONFIG__: envConfig
  }))

  console.log(chalk`
  ===========================================
    服务端地址： {red ${envConfig.URL_SERVER}}
    编译模式　： {green ${cfg.mode}}
    编译环境　： {rgb(255,131,0) ${build_env}}
  ===========================================
  `);
}