import { Testable, TestProcess } from '@jtheta/test'
import { Tokenizer } from '../../lib/tokenizer';

const suite = new Testable('@jtheta/ast', 'AST Parser')

suite
  .define('parse()', 'title')
  .test('Basic parsing test', async (expect, log) => {
    // test
  })

suite
  .define('parseScript()', 'title')
  .test('Basic script parsing', async (expect, log) => {
    // test
  })

suite
  .define('tokenize()', 'title')
  .test('Basic tokenizing', async (expect, log) => {
    // test
  })

suite.run()

