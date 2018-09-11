const TSLintPlugin = require('tslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export default {
  ssr: {
    server: true,
    client: true
  },
  install: function (cfg, root, config) {
    // 添加tx后缀名支持
    cfg.resolve.extensions.push('.ts')
    cfg.resolve.extensions.push('.tsx')

    // 添加ts-loader
    cfg.module.rules.push({
      // 对所有引入的tsx文件进行解析
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: Object.assign({
        // 自动将所有.vue文件转化为.vue.tsx文件
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }, config)
    })
    // 添加ts-lint支持
    cfg.plugins.push(
      new TSLintPlugin({
        files: ['./src/**/*.ts']
      })
    )
    // 添加ForkTsCheckerWebpackPlugin
    cfg.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
        vue: true
      })
    )
  }
}