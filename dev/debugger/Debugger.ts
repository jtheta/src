import {log} from '@internal/out'
import {getWebpackConfig} from '@internal/build'
import {serve} from '@internal/serve'

export default class Debugger {
  constructor() {
    
  }
  async start() {
    await serve(getWebpackConfig('debugger'))
    log('Running debugger...')   
  }
}