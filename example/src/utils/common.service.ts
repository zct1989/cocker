/**
 * 公共服务类
 */
export class CommonService {
  /**
   * 下载文件
   */
  public static downloadFile(url, filename) {
    const a = document.createElement('a')
    a.href = url
    a.download = filename || (+new Date())
    a.click()
  }

  public static reset(target, options?) {
    const check = (item, key, value) => {
      switch (typeof value) {
        case 'number': {
          item[key] = 0
          break;
        }
        case 'string': {
          item[key] = ""
          break;
        }
        case 'object': {
          if (value instanceof Array) {
            item[key] = []
          } else {
            clearObject(value)
          }
          break;
        }
      }
    }

    const clearObject = (object) => {
      Object.entries(object).forEach(([key, value]) => {
        check(object, key, value)
      })
    }

    const clearArray = (array) => {
      array.forEach((value, index) => {
        check(array, index, value)
      })
    }

    if (target instanceof Array) {
      clearArray(target)
    } else {
      clearObject(target)
    }
  }

  public static revert(source, ...values) {
    const sourceType = typeof source

    if (!values.every(x => typeof x === sourceType)) {
      return
    }

    if (source instanceof Array) {
      source.length = 0
      values.forEach(item => {
        item.forEach(x => source.push(x))
      })
    } else {
      values.forEach(item => {
        for (const key in item) {
          if (key in source) {
            source[key] = item[key]
          }
        }
      })
    }


    return source
  }
}
