import Tensor from '../lib/Tensor'
import {mat, Size, Matrix, Mish, Sish} from '@jtheta/mat'
import {assert} from '@jtheta/assert';

export {Tensor}

export type Tish = Tensor | Mish

export function ten(raw: Tish): Tensor {
  if (Tensor.isTensor(raw)) {
    return raw as Tensor
  }
  const m = mat(raw as any)
  return matToTensor(m)
}

function matToTensor(matrix: Matrix) {
  return new Tensor(matrix.toData(), matrix.size)
}

