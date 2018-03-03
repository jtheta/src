import Process from "./Process";
import * as matFuncs from '@jtheta/mat'
import * as tenFuncs from '@jtheta/ten'

let currentPid = 0

export default class Executable {
  constructor(private program: (process: Process, screen: Screen, lib: any) => Promise<void>) {

  }
  async run(process, screen) {
    try {
      await this.program(process, screen, {...tenFuncs, ...matFuncs})
    } catch(e) {
      screen.displayError(e)
    }
  }
}