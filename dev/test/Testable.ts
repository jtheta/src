import { TestProcess } from "dev/test/TestProcess";
export type runTest = (expect: (o: object) => any, log: (...args) => void) => Promise < void>

/**
 * Define a test case. Can also contain test cases.
 */
export class Testable {
  constructor(public name: string, public title: string, private parent?: Testable) {
    if (name.length > 10) {
      console.error(`The name "${name}" is too long! It must be <= 10 chars!`)
      throw new Error('Testable "name" too long!')
    }
    this.parent = parent
    this.testFns = []
  }
  public testFns: Array<runTest>
  public children: Array<Testable> = []

  define(name, title): Testable {
    const testable = new Testable(name, title, this)
    this.children.push(testable)
    return testable
  }
  test(testFn: runTest): Testable {
    this.testFns.push(testFn)
    return this
  }
}