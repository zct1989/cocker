import { RequestMethod } from './enums'
// import { PageService } from '../common'

/**
 * 服务配置接口
 */
export interface RequestServerConfig {
  service?: string
  controller: string
  action: string
  type: RequestMethod
}

/**
 * 请求选项接口
 */
export interface RequestExtendConfig {
  append: any[];
  header: any;
  page: any;
}