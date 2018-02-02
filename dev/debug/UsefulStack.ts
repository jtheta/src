import { SrcFile } from "dev/file/SrcFile"

class StackFrame {
  context: string
  internal: boolean
  anonymous: boolean
  file: string
  line: number
  column: number
  path: string
  src: string
  assertion: boolean

  toString() {
    const f = this
    let s = `.${f.file}:${f.line}\n`
    s += `${f.context}`

    if (f.src) {
      s += '\n'
      s += f.src
    }

    return s
  }
  static async fromRawLine(line): StackFrame {
    const PROJECT_PATH = process.env.PLATFORM_DIR

    const frame = new StackFrame()
    const spaced = line.split(' ')
    frame.context = spaced[0]
    let context = spaced[1]

    context = context.split('')
    context.shift() // remove (
    context.pop() // remove )
    context = context.join('')
    context = context.match(/^([^:]+):([0-9]+):([0-9]+)$/)

    if (context) {
      frame.path = context[1]
      frame.file = frame.path.replace(PROJECT_PATH, '')
      frame.line = context[2]
      frame.column = context[3]
      frame.anonymous = frame.context.includes('<anonymous>')
      frame.internal = !frame.path.includes(PROJECT_PATH)
      frame.dependency = frame.path.includes('node_modules')
      frame.assertion = frame.context.includes('Expectation')
      if (!frame.internal) {
        const srcFile = new SrcFile(frame.path)
        frame.src = await srcFile.inspectLine(frame.line - 1)
      }
    }

    return frame
  }
}

export class UsefulStackTrace {
  constructor(raw: string) {
    this.lines = raw.split('\n')
    this.title = this.lines.shift()
  }
  lines: Array<string>
  title: string
  async frames(): Promise<Array<StackFrame>> {
    return Promise.all(this.parse().map(StackFrame.fromRawLine))
  }
  parse() {
    const lines = this.lines
    const clean = []

    for (let line of lines) {
      line = line.trim().replace('at ', '')

      // ignore "<anonymous>" lines since they include no other useful info
      if (line.includes('(')) {
        clean.push(line)
      }
    }

    return clean
  }
  async build() {
    const stack = (await this
      .frames())
      .filter(f => !f.internal && !f.assertion && !f.anonymous && f.src)
      .map(f => f.toString()).join('\n')

    return this.title + '\n' + stack
  }
}