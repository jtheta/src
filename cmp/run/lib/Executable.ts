import Process from "./Process";
import * as matFuncs from '@jtheta/mat'
import * as tenFuncs from '@jtheta/ten'
// import * as trainFuncs from '@jtheta/tra'
const dl = require('deeplearn')

export default class Executable {
  constructor(private program: (process: Process, screen: Screen, lib: any) => Promise<void>) {

  }
  async run(process, screen) {
    try {
      await this.program(process, screen, {...tenFuncs, ...matFuncs, dl})
    } catch(e) {
      screen.displayError(e)
    }
  }
}