import { Testable, TestProcess } from '@jtheta/test'
import {linspace} from '@jtheta/mat'

import {
  plot
} from '../api/index';

const ONE_BY_ONE = [1, 1]
const suite = new Testable('@jtheta/plot', 'Plot Library')

suite
  .define('plot()', 'Simple Line Plot')
  .test('Basic test', async (expect, log) => {
    const f = x => x ^ 2
    const y = linspace(0, 100, 1000)
    const p = plot(y.map(f), y)
  })

/*
    const f = x => x ^ 2
    const s = size(100, 100)
    const y = linspace(0, s.columns, 1000)
    const p = plot(y.map(f), y)
    const result = render(figure(p))
    const canvas = toHtmlCanvas(result)
*/
