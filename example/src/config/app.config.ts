const envConfig = __ENV_CONFIG__;

export default {
  server: envConfig.URL_SERVER,
  env: {
    buildMode: envConfig.BUILD_MODE,
    buildEnv: envConfig.BUILD_ENV,
    buildTime: envConfig.BUILD_TIME,
  },
  timeout: 30000,
}