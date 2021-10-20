/* eslint-disable */
import { get, sum } from 'lodash'
import roundTo from 'round-to'
// import * as TokenList from 'constants/json'

const momentTimezone = require('moment-timezone')

// const TOKEN_NAME = {
//   '0xa6fd7b5c9eee30309b00b65436a284e2053251e5': 'hora',
//   '0x54e5721ea9c828e725ae6e3f640f69928b696b3e': 'dolp',
// }
const validateAccountIsValid = (list, account, token) => {
  // const tokenAddr = (token || '').toLowerCase()
  // const isAccept = Object.entries(get(TokenList, `[${TOKEN_NAME[tokenAddr]}]`, {})).some(value => value[0].toLowerCase() === accountAddr)
  const accountAddr = (account || '').toLowerCase()
  const lowerCaseList = JSON.stringify(list).toLowerCase();
  const revertList = JSON.parse(lowerCaseList);
  const isAccept = revertList[accountAddr] ? true : false
  return isAccept
}

const isMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    return true
  }
  return false
}

const removeEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? removeEmpty(v) : v])
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

function roundNumber(nb, scale = 3) {
  let n = roundTo.up(parseFloat(nb), scale)

  let sign = +n < 0 ? '-' : '',
    toStr = n.toString()
  if (!/e/i.test(toStr)) {
    return n
  }
  let [lead, decimal, pow] = n
    .toString()
    .replace(/^-/, '')
    .replace(/^([0-9]+)(e.*)/, '$1.$2') 
    .split(/e|\./)
  return +pow < 0
    ? sign + '0.' + '0'.repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal
    : sign +
        lead +
        (+pow >= decimal.length
          ? decimal + '0'.repeat(Math.max(+pow - decimal.length || 0, 0))
          : decimal.slice(0, +pow) + '.' + decimal.slice(+pow))
}

const formatDate = (date, format = 'HH:mm DD/MM/YYYY') => {
  const country = 'Asia/Ho_Chi_Minh'
  if (date) {
    const tz = momentTimezone(date)
    const time = tz.tz(country).format(format)
    return time
  }
  return ''
}

const formatCode = (text, start, end, concat) => {
  const total = sum([start, end])
  const length = text.length
  if (total >= length) {
    return text
  }
  return [text.slice(0, start), text.slice(length - end)].join(concat)
}

export { validateAccountIsValid, isMobile, removeEmpty, roundNumber, formatDate, formatCode }
