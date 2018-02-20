import Matrix from '../lib/Matrix'
import Size from '../lib/Size';

type Mish = number | boolean | Array<number>

export function mat(raw: any): Matrix {
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

export function zeros(size): Matrix {
  size = Size.fromAny(size)
  const length = size.length()

  return matFromArrayAndSize(new Uint32Array(length), size)
}

export function ones(size: Size | Array<Number>): Matrix {
  size = Size.fromAny(size)

  const arr = []
  const length = size.length()
  for (let i = 0; i < length; i++) {
    arr.push(1)
  }

  return matFromArrayAndSize(arr, size)
}

function exp(data: Mish) {
  const x = mat(data)
  // x.elementWise()
}

function oneOver(data) {
  const x = mat(data)
  return ones(x.size).dotDiv(x)
}
function onePlus(data) {
  const x = mat(data)
  return ones(x.size).add(x)
}

function sigmoid(z: any) {
  return oneOver(onePlus(exp(neg(z))))
}