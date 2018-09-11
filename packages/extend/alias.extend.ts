export default {
  ssr: {
    server: true,
    client: true
  },
  install: function (cfg) {
    cfg.resolve.alias['~'] = cfg.resolve.alias['src']
  }
}