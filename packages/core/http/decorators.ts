import { RequestObject } from './request-object'
import { RequestParams } from './request-params'
/**
 * 网络请求行为装饰器
 */
export function Request({ server }) {
  return function (target, name, descriptor) {
    // 请求对象
    let requestObject = new RequestObject(server)
    // 存储历史方法
    var _value = descriptor.value;

    // 传入请求方法
    descriptor.value = function (requestParams: RequestParams) {
      // 设置请求对象
      requestParams.setRequestObject(requestObject)
      // 传入更新后的请求对象
      return _value.call(target, requestParams)
    }

    return descriptor;
  }
}
