import { Testable, TestCase } from "./Testable";
import {expect, ExpectationError} from './Expectation'
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
  // should be extracted into a class
  const log = (msg: string | object) => {
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg, null, '  ')
    }
    const lines = msg.split('\n')

    process.stdout.write(
      lines
        .map(msg => `${out.ctx(out.padLeft(testable.name, 20))} ${out.ok('>')} ${msg}`)
        .join('\n') + '\n'
    )
  }

  return Promise.all(testable.tests.map(async (test: TestCase) => {
    try {
      await test.func(expect, log)
      process.stdout.write(`${out.padLeft(`${testable.parent.name}/${testable.name}`, 30)} > ${out.ok('✔')} ${out.title(test.title)}\n`)
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