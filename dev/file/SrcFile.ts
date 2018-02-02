import * as fs from 'fs-extra'
import * as path from 'path'

const PLATFORM_DIR = process.env.PLATFORM_DIR
const TAB = '  '

export class SrcFile {
  constructor(public filePath: string) {
  }
  isPlatform() {
    return this.filePath.includes(PLATFORM_DIR)
  }
  async contents() {
    const buf = await fs.readFile(this.filePath)
    const content = buf.toString()
    return content
  }
  async lines() {
    const content = await this.contents()
    return content.split('\n') // might not work on other OSs
  }
  async inspectLine(num) {
    const lines = await this.lines()
    if (lines) {
      const target = lines[num]
      if (!target) {
        throw new Error('Line out of bounds / not found!')
      }
      let view = ''
      let prev = lines[num - 1]
      let next = lines[num + 1]

      if (prev) view += TAB + prev + '\n'
      view += '=>' + target + '\n'
      if (next) view += TAB + next + '\n'

      return view.split('\n').map((l, i) => `${num - 1 + i} | ${l}`).join('\n')
    }

    throw new Error('Tried to get line from empty file!')
  }
}