import {range} from './Range'
import Size from './Size'
import inspectMatrix from './inspectMatrix'

export default class Matrix {
  constructor(private data: Array<any>, public size: Size) {
    this.rows = size.rows
    this.columns = size.columns
  }
  private rows: number
  private columns: number
  innerMul(idxA, idxB) {
    return this.data[idxA] * this.data[idxB]
  }
  static isMatrix(target: any) {
    return target instanceof Matrix
  }
  at(row: number, column: number) {
    return this.data[idx(row, column)]
  }
  idx(index: number) {
    return this.data[index]
  }
  equalSize(target: Matrix) {
    return this.rows === target.rows
    && this.columns === target.columns
  }
  elementWise(n: number | Matrix, fn: Function): Matrix {
    if (Matrix.isMatrix(n)) {
      let result = []
      for (let r of range(0, this.rows)) {
        for (let c of range(0, this.columns)) {
          const i = idx(r, c)
          result[i] = fn(midx(n, i), this.idx(i))
        }
      }
      return new Matrix(result, this.size)
    }

    return new Matrix(this.data.map(c => fn(c, n)), this.size)
  }
  dotMul(n: number | Matrix): Matrix {
    return this.elementWise(n, (a, b) => a * b)
  }
  dotDiv(n: number | Matrix): Matrix {
    return this.elementWise(n, (a, b) => a / b)
  }
  dotExp(n: number | Matrix) {
    return this.elementWise(n, (a, b) => a ^ b)
  }
  add(n: number | Matrix) {
    return this.elementWise(n, (a, b) => a + b)
  }
  inspect() {
    return inspectMatrix(this)
  }
}

function midx(data: number | Matrix, idx: number) {
  if (Matrix.isMatrix(data)) {
    return (data as Matrix).idx(idx)
  } else {
    return data
  }
}

function idx(row: number, col: number) {
  return (row + 1) * col
}