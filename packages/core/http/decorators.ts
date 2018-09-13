import { RequestObject } from './request-object'
import { RequestParams } from './request-params'
import { RequestServerConfig } from './interfaces'
import { Model } from '../model'
/**
 * 网络请求行为装饰器
 */
export function Request({ server, model }: { server: RequestServerConfig, model: { prototype: Model } }) {
  return function (target, name, descriptor) {
    // 请求对象
    let requestObject = new RequestObject(server)

    // 设置响应数据模型
    if (model) {
      requestObject.setResponseModel(model)
    }

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