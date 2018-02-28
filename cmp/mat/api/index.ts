export {default as Matrix} from '../lib/Matrix'
import Matrix from '../lib/Matrix'
import Size from '../lib/Size'
import { assert } from '@jtheta/assert';


export type Mish = Matrix | number | Array<number> | string
export type Sish = Size | [number, number] | number

export function mat(raw: Mish): Matrix {
  if (Matrix.isMatrix(raw)) {
    return raw as Matrix
  }
  if (Array.isArray(raw)) {
    return matFromArray(raw)
  }
  if (typeof raw === 'string') {
    return matFromString(raw)
  }
  return matFromArray([raw])
}

function matFromString(str: string) {
  const chars = str.split('')
  let rows = 1
  let cols = 1
  let char
  let num = ''
  let data: Array<number> = []

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    const prev = i > 0 ? char.charAt(i - 1) : null
    if (/\d/.test(char) || char === '-') {
      num += char
      continue
    }
    if (char === ' ') {
      // next col
      if (rows === 1) {
        cols++
      }
      if (num !== '') {
        data.push(parseFloat(num))
      } else if(prev && /\d/.test(prev)) {
        data.push(0)
      }
      num = ''
      continue
    }
    if (char === ';') {
      rows++
      if (num !== '') {
        data.push(parseFloat(num))
      } else {
        data.push(0)
      }
      num = ''
      continue
    }
  }

  if (num) {
    data.push(parseFloat(num))
  }

  return new Matrix(data, new Size(rows, cols))
}

function matFromArray(arr: Array<any>): Matrix {
  return new Matrix(arr, new Size(1, arr.length))
}

function matFromArrayAndSize(arr, size): Matrix {
  return new Matrix(arr, size)
}

export function zeros(size: Sish): Matrix {
  size = Size.fromAny(size)
  const length = size.length()

  return matFromArrayAndSize(size.toEmptyArray(), size)
}

export function ones(size: Sish): Matrix {
  size = Size.fromAny(size)

  let arr: Array<any> = []
  const length = size.length()
  for (let i = 0; i < length; i++) {
    arr.push(1)
  }

  return matFromArrayAndSize(arr, size)
}

export function exp(data: Mish) {
  const x = mat(data)
  return x.exp(x)
}

export function sin(data: Mish) {
  return mat(data).sin()
}

export function cos(data: Mish) {
  return mat(data).cos()
}

export function oneOver(data) {
  const x = mat(data)
  return ones(x.size).dotDiv(x)
}

export function neg(data: Mish): Matrix {
  return mat(data).neg()
}

export function onePlus(data) {
  const x = mat(data)
  return ones(x.size).add(x)
}

export function sigmoid(z: any) {
  return oneOver(onePlus(exp(neg(z))))
}

export function linspace(x1, x2, size: Sish = [1, 100]) {
  size = Size.fromAny(size)
  let n = size.length()

  if (n < 2) {
    return new Matrix(n === 1 ? [x1] : [], size)
  }

  let i
  let result = Array(n)

  n--

  for (i = n; i >= 0; i--) {
    result[i] = ((i * x2) + (n - i) * x1) / n
  }
  
  return new Matrix(result, size)
}

export function rand(size) {
  return zeros(size).map(x => Math.random())
}

export function meshgrid(x: Matrix, y: Matrix): [Matrix, Matrix] {
  assert(x.size.isVector(), 'x must be a vector')
  assert(y.size.isVector(), 'y must be a vector')
  // assert(x.size.length() === y.size.length(), 'must be equal length')

  // copy the x vector for as a row
  // copy that row y.size.length() times
  return [x.repeatRows(y.size.length()), y.repeatColumns(x.size.length())]
}