import out from 'dev/out'
import Matrix from 'cmp/mat/lib/Matrix'
import Size from 'cmp/mat/lib/Size';

function assert(ok, msg = 'Assertion failed') {
  if(!ok) throw new Error(msg)
}

type jsTypes = 'object' | 'boolean' | 'function' | 'string' | 'number'

export function expect(target: Object): Expectation {
  const keys = Object.keys(target)
  assert(keys.length === 1, 'expect({myValue}) - dont forget the curlies!')
  const key = keys[0]
  const value = target[key]
  this.messages = []
  return new Expectation(keys[0], value)
}

export class Expectation {
  constructor(public name: String, public value: any) {
    this._name = out.key(name)
    this.messages = []
  }
  private _name: string;
  public messages: Array<string>
  assert(ok: boolean, msg: string) {
    if (!ok) {
      throw new ExpectationError(msg)
    }
    this.messages.push(msg)
  }
  private getValueForProp(prop: string) {
    this.toBeObject()
    // todo support property via json path
    return this.value[prop]
  }
  toBeObject(): Expectation {
    this.assert(
      typeof this.value === 'object',
      `${this._name} to be an object`
    )
    return this
  }
  toEqual(expectedValue: any): Expectation {
    this.assert(
      this.value === expectedValue,
      `${this._name} to equal ${out.val(expectedValue)} was ${out.val(this.value)}`
    )
    return this
  }
  toBeArray(expectedValue: any): Expectation {
    this.assert(
      Array.isArray(expectedValue),
      `${this._name} to be an array, istead got ${typeof expectedValue}`
    )
    return this
  }
  toHavePropOfType(prop: string, type: jsTypes): Expectation {
    this.assert(
      typeof this.value[prop] === type,
      `${this._name}.${prop} to be ${out.key(type)}`
    )
    return this
  }
  toHavePropWithValue(prop: string, expectedValue: any): Expectation {
    this.assert(
      this.getValueForProp(prop) === expectedValue,
      `${this._name}.${prop} to be ${out.val(expectedValue)}`
    )
    return this
  }
  toHaveNumberProp(prop: string): Expectation {
    this.assert(
      typeof this.value[prop] === 'number',
      `${this._name}.length to be number`
    )
    return this
  }
  toBeEmpty(): Expectation {
    this.toBeArray(this.value)
    this.assert(
      this.value.length === 0,
      `${this._name} to be empty, instead has length ${out.val(this.value.length)}`
    )
    return this
  }
  toBeShaped(shape: object): Expectation {
    for (let [key, value] of Object.entries(shape)) {
      this.toHavePropOfType(key, value)
    }
    return this
  }
  toBeMatrix(): Expectation {
    this.assert(
      this.value instanceof Matrix,
      `${this._name} to be instanceof ${out.key('Matrix')}`
    )
    return this
  }
  toBeSize(size: Size | Array<any>) {
    size = Size.fromAny(size)
    this.assert(
      (this.value as Matrix).size.equals(size),
      `${this._name} to be size ${out.key(size)} was ${out.key(this.value.size)}`
    )
    return this
  }
  toBeMatrixOf(n: any) {
    this.assert(
      (this.value as Matrix).filledWith(n),
      `${this._name} to be matrix of ${out.key(n)}\n${this.value.inspect()}`
    )
    return this
  }
  toMatrixEqual(n: Matrix) {
    this.assert(
      (this.value as Matrix).equals(n).toBoolean(),
      `${this._name} to matrix equal ${out.key(n.toShortString())}`
    )
    return this
  }
}

export class ExpectationError extends Error {
  constructor(public description: string) {
    super(description)
  }
}