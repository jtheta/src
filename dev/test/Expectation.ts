function assert(ok, msg = 'Assertion failed') {
  if(!ok) throw new Error(msg)
}

export function expect(target: Object): Expectation {
  const keys = Object.keys(target)
  assert(keys.length === 1)
  const key = keys[0]
  const value = target[key]

  return new Expectation(keys[0], value)
}

export class Expectation {
  constructor(public name: String, public value: any) {
  }
  assert(ok: boolean, msg: string) {
    if (!ok) {
      throw new ExpectationError(`Expected ${msg}`)
    }
  }
  toEqual(expectedValue: any) {
    this.assert(
      this.value === expectedValue,
      `${this.name} to equal ${expectedValue}`
    )
  }
}

export class ExpectationError extends Error {
  constructor(public description: string) {
    super(description)
  }
}