export const install = function (cfg, alias = {}) {
  cfg.resolve.alias['~'] = cfg.resolve.alias['src']
}