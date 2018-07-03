
/**
 * 请求拦截器
 */
export class RequestInterceptor<T> {
  /**
   * 拦截器状态
   */
  public defined: boolean = false

  /**
   * 拦截器
   */
  public interceptor: (response: any) => T

  /**
   * 注册拦截器
   * @param callback 
   */
  public use(callback: (response: any) => T) {
    this.defined = true
    this.interceptor = callback
  }
} 
