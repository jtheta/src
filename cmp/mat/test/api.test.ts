import { Testable, TestProcess } from '@jtheta/test'
import {
  zeros,
  ones,
  sigmoid,
  exp,
  onePlus,
  neg,
  oneOver,
  mat,
  linspace,
  meshgrid
} from '../api/index';

const ONE_BY_ONE = [1, 1]
const suite = new Testable('@jtheta/mat', 'Matrix Library')

// suite
//   .define('zeros()', 'Zerros Matrix')
//   .test('Basic test', async (expect, log) => {
//     const z = zeros([10, 10])
//     expect({z})
//       .toHavePropOfType('rows', 'number')
//       .toHavePropOfType('columns', 'number')
//       .toHavePropWithValue('rows', 10)
//       .toHavePropWithValue('columns', 10)
//   })

// suite
//   .define('oneOver()', 'One Plus Function')
//   .test('1 / 4 = 0.25', async (expect, log) => {
//     const n = oneOver(4)
//     expect({n})
//       .toBeMatrix()
//       .toBeSize(ONE_BY_ONE)
//       .toBeMatrixOf(0.25)
//   })

// suite
//   .define('onePlus()', 'One Plus Function')
//   .test('1 + 1 = 2', async (expect, log) => {
//     const n = onePlus(1)
//     expect({n})
//       .toBeMatrix()
//       .toBeSize(ONE_BY_ONE)
//   })

// suite
//   .define('neg()', 'Negate Function')
//   .test('-1', async (expect, log) => {
//     const n = neg(1)
//     expect({n})
//       .toBeMatrix()
//       .toBeSize(ONE_BY_ONE)
//       .toBeMatrixOf(-1)
//   })

// suite
//   .define('exp()', 'Exp Function')
//   .test('of 1', async (expect, log) => {
//     const g = exp(1).idx(0)
//     expect({g}).toEqual(2.718281828459045)
//   })

// suite
//   .define('oneOver(onePlus(1))', 'Exp Function')
//   .test('1 / 2 = 0.5', async (expect, log) => {
//     const g = oneOver(onePlus(1))
//     expect({g}).toBeMatrixOf(0.5)
//   })

// suite
//   .define('sigmoid()', 'Sigmoid Function')
//   .test('of 1', async (expect, log) => {
//     const g = sigmoid(1)
//     expect({g})
//       // full - 0.7310585786300048792512
//       .toBeMatrixOf(0.731058578630004879)
//   })


// suite
//   .define('linspace()', 'Linearly spaced matrix')
//   .test('of 1', async (expect, log) => {
//     const y = linspace(1, 8, [1, 8])
//     y.
//     expect({y})
//       .toBeMatrix()
//       // .toBeSize([1, 8])
//       .toMatrixEqual(mat([1,2,3,4,5,6,7,8]))
//   })

suite
  .define('meshgrid()', 'Create a grid (2 matrices) from a pair of vectors')
  .test('simple', async (expect, log) => {
    const x1 = ones([1, 10])
    const y1 = ones([10, 1])
    const [x, y] = meshgrid(x1, y1)

    expect({x})
      .toBeMatrix()
      .toBeSize([10, 10])
      .toBeMatrixOf(1)
    
    expect({y})
      .toBeMatrix()
      .toBeSize([10, 10])
      .toBeMatrixOf(1)
  })

suite.run()
