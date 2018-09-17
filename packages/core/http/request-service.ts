import axios from 'axios'
import { RequestOption } from './request-option'
import { RequestInterceptor } from './request-interceptor'
export class RequestService {

  private static config = {
    server: '',
    timeout: 30000
  }

  // 生成URL地址拦截处理
  public static getRequestUrl: (option: RequestOption) => string

  // 生成请求头拦截处理
  public static getRequestHeader: (option: RequestOption) => any

  /**
   * 设置网络请求基础配置
   * @param param  
   */
  public static setConfig({ server, timeout }) {
    RequestService.config.server = server
    RequestService.config.timeout = timeout
  }

  // 拦截器
  public static interceptors = {
    // 状态拦截器
    status: new RequestInterceptor<boolean>(),
    // 成功状态拦截器
    success: new RequestInterceptor(),
    // 失败状态拦截器
    error: new RequestInterceptor()
  }

  // 通讯服务单例
  private static instance: RequestService

  // axios单例
  private axiosInstance

  /**
   * 构造函数
   */
  constructor() {
    RequestService.instance = this

    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: RequestService.config.server,
      timeout: RequestService.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  /**
   * 获取服务请求单例
   */
  public static getInstance() {
    if (this.instance) {
      return this.instance
    }

    return new RequestService()
  }

  /**
   * 发送网络请求信息
   * @param param
   */
  public send(requestOption: RequestOption) {
    // 获取配置对象
    let options = requestOption.getOptions()

    // 发送通讯请求
    return this.axiosInstance.request(Object.assign(
      // 默认配置对象
      options,
      // 扩展配置对象
      {
        url: RequestService.getRequestUrl ? RequestService.getRequestUrl(requestOption) : requestOption.getRequestUrl(),
        headers: RequestService.getRequestHeader ? RequestService.getRequestHeader(requestOption) : {}
      }
    ))
      .then((response) => {
        // 网络通讯正常
        // 无状态拦截器的情况下则返回通讯成功
        if (!RequestService.interceptors.status.defined) {
          return RequestService.interceptors.success.defined ? RequestService.interceptors.success.interceptor(response) : response
        }

        // 状态拦截器转换通讯状态
        if (RequestService.interceptors.status.interceptor(response)) {
          // 通讯成功
          return RequestService.interceptors.success.defined ? RequestService.interceptors.success.interceptor(response) : response
        } else {
          // 通讯失败
          return RequestService.interceptors.error.defined ? RequestService.interceptors.error.interceptor(response) : response
        }
      })
      .catch(() => {
        // 通过通讯异常
        return Promise.reject('error')
      })
  }
}
