import * as colors from 'colors'

export default {
  ok: str => colors.green(str),
  key: str => colors.cyan(str),
  val: str => colors.cyan.bold(str),
  err: str => colors.red(str),
  warn: str => colors.yellow(str),
  info: str => colors.inverse(str),
  title: str => colors.cyan.bold(str),
  ctx: str => colors.dim(str),
  padLeft: (str: string, width: number) => {
    while (str.length <= width) {
      str = ' ' + str
    }
    return str
  }
}