import Executable from '../lib/Executable'
import Process, {IListener} from '../lib/Process'
import Compiler from '../lib/Compiler'
import {Screen} from '@jtheta/gfx'

export function compile(source: string): Executable {
  const compiler = new Compiler(source)
  return compiler.build()
}

export function run(exe: Executable, screen: Screen): [Promise<void>, Process] {
  const process = new Process()
  return [exe.run(process, screen), process]
}