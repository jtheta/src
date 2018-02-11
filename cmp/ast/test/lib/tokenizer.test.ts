import { Testable, TestProcess } from '@jtheta/test'
import { Tokenizer } from '../../lib/tokenizer';

const suite = new Testable('tokenizer', 'class Tokenizer')

suite
  .define('errors()')
  .test('Empty string should have no errors', async (expect, log) => {
    const empty = ''
    const t = new Tokenizer(empty)
    const errors = t.errors()
    expect({errors}).toBeEmpty()
  })

suite
  .define('getNextToken()')
  .test('Simple variable should have instance token', async (expect, log) => {
    const t = new Tokenizer('a = 42')
    const token = t.getNextToken()
    expect({token}).toBeShaped({type: 'string', value: 'string'})
    const {type, value} = token
    expect({ type }).toEqual('Identifier')
    expect({value}).toEqual('a')
  })

suite.run()