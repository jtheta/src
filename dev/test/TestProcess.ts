import { Testable, TestCase } from "./Testable";
import {expect, ExpectationError, Expectation} from './Expectation'
import { UsefulStackTrace } from 'dev/debug/UsefulStack';
import out from 'dev/out'

export class TestProcess {
  constructor(rootTestable: Testable) {
    this.rootTestable = rootTestable
  }
  rootTestable: Testable
  async exec() {
    try {
      await recursiveExec(this.rootTestable)
    } catch(e) {
      console.error(e.message)
    }
  }
}

async function execTest(testable: Testable) {
  const LM = 30 // left margin
  // should be extracted into a class
  const log = (msg: any) => {
    if (msg === undefined) {
      msg = 'undefined'
    }
    if (typeof msg.inspect === 'function') {
      msg = msg.inspect()
    }
    if (typeof msg !== 'string') {
      msg = JSON.stringify(msg || undefined, null, '  ')
    }
    const lines = msg.split('\n')

    process.stdout.write(
      lines
        .map(msg => `${out.ctx(out.padLeft(testable.name, LM))} ${out.ok('>')} ${msg}`)
        .join('\n') + '\n'
    )
  }
  
  return Promise.all(testable.tests.map(async (test: TestCase) => {
    try {
      let exps = []
      function expectWrapper(target: Object): Expectation {
        const exp = expect(target)
        exps.push(exp)
        return exp
      }
      await test.func(expectWrapper, log)
      process.stdout.write(`${out.padLeft(`${testable.parent.name}/${testable.name}`, LM)} > ${out.ok('✔')} ${out.title(test.title)}\n`)
      for (let exp of exps) {
        for (let msg of exp.messages) {
          log(`${out.ok('✔')} ${msg}`)
        }
      }
    } catch (e) {
      if (e instanceof ExpectationError) {
        log(`${out.fail('✖')} ${out.title(test.title)}`)
        log(`${out.warn('fail!')} - ${out.ctx(e.description)}`)
        return
      }

      const ust = new UsefulStackTrace(e.stack)
      log(out.ctx(`[${out.err('error')}]`))
      log(out.err(await ust.build()))
    }
  }))
}

async function recursiveExec(testable: Testable, tests: Array<any> = []) {
  tests.push(execTest(testable))
  tests = tests.concat(testable.children.map(t => recursiveExec(t, tests)))
  return Promise.all(tests)
}