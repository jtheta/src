const PATHS = require('../paths').default
const Promise = require('bluebird')
const path = require('path')
const glob = Promise.promisify(require('glob'))
const fs = require('fs-extra')

// find component files
// uses https://github.com/isaacs/node-glob
// ex. find('*.yml') => all config files
export async function find(target, scope) {
  const cmps = scope ? [scope] : await listComponents()
  let promises = []
  for (let comp of cmps) {
    const dir = path.join(PATHS.CMP, comp)

    promises.push(
        glob(path.join('.', target), {cwd: dir})
          .then(matched => matched.map(p => ({
            path: path.join(dir, p),
            comp,
            dir
          })
        )
      )
    )
  }

  const results = await Promise.all(promises)
  const flat = []
  for (let cmp of results) {
    for (let f of cmp) {
      flat.push(f)
    }
  }

  return flat
}

// list all platform components
async function listComponents() {
  const files = await fs.readdir(PATHS.CMP)
  const result = []
  for (let file of files) {
    const cPath = path.join(PATHS.CMP, file)
    const stat = await fs.stat(cPath)
    if (stat.isDirectory()) {
      result.push(file)
    }
  }
  return result
}