// import something here
import appConfig from '~/config/app.config'
import { RequestService } from '@cocker/core/http'

export default async ({ app, store, router }) => {
  // 设置请求基础配置
  RequestService.setConfig({
    server: appConfig.server.url,
    timeout: appConfig.server.timeout
  })

  // 设置自定义请求头部信息
  RequestService.getRequestHeader = () => {
    console.log(123)
    if (store.state.token) {
      return {
        "X-User-Token": store.state.token
      }
    }
  }

  // 自定义请求地址
  RequestService.getRequestUrl = (requestOption) => {
    return `api/${requestOption.getRequestUrl()}`
  }

  // 状态拦截器
  // 通过返回结果确认通讯状态
  RequestService.interceptors.status.use((response) => {
    return true
  })

  // 成功拦截器
  RequestService.interceptors.success.use((response) => {
    return response
  })

  // 失败拦截器
  RequestService.interceptors.error.use((response) => {
    return response
  })
}
