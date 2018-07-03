
import { RequestExtendConfig } from './interfaces'
import { RequestObject } from './request-object'
import { RequestParamsOption } from './request-params-option'
/**
 * 请求参数对象
 */
export class RequestParams {
  public data: any
  public options: RequestParamsOption
  private requestObject: RequestObject

  /**
   * 构造函数
   * @param data 
   * @param options 
   */
  constructor(data, options?: RequestExtendConfig) {
    this.data = data
    this.options = new RequestParamsOption(options)
  }

  /**
   * 设置请求对象
   * @param requestObject 
   */
  setRequestObject(requestObject: RequestObject) {
    this.requestObject = requestObject
  }

  /**
   * 对数据进行转换
   * @param callback 
   */
  public map(callback) {
    this.data = callback(this.data)
  }

  /**
   * 发送网络请求
   */
  request() {
    return this.requestObject.request(this)
  }
}