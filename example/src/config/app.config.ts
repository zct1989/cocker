const envConfig = __ENV_CONFIG__;

export default {
  server: {
    url: envConfig.URL_SERVER,
    timeout: 30000
  },
  env: {
    buildMode: envConfig.BUILD_MODE,
    buildEnv: envConfig.BUILD_ENV,
    buildTime: envConfig.BUILD_TIME,
  }
}