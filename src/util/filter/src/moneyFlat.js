// 金额格式化
export function moneyFlat (str) {
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

export default moneyFlat
