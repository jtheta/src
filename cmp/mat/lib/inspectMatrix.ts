import Matrix from './Matrix'
import {range} from './Range'
import Size from './Size'

function getTerminalSize() {
  const {rows = 80, columns = 80} = process.stdout || {}
  return Size.fromObject({rows, columns})
}

export default function inspectMatrix(matrix: Matrix): string {
  const m = matrix
  const terminalSize = getTerminalSize()
  const maxWidth = terminalSize.columns
  const maxHeight = terminalSize.rows
  const minWidth = m.size.columns * 2
  const height = m.size.rows
  const sizeStr = `${m.size.rows} x ${m.size.columns}`
  let out = ''
  let actualWidth

  if (minWidth > maxWidth || height > maxHeight) {
    return sizeStr
  }

  if (out.length > maxWidth) {
    out = `${m.size.rows} x ${m.size.columns}`
  }

  for (let row = 0; row < m.size.rows; row++) {
    for (let col = 0; col < m.size.columns; col++) {
      out += m.at(row, col)
      if (col < m.size.rows - 1) {
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
  // if (actualWidth > maxWidth) {
  //   return sizeStr
  // }

  return sizeStr + '\n' + out
}
