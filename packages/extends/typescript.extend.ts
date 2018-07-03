module.exports = function (cfg) {
  // 添加tx后缀名支持
  cfg.resolve.extensions.push('.ts')
  cfg.resolve.extensions.push('.tsx')

  // 添加ts-loader
  cfg.module.rules.push({
    // 对所有引入的tsx文件进行解析
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      // 自动将所有.vue文件转化为.vue.tsx文件
      appendTsSuffixTo: [/\.vue$/]
    }
  })
}