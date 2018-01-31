import {TestSuite} from '../../../dev/test'

export default function run() {
  const suite = new TestSuite('blocks', 'Block Parser')

  suite
    .define('func', 'Function Blocks')
      .test((given, when) => {
        const src = '...'
        const parser = new BlockParser()

        when('parsing a simple funciton', () => {
          return parser.parse(src)
        })

      })

  describe('blocks', () => {
    let block

    beforeAll(() => {
      block = new BlockParser()
    })
    describe('function blocks', () => {
      
    })
  })
}