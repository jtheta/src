import { Testable } from "./Testable";
import {expect} from './Expectation'
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
  const log = (msg: string) => {
    const lines = msg.split('\n')

    process.stdout.write(
      lines
        .map(msg => `${out.ctx(out.padLeft(testable.name, 10))} ${out.ok('>')} ${msg}`)
        .join('\n') + '\n'
    )
  }

  return Promise.all(testable.testFns.map(async fn => {
    try {
      await fn(expect, log)
      log(out.ok('pass!'))
    } catch (e) {
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