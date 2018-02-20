import { Testable, TestProcess } from '@jtheta/test'
import { zeros, ones } from '../api/index';

const suite = new Testable('@jtheta/mat', 'AST Parser')

suite
  .define('zeros()', 'Zerros Matrix')
  .test('Basic test', async (expect, log) => {
    const z = zeros([10, 10])
    expect({z})
      .toHavePropOfType('rows', 'number')
      .toHavePropOfType('columns', 'number')
      .toHavePropWithValue('rows', 10)
      .toHavePropWithValue('columns', 10)
  })

suite.run()

