import { Observable, empty } from "rxjs";
import { RequestParams } from './request-params'
import { RequestOption } from './request-option'
import { RequestServerConfig } from './interfaces'
import { RequestState } from './enums'
import { RequestService } from "./request-service";
import * as UUID from "uuidjs";

/**
 * 请求对象
 */
export class RequestObject {
  // 请求对象id
  public readonly id

  // 请求观察对象
  public readonly requestObservable

  // 请求观察者
  private requestObserver

  // 请求服务对象
  public readonly requestServer: RequestServerConfig

  // 通讯状态
  private requestState: RequestState = RequestState.Ready
  /**
   * 构造函数
   */
  constructor(requestServer: RequestServerConfig) {
    // 生成请求对象id
    this.id = UUID.generate()
    // 设置请求服务对象
    this.requestServer = requestServer
    // 设置可观察对象
    this.requestObservable = Observable.create((observer) => {
      // 设置观察者
      this.requestObserver = observer
    })
  }

  /**
   * 发送网络请求
   */
  public request(requestParams: RequestParams) {
    // 如果通讯实体未占用则发送通讯数据
    if (this.requestState === RequestState.Ready) {
      // 修改网络通讯状态
      this.requestState = RequestState.Loading
      // 生成通讯配置对象
      let requestOption = new RequestOption(this.requestServer, requestParams)

      // 发送网络请求
      RequestService.getInstance().send(requestOption)
        .then((response) => {
          // 通讯结果正常
          this.requestObserver.next()
        })
        .catch((response) => {
          // 通讯结果异常
          this.requestObserver.error();
        })
        .finally(() => {
          // 重置通讯状态
          this.requestState = RequestState.Ready
        })

      // 返回观察对象
      return this.requestObservable

    } else {
      // 通讯实体占用中
      // 忽略进入的请求
      return empty()
    }
  }
}