import Size from './Size'
import inspectMatrix from './inspectMatrix'
import {range} from './Range'
import { assert } from './assert'

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
    return this.data[idx(row, column, this.size)]
  }
  idx(index: number) {
    return this.data[index]
  }
  equalSize(target: Matrix) {
    return this.rows === target.rows
    && this.columns === target.columns
  }
  pow(x: number): Matrix {
    return this.map(n => Math.pow(n, x))
  }
  sqrt(): Matrix {
    return this.map(n => Math.sqrt(n))
  }
  sin(): Matrix {
    return this.map(n => Math.sin(n))
  }
  norm(): Matrix {
    return this.abs().pow(2).sum().sqrt()
  }
  abs(): Matrix {
    return this.map(n => Math.abs(n))
  }
  sum(): Matrix {
    if (this.size.isScalar()) {
      return this
    }
    if (this.size.isVector()) {
      return this.reduce('+')
    }
    const result: Array<number> = []
    const columns = this.size.columns

    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < this.rows; r++) {
        result[c] = this.at(r, c) + (result[c] || 0)
      }
    }

    return new Matrix(result, new Size(1, this.columns))
  }
  mean() {
    if (this.size.isScalar()) {
      return this
    }
    if (this.size.isVector()) {
      return this.sum().over(this.size.length())
    }

    return this.sum().over(this.rows)
  }
  reduce(operator: '+' | '-' | '*' | '/' = '+'): Matrix {
    if (this.size.isScalar()) {
      return this
    }

    const isLinear = operator === '+' || operator === '-'
    let result = this.data[0]

    for (let i = 1; i < this.size.length(); i++) {
      switch (operator) {
        case '+':
          result = result + this.data[i]
        break
        case '-':
          result = result - this.data[i]
        break
        case '*':
          result = result * this.data[i]
        break
        case '/':
          result = result / this.data[i]
        break
      }
    }

    return new Matrix([result], new Size(1, 1))
  }
  map(fn: (n : any) => any): Matrix {
    return new Matrix(this.data.map((x) => {
      const v = fn(x)
      if (Matrix.isMatrix(v)) {
        return v.toScalar()
      }
      return v
    }), this.size)
  }
  private toScalar(): number {
    assert(this.size.isScalar(), 'cannot convert non scalar sized matrix')
    return this.data[0]
  }
  elementWise(n: Matrix, fn: Function): Matrix {
    assert(Matrix.isMatrix(n), 'n should be a Matrix')
    assert(this.size.equals(n.size), 'matrix dimensions must agree')
    let result: Array<any> = []
    const left = this.data
    const right = n.data
    for (let i = 0; i < this.size.length(); i++) {
      result[i] = fn(left[i], right[i])
    }
    return new Matrix(result, this.size)
  }
  dot(x: number): Matrix {
    return this.map(n => n * x)
  }
  over(x: number): Matrix {
    return this.map(n => n / x)
  }
  mul(b: Matrix) {
    const a = this
    const size = new Size(a.size.rows, b.size.columns)
    const data = size.toEmptyArray()

    for (let i of range(0, a.size.rows)) {
      for (let j of range(0, b.size.columns)) {
        for (let k of range(0, b.size.columns)) {
          let x = idx(i, j, this.size)
          data[x] = data[x] + a.at(i, k) * b.at(k, j)
        }
      }
    }

    return new Matrix(data, size)
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
  sub(n: Matrix) {
    return this.elementWise(n, (a, b) => a - b)
  }
  inspect(): string {
    return inspectMatrix(this)
  }
  toString() {
    return this.inspect()
  }
  equals(n: Matrix) {
    return this.elementWise(n, (a, b) => a === b ? 1 : 0)
  }
  neg() {
    return this.map(n => n * -1)
  }
  toBoolean(): boolean {
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

function idx(row: number, col: number, size: Size) {
  return (row * size.columns) + col
}