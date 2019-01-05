// 数据为空的处理
export function dealData (str, arg) {
  if (str == null || str === '' || str === undefined) {
    return '—'
  } else {
    if (arg) {
      return str + arg
    }
    return str
  }
}

export default dealData
