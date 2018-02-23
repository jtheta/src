import {range} from './Range'
import Size from './Size'
import inspectMatrix from './inspectMatrix'
import { assert } from './assert';

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
  map(fn: (n : any) => any) {
    return new Matrix(this.data.map(fn), this.size)
  }
  elementWise(n: Matrix, fn: Function): Matrix {
    assert(Matrix.isMatrix(n), 'n should be a Matrix')
    assert(this.size.equals(n.size), 'size must match')
    let result = []
    const left = this.data
    const right = n.data
    for (let i = 0; i < this.size.length(); i++) {
      result[i] = fn(left[i], right[i])
    }
    return new Matrix(result, this.size)
  }
  dotMul(n: Matrix): Matrix {
    return this.elementWise(n, (a, b) => a * b)
  }
  dotDiv(n: Matrix): Matrix {
    return this.elementWise(n, (a, b) => a / b)
  }
  exp(n: Matrix) {
    return this.map(n => Math.exp(n))
  }
  add(n: Matrix) {
    return this.elementWise(n, (a, b) => a + b)
  }
  inspect() {
    return inspectMatrix(this)
  }
  toString() {
    return this.inspect()
  }
  equals(n: Matrix) {
    return this.elementWise(n, (a, b) => a === b ? 1 : 0)
  }
  toBoolean() {
    for (let i = 0; i < this.size.length(); i++) {
      if(this.data[i]) {
        return true
      }
    }
    return false
  }
  filledWith(n: number | Matrix): boolean {
    for (let i = 0; i < this.size.length(); i++) {
      if(n !== this.data[i]) {
        return false
      }
    }
    return true
  }
  toShortString() {
    const d = this.data
    return `[${d.join(',')}]`
  }
}

function idx(row: number, col: number) {
  return (row + 1) * col
}