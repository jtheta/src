import { assert } from "./assert";
import Matrix from "./Matrix";

export default class Size {
  constructor (
    public rows: number,
    public columns: number
  ) {
    assert(rows > 0)
    assert(columns > 0)
    assert(rows < Infinity)
    assert(columns < Infinity)
  }
  static isSize(size: any) {
    return size instanceof Size
  }
  static fromObject(obj: {rows: number, columns: number}) {
    return new Size(obj.rows, obj.columns)
  }
  static fromAny(arg: any): Size {
    if (Size.isSize(arg)) {
      return arg
    }
    const [rows, columns] = arg
    return new Size(rows, columns)
  }
  equals(size: Size) {
    return this.rows === size.rows
    && this.columns === size.columns
  }
  length() {
    return this.rows * this.columns
  }
  gt(size: Size) {
    return this.length() > size.length()
  }
  lt(size: Size) {
    return this.length() < size.length()
  }
  gte(size: Size) {
    if (this.equals(size)) return true
    if (this.gt(size)) return true
    return false
  }
  lte(size: Size) {
    if (this.equals(size)) return true
    if (this.lt(size)) return true
    return false
  }
  isVector() {
    return this.rows === 1 || this.columns === 1
  }
  isScalar() {
    return this.rows === 1 && this.columns === 1
  }
  toString() {
    return `[${this.rows}, ${this.columns}]`
  }
  toMatrix(value: any) {
    const data: Array<any> = []
    for (let i = 0; i < this.length(); i++) {
      data.push(value)
    }
    return new Matrix(data, this)
  }
  toEmptyArray(): Array<number> {
    return new Array(this.length()).fill(0)
  }
}