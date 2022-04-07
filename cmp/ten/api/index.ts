import {mat, Size, Matrix, Mish, Sish} from '@jtheta/mat'
import {assert} from '@jtheta/assert';

export type Tish = any

const dl = require('deeplearn')

export function ten(raw: Tish | any): any {
  if (isTensor(raw)) {
    return raw
  }
  return matToTensor(mat(raw))
}

export function matToTensor(matrix: Matrix) {
  return dl.tensor(matrix.toData(), [matrix.size.rows, matrix.size.columns])
}

export function isTensor(raw: any) {
  return raw instanceof dl.Tensor
}

export async function tenToMat(tensor: any) {
  tensor = ten(tensor)
  const d = await tensor.data()
  return new Matrix(d, new Size(tensor.shape[0] || 1, tensor.shape[1] || 1))
}

