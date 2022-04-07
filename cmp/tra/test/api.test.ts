import { Testable, TestProcess } from '@jtheta/test'
import { ones, exp, mat } from '@jtheta/mat'
import {
  lesson,
  train,
  CostFunction
} from '../api/index';
import { ten, Tensor } from '@jtheta/ten';

const ONE_BY_ONE = [1, 1]
const suite = new Testable('@jtheta/trai', 'Training Library')

const lessonTest = suite.define('lesson()', 'Training')
  
// lessonTest
//   .test('Simple', async (expect, log) => {
//     const input = ones([1, 10])
//     const labels = ones([1, 10]).dot(2)
//     const duration = 10
//     const h = (theta, x) => {
//       return x.add(theta)
//     }
//     const exp = lesson(h, input, labels, duration)
//     expect({exp}).toBeObject()
//   })
  
lessonTest  
  .test('Advanced', async (expect, log) => {
    const initialTheta = ten([1])
    const hypothesis = (theta, x) => x.add(theta)
    const houses = ten([1000, 1100, 1200, 13000])
    const prices = ten([500, 550, 600, 750])
    const duration = 100
    const l = lesson(hypothesis, houses, prices, duration, true)
    const learningRate = 0.1
    const cost = (pred, label) => pred.sub(label).square().mean()
    const theta = await l.learn(initialTheta, cost, train.sgd(learningRate))
    const tm = await theta.asMatrix()
    console.log(tm)
    const expected = mat([2])

    expect({tm})
      .toBeMatrix()
      .toBeSize(initialTheta.size)
      .toMatrixEqual(expected)

    const predictions = hypothesis(theta, houses)

  })

suite.run()
