import { IModel } from './interface'

export abstract class Model implements IModel {
  // private __response

  /**
   * 后端数据转为前端数据
   * @param data 
   */
  public translateTo(data) {
    // TODO:前置操作
    // this.__response = data;
    this.translate(data)
  }
  /**
   * 后端数据转为前端数据
   * @param data 
   */
  abstract translate(data)

  /**
   * 前端数据转为后端数据
   */
  abstract convert(): any
}