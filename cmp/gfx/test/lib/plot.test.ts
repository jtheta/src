import { Testable, TestProcess } from '@jtheta/test'
import Size from '../../lib/Size'
import Matrix from '../../lib/Matrix'
const suite = new Testable('@jtheta/mat/Matrix', 'class Matrix')

const m = n => new Matrix([n], new Size(1, 1))
const ONE_BY_ONE = [1, 1]

const dotDiv = suite.define('m.dotDiv()', 'Element wise disvision')

dotDiv
  .test('scalar', async (expect, log) => {
    const ex = m(8).dotDiv(m(2))
    expect({ex})
      .toBeMatrix()
      .toBeSize(ONE_BY_ONE)
      .toBeMatrixOf(4)
  })

dotDiv
  .test('matrix', async (expect, log) => {
    const ex = m(8).dotDiv(m(2))
    expect({ex})
      .toBeMatrix()
      .toBeSize(ONE_BY_ONE)
      .toBeMatrixOf(4)
  })

suite.run()

