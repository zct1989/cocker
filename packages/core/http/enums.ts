/**
 * 请求方法类型
 */
export enum RequestMethod {
  Get,
  Post,
  Put,
  Delete,
  Options,
  Head,
  Patch
}


/**
 * 通讯状态
 */
export enum RequestState {
  Ready,    // 准备发送请求
  Loading   // 请求发送中
}