/**
 * 小于10补0
 *
 */
/**
 * 时间戳 转换 时 分 秒 年 月 日
 *
 */
export function getTimes (time) {
  toDou = (iNum) => {
    return iNum < 10 ? '0' + iNum : '' + iNum
  }
  if (time === '' || time === null || time === undefined) {
    return ''
  }
  let date = new Date(time)
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  return toDou(Y) + '-' + toDou(M) + '-' + toDou(D)
}

export default getTimes

// 金额格式化
export const moneyFlat = (str) => {
  var numStyle = typeof str
  if (str === '' || str === null || str === undefined || str === 'null') {
    return 0
  }
  if (numStyle === 'string' || numStyle === 'number') {
    str = str.toString()
  } else {
    return
  }
  var newStr = ''
  var count = 0

  if (str.indexOf('.') === -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    // 自动补小数点后两位
    str = newStr + '.00'
  } else {
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
  }
  return str
}

// 数据
export const defaultDate = (str, arg) => {
  if (str == null || str === '' || str === undefined || str === NaN) {
    return '—'
  } else {
    if (arg) {
      return str + arg
    }
    return str
  }
}
