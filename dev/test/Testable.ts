import { TestProcess } from "dev/test/TestProcess";
import { Expectation } from "dev/test/Expectation";

type testFn = (expect: (o: object) => Expectation, log: (...args) => void) => Promise<void>
export type TestCase = {
  title: string
  func: testFn
}

/**
 * Define a test case. Can also contain test cases.
 */
export class Testable {
  constructor(public name: string, public title?: string, private parent?: Testable) {
    if (name.length > 20) {
      console.error(`The name "${name}" is too long! It must be <= 10 chars!`)
      throw new Error('Testable "name" too long!')
    }
    if (title == undefined) {
      this.title = name
    }
    this.parent = parent
    this.tests = []
  }
  public tests: Array<TestCase>
  public children: Array<Testable> = []

  define(name: string, title?: string): Testable {
    const testable = new Testable(name, title, this)
    this.children.push(testable)
    return testable
  }
  test(title: string, func: testFn): Testable {
    this.tests.push({title, func})
    return this
  }
}