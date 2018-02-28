import { Testable, TestProcess } from '@jtheta/test'
import Size from '../../lib/Size';
import Matrix from '../../lib/Matrix';
import {ones} from '../../api/index'

const suite = new Testable('@jtheta/mat/Matrix', 'class Matrix')

const m = n => new Matrix([n], new Size(1, 1))
const ONE_BY_ONE = [1, 1]

const dotDiv = suite.define('m.dotDiv()', 'Element wise disvision')

// dotDiv
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

suite.define('m.concatColumns()', 'Repeating columns')
  .test('simple', async (expect, log) => {
    const a = ones([10, 1])
    const b = ones([10, 1])
    const ex = a.concatColumn(b)

    expect({ex})
      .toBeMatrix()
      .toBeSize([10, 2])
      .toBeMatrixOf(1)
  })

suite.define('idx()', 'Index for row/col')
  .test('simple', async (expect, log) => {
    const ex = Matrix.idx(0, 0, new Size(1, 1))
    expect({ex}).toEqual(0)
  })
  .test('end', async (expect, log) => {
    const ex = Matrix.idx(9, 9, new Size(10, 10))
    expect({ex}).toEqual(99)
  })

suite.define('mdx()', 'Index for row/col')
  .test('simple', async (expect, log) => {
    const [row, col] = Matrix.mdx(0, new Size(1, 1))
    expect({row}).toEqual(0)
    expect({col}).toEqual(0)
  })
  .test('end', async (expect, log) => {
    const [row, col] = Matrix.mdx(99, new Size(10, 10))
    expect({row}).toEqual(9)
    expect({col}).toEqual(9)
  })

suite.define('m.repeatColumns()', 'Repeating columns')
  .test('repeatColumns', async (expect, log) => {
    const tenByOne = ones([10, 1])
    const ex = tenByOne.repeatColumns(10)

    expect({ex})
      .toBeMatrix()
      .toBeSize([10, 10])
      .toBeMatrixOf(1)
  })

// suite.run()

