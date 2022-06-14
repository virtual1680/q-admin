import Cookies from 'js-cookie'
const TokenKey = 'saber-access-token'
const RefreshTokenKey = 'saber-refresh-token'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token:string) {
    return Cookies.set(TokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token:string) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}

export const calcDate = (date1:number, date2:number) => {
  let date3 = date2 - date1;

  let days = Math.floor(date3 / (24 * 3600 * 1000))

  let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))

  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))

  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  let seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

/**
 * 判断是否为空
 */
 export function validatenull(val:any) {
  if (typeof val == 'boolean') {
      return false;
  }
  if (typeof val == 'number') {
      return false;
  }
  if (val instanceof Array) {
      if (val.length == 0) return true;
  } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
  } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false;
  }
  return false;
}

