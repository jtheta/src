const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const Promise = require('bluebird')

import {log} from '@internal/out'

export async function serve(config) {
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  const listen = Promise.promisify(server.listen.bind(server))
  const port = 8080
  await listen(8080)
  log(`serving at http://localhost:${port}`)
}