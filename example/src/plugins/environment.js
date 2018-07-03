import appConfig from '~/config/app.config'
export default ({ app, router, Vue }) => {
  // 环境信息打印
  console.group('编译环境日志:');
  console.log(`服务端地址： ${appConfig.server}`)
  console.log(`编译模式　： ${appConfig.env.buildMode}`)
  console.log(`编译环境　： ${appConfig.env.buildEnv}`)
  console.log(`编译时间　： ${appConfig.env.buildTime}`)
  console.groupEnd();
}
