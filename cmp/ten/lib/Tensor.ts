import {Size, Matrix} from '@jtheta/mat'
declare var deeplearn:any

if (typeof deeplearn === undefined) {
  deeplearn = require('deeplearn')
}

const dl = deeplearn

export default class Tensor {
  constructor(private raw: any, public size: Size) {
    if (raw instanceof dl.Tensor) {
      this.dl = raw
    } else {
      this.dl = dl.tensor2d(raw, [size.rows, size.columns])
    }
    this.rows = size.rows
    this.columns = size.columns
  }
  private rows: number
  private columns: number
  private dl: any
  static isTensor(target: any) {
    return target instanceof Tensor
  }
  pow(x: number): Tensor {
    const s = dl.scalar(x, 'int32')
    return new Tensor(this.dl.pow(s), this.size)
  }
  sqrt(): Tensor {
    return new Tensor(this.dl.sqrt(), this.size)
  }
  square(): Tensor {
    return this.pow(2)
  }
  sin(): Tensor {
    return new Tensor(this.dl.sin(), this.size)
  }
  sinh(): Tensor {
    return new Tensor(this.dl.sinh(), this.size)
  }
  cos(): Tensor {
    return new Tensor(this.dl.cos(), this.size)
  }
  norm(): Tensor {
    return new Tensor(this.dl.norm(), this.size)
  }
  abs(): Tensor {
    return new Tensor(this.dl.abs(), this.size)
  }
  sum(): Tensor {
    return new Tensor(this.dl.sum(), this.size)
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
  static scalar(x: number): Tensor {
    return new Tensor(dl.scalar(x), new Size(1, 1))
  }
  dot(x: number): Tensor {
    return this.dotMul(Tensor.scalar(x))
  }
  over(x: number): Tensor {
    return this.dotDiv(Tensor.scalar(x))
  }
  mul(b: Tensor) {
    return new Tensor(this.dl.matMul(b.dl), new Size(this.columns, this.rows))
  }
  dotMul(n: Tensor): Tensor {
    return new Tensor(this.dl.mul(n.dl), this.size)
  }
  dotDiv(n: Tensor): Tensor {
    return new Tensor(this.dl.div(n.dl), this.size)
  }
  exp(n: Tensor) {
    return new Tensor(this.dl.exp(n.dl), this.size)
  }
  add(n: Tensor) {
    return new Tensor(this.dl.add(n.dl), this.size)
  }
  sub(n: Tensor) {
    return new Tensor(this.dl.sub(n), this.size)
  }
  async asMatrix(): Promise<Matrix> {
    const raw = await this.dl.data()
    return new Matrix(raw, this.size)
  }
  async inspect(): Promise<string> {
    const matrix = await this.asMatrix()
    return matrix.inspect()
  }
  toString() {
    return `this.size.toString() Tensor`
  }
  equals(n: Tensor) {
    return new Tensor(this.dl.equals(n.dl), this.size)
  }
  neg() {
    return this.dot(-1)
  }
  prelu(alpha: number) {
    return new Tensor(this.dl.prelu(dl.scalar(alpha)), this.size)
  }
  relu(n: Tensor) {
    return new Tensor(this.dl.relu(), this.size)
  }
  selu(n: Tensor) {
    return new Tensor(this.dl.selu(), this.size)
  }
  sigmoid(n: Tensor) {
    return new Tensor(this.dl.sigmoid(), this.size)
  }
  transpose() {
    return new Tensor(this.dl.transpose(), new Size(this.columns, this.rows))
  }
}
