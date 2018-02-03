import out from 'dev/out'

function assert(ok, msg = 'Assertion failed') {
  if(!ok) throw new Error(msg)
}

type jsTypes = 'object' | 'boolean' | 'function' | 'string' | 'number'

export function expect(target: Object): Expectation {
  const keys = Object.keys(target)
  assert(keys.length === 1)
  const key = keys[0]
  const value = target[key]

  return new Expectation(keys[0], value)
}

export class Expectation {
  constructor(public name: String, public value: any) {
    this._name = out.key(name)
  }
  private _name: string;
  assert(ok: boolean, msg: string) {
    if (!ok) {
      throw new ExpectationError(msg)
    }
  }
  private getValueForProp(prop: string) {
    this.toBeObject()
    // todo support property via json path
    return this.value[prop]
  }
  toBeObject() {
    this.assert(
      typeof this.value === 'object',
      `${this._name} to be an object`
    )
  }
  toEqual(expectedValue: any) {
    this.assert(
      this.value === expectedValue,
      `${this._name} to equal ${out.val(expectedValue)} was ${out.val(this.value)}`
    )
  }
  toBeArray(expectedValue: any) {
    this.assert(
      Array.isArray(expectedValue),
      `${this._name} to be an array, istead got ${typeof expectedValue}`
    )
  }
  toHavePropOfType(prop: string, type: jsTypes) {
    this.assert(
      typeof typeof this.value[prop] === type,
      `${this._name}.length to be ${out.key(type)}`
    )
  }
  toHavePropWithValue(prop: string, expectedValue: any) {
    this.assert(
      this.getValueForProp(prop) === expectedValue,
      `${this._name}.${prop} to be ${out.val(expectedValue)}`
    )
  }
  toHaveNumberProp(prop: string) {
    this.assert(
      typeof this.value[prop] === 'number',
      `${this._name}.length to be number`
    )
  }
  toBeEmpty() {
    this.toBeArray(this.value)
    this.assert(
      this.value.length === 0,
      `${this._name} to be empty, instead has length ${out.val(this.value.length)}`
    )
  }
  toBeShaped(shape: object) {
    for (let [key, value] of Object.entries(shape)) {
      this.toHavePropOfType(key, value)
    }
  }
}

export class ExpectationError extends Error {
  constructor(public description: string) {
    super(description)
  }
}