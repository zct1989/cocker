export class FilterService {

  /**
   * 日期格式化
   * @param date
   * @param fmt
   */
  static dateFormat(date, fmt = "yyyy-MM-dd hh:mm:ss"): string {
    // 空数据处理
    if (date === null || date === undefined || date === '') {
      return ''
    }

    // 如果是时间戳则转化为时间
    if (typeof date === 'number') {
      date = new Date(date)
    }

    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }

    return fmt
  }

  /**
   * 千分位转换
   * @param number
   */
  static toThousands(number): String {
    let num: any = ''

    if (number === null || number === '') {
      num = number | 0
    } else {
      num = Number(number).toFixed(2)
      if (isNaN(num) || num === '' || num === undefined || num === null) {
        return ''
      }
      num = num + ''
      if (/^.*\..*$/.test(num)) {
        let pointIndex = num.lastIndexOf('.')
        let intPart = num.substring(0, pointIndex)
        let pointPart = num.substring(pointIndex + 1, num.length)
        intPart = intPart + ''
        let re = /(-?\d+)(\d{3})/
        while (re.test(intPart)) {
          intPart = intPart.replace(re, '$1,$2')
        }
        num = intPart + '.' + pointPart
      } else {
        num = num + ''
        let re = /(-?\d+)(\d{3})/
        while (re.test(num)) {
          num = num.replace(re, '$1,$2')
        }
      }
    }
    return num
  }

  /**
   * 手机号脱敏显示转换器
   */
  static encryptPhone(value) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 3) + '****' + value.substr(7)
  }

  /**
   * 身份证脱敏显示转换器(后四位脱敏)
   */
  static encryptIDCardFour(value) {
    if (!value || value === '') {
      return ''
    }
    // return value.substr(0, 3).padEnd(value.length - 4, '*') + value.substr(-4)
    return value.substr(0, 14) + '****'
  }

  /**
   * 字符串截取
   * @param str 要截取的字符串
   * @param subIndex 截取长度,默认6位
   */
  static subString(str: string, subIndex: number = 6) {
    if (!str) { return '' }
    return str.length > subIndex ? str.substring(0, subIndex) + '...' : str
  }

  static safeNumber(value) {
    if (isNaN(value) || value == undefined) {
      return null
    } else {
      return value
    }
  }
}
