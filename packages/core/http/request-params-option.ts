import { RequestExtendConfig } from './interfaces'
// import { PageService } from '../common'

export class RequestParamsOption {
  private _header: any = {}
  public _append: Array<string | number> = []
  public _page: any


  public get header() {
    return this._header
  }

  public set header(value: any) {
    if (value) {
      this._header = value
    }
  }

  public get append() {
    return this._append
  }

  public set append(value: any) {
    if (value) {
      this._append = value
    }
  }

  public get page() {
    return this._page
  }

  public set page(value: any) {
    if (value) {
      this._page = value
    }
  }

  /**
   * 构造函数
   */
  constructor(options?: RequestExtendConfig) {
    if (options) {
      // this.header = options.header
      // this.append = options.append
      // this.page = options.page
    }
  }
}
