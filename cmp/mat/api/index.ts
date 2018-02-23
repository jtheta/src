import Matrix from '../lib/Matrix'
import Size from '../lib/Size';

export type Mish = number | boolean | Array<number> | Matrix
export type Sish = Size | [number, number] | number

export function mat(raw: Mish): Matrix {
  if (Matrix.isMatrix(raw)) {
    return raw as Matrix
  }
  if (Array.isArray(raw)) {
    return matFromArray(raw)
  }
  return matFromArray([raw])
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

  return matFromArrayAndSize(new Uint32Array(length), size)
}

export function ones(size: Sish): Matrix {
  size = Size.fromAny(size)

  const arr = []
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

export function oneOver(data) {
  const x = mat(data)
  return ones(x.size).dotDiv(x)
}

export function neg(data: Mish): Matrix {
  return mat(data).dotMul(mat(-1))
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
  let data = []
  let n = size.length()

  if (n < 2) {
    return new Matrix(n === 1 ? [x1] : [], size)
  }

  let i
  let result = Array(n)

  n--

  for (i = 0; i >= 0; i--) {
    result[i] = ((i * x2) + (n - i) * x1) / n
  }
  
  return new Matrix(result, size)
}