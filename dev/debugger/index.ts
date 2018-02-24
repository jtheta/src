// Starts the debugger env
import Debugger from './Debugger'

export function startDebugger() {
  return new Debugger().start()
}