import {Dependency} from './Dependency'

export class Testable {
  constructor(public name: string, public title: string, private parent: Testable) {
    this.dependencies = []
  }
  dependencies: Array<Dependency>
  define(name, title) {
    return new Testable(name, title, this)
  }
  given() {

  }
  when() {

  }
  then() {

  }
}