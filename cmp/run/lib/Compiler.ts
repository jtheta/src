import Executable from './Executable'
import * as matFuncs from '@jtheta/mat'
import * as tenFuncs from '@jtheta/ten'
// import * as trainFuncs from '@jtheta/tra'

export default class Compiler {
  constructor(private source: string) {

  }
  build(): Executable {
    const __send = (n) => {

    }

    const funcs = {__send, ...matFuncs}
    // wrap the source in a function
    const template = `
      async (process, screen, lib) => {
        const {
          ${Object.keys(matFuncs).join(',\n')},
          ${Object.keys(tenFuncs).join(',\n')},
          dl
        } = lib
        const {plot, disp, surface} = screen
 

        ${this.source}
      }
    `
    return new Executable(eval(template))
  }
}