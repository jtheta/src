import Matrix from './Matrix'
import {assert} from './assert'
import {range} from './Range'
import Size from './Size'

function getTerminalSize() {
  return Size.fromObject(process.stdout)
}

export default function inspectMatrix(matrix: Matrix) {
  const m = matrix
  const terminalSize = getTerminalSize()
  const maxWidth = terminalSize.columns
  const maxHeight = terminalSize.rows
  const minWidth = this.columns * 2
  const height = this.rows
  const sizeStr = `${m.rows} x ${m.columns}`
  let out = ''
  let actualWidth

  if (minWidth > maxWidth || height > maxHeight) {
    return sizeStr
  }

  if (out.length > maxWidth) {
    out = `${m.size.rows} x ${m.size.columns}`
  }

  for (let row of range(0, m.size.rows)) {
    for (let col of range(0, m.size.columns)) {
      out += m.at(row, col)
      if (col < m.rows - 1) {
        out += ' '
      }
    }
    if (row === 0) {
      actualWidth = out.length
    }
    if (row < m.size.rows - 1) {
      out += '\n'
    }
  }
  if (actualWidth > maxWidth) {
    return sizeStr
  }

  return out
}