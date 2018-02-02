import { Testable, TestProcess} from '@jtheta/test'

class BlockParser {
  parse() {
    return {type: 'function'}
  }
}
const suite = new Testable('blocks', 'Block Parser')
suite
  .define('a', 'The A test')
  .test(async (expect, log) => {
    const parser = new BlockParser()
    const result = parser.parse().type
    expect({result}).toEqual('function')
  })
  .define('b', 'The B test')
  .test(async (expect, log) => {
    
  })



const p = new TestProcess(suite)
p.exec()
