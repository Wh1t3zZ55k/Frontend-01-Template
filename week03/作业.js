/*
* JavaScript | 表达式，类型准换
* 根据这节课上讲师已写好的部分，补充写完函数 convertStringToNumber
* 以及函数 convertNumberToString
*/

function convertStringToNumber (string, x = 10) {
  let currStr = string
  let multi = 1
  let fractionStr = ''

  const suffixs = [
    {
      // Exponent
      target: 'e',
      name: '指数',
      callback (suffix) {
        multi = 10 ** suffix
      }
    },
    {
      // fraction
      target: '.',
      name: '小数',
      callback (suffix) {
        const chars = suffix.split('')
        let num = 0
        let frac = 1
        for (let i = 0; i < chars.length; i++) {
          frac /= x
          num += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * frac
        }
        fractionStr = num
      }
    }
  ]

  const suffixFactory = ({ target, name, callback }) => {
    const str = currStr
    const idx = str.lastIndexOf(target)
    const suffix = str.substr(idx + 1)

    currStr = str.substr(0, idx)

    if (/\D/.test(suffix) && suffix >= 0) {
      return console.log(`${name}必须为十进制整数`)
    }

    return callback(suffix)
  }

  // exec
  suffixs.forEach(item => suffixFactory(item))

  const chars = currStr.split('')
  let number = 0
  for (let i = 0; i < chars.length; i++) {
    number = number * x
    number += chars[i].codePointAt(0) - '0'.codePointAt(0)
  }

  return (fractionStr ? number + fractionStr : number) * multi
}

const res1 = convertStringToNumber('10.0123e4')
console.log(`res1: ${res1}`)

// ---------------------------------------------------------------------

function convertNumberToString (number, x = 10) {
  const len = String(number).length
  const fractionLen = String(number).substr(String(number).indexOf('.') + 1).length
  let integer = Math.floor(number)
  let fraction = number - integer
  let string = ''
  let string2 = ''

  while (integer > 0) {
    string = String(integer % x) + string
    integer = Math.floor(integer / x)
  }

  while (fraction > 0 && string2.length < fractionLen) {
    string2 = String(fraction % x) + string2
    fraction = Math.floor(fraction * x)
  }

  string2 = +(+string2).toFixed(fractionLen)

  return String(+string + string2)
}

const res2 = convertNumberToString(100123.3242)
console.log(`res2: ${res2}`)

// ---------------------------------------------------------------------