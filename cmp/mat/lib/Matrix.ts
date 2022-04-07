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
    const i = this.idx(row, column)
    assert(i > -1, 'cannot get negative index')
    if (!(i < this.data.length)) debugger
    assert(i < this.data.length, 'index out of bounds')
    return this.data[i]
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
  cos(): Matrix {
    return this.map(n => Math.cos(n))
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
    assert(a.rows === b.columns, 'Dimensions must agree')


    for (let i of range(0, a.size.rows)) {
      for (let j of range(0, b.size.columns)) {
        for (let k of range(0, a.size.columns)) {
          data[size.idx(i, j)] += (a.at(i, k) * b.at(k, j))
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
  exp() {
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
  to2dArray(): Array<Array<number>> {
    const result: any = []
    for (let r = 0; r < this.rows; r++) {
      const row: any = []
      for (let c = 0; c < this.columns; c++) {
        row.push(this.at(r, c))
      }
      result.push(row)
    }
    return result
  }
  toData(): Array<any> {
    return Array.from(this.data)
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
  concatRow(m: Matrix) {
    assert(Matrix.isMatrix(m), 'argument must be a Matrix')
    assert(m.size.columns === this.size.columns, 'must have the same columns')

    const cur = this.toData()
    const add = m.toData()
    const combined = cur.concat(add)

    const size = new Size(this.size.rows + m.size.rows, this.size.columns)
    return new Matrix(combined, size)
  }
  concatColumn(m: Matrix) {
    assert(Matrix.isMatrix(m), 'argument must be a Matrix')
    assert(m.size.rows === this.size.rows, 'must have the same rows')

    const result: any = []
    const width = this.size.rows
    const size = new Size(this.size.rows, this.size.columns + m.columns)
    const length = this.size.length()

    // for (let i = 0; i < size.length(); i++) {
    //   const [row, col] = Matrix.mdx(i, size)
    //   if (col < this.columns) {
    //     result[i] = this.at(row, col)
    //   } else {
    //     result[i] = m.at(row, col - this.columns)
    //   }
    // }

    // TODO(ritch) this shouldnt need a O(r * c) solution
    for (let r = 0; r < size.rows; r++) {
      for (let c = 0; c < size.columns; c++) {
        const i = size.idx(r, c)
        if (c < this.columns) {
          result[i] = this.at(r, c)
        } else {
          result[i] = m.at(r, c - this.columns)
        }
      }
    }

    return new Matrix(result, size)
  }
  repeatRows(rows: number): Matrix {
    assert(this.size.isRowVector(), 'can only repeatRows of row vector')
    let original = this
    let m: any = this
    while(m.size.rows < rows) {
      m = m.concatRow(original)
    }
    return m
  }
  repeatColumns(cols: number): Matrix {
    assert(this.size.isColumnVector(), 'can only repeatColumns of column vector')
    let original = this
    let m: any = this
    while(m.size.columns < cols) {
      m = m.concatColumn(original)
    }
    return m
  }
  idx(row: number, col: number) {
    return this.size.idx(row, col)
  }
  // mdx(i, size) {
  //   const col = Math.floor(i / size.rows)
  //   const row = (-col * size.rows) + i
  
  //   return [row, col]
  // }
  transpose() {
    return new TransposedMatrix(this.data, new Size(this.columns, this.rows))
  }
}

class TransposedMatrix extends Matrix {
  idx(row: number, col: number) {
    return (col * this.size.rows) + row
  }
}