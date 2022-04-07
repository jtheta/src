import { Testable, TestProcess } from '@jtheta/test'
import { ones } from '@jtheta/mat'
import {
  ten
} from '../api/index';

const ONE_BY_ONE = [1, 1]
const suite = new Testable('@jtheta/ten', 'Tensor Library')

suite
  .define('ten()', 'Any to Tensor')
  .test('Simple', async (expect, log) => {
    const z = ten(ones([10, 10]))
    
    expect({z})
      .toHavePropOfType('rows', 'number')
      .toHavePropOfType('columns', 'number')
      .toHavePropWithValue('rows', 10)
      .toHavePropWithValue('columns', 10)
  })

suite.run()
