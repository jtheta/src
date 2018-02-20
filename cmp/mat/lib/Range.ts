export default class Range implements Iterator<number> {
  constructor(private min: number, private max: number, private step:number = 1) {

  }
  private current: number
  next() {
    if (this.current === undefined) {
      this.current = this.min
    } else if(this.current + this.step >= this.max) {
      return {value: this.max, done: true}
    } else {
      this.current = this.current + this.step
    }
    return {value: this.current, done: false}
  }
  [Symbol.iterator]() {
    return this;
  }
}

export function range(min: number, max: number, step: number = 1): Range {
  return new Range(min, max, step)
}