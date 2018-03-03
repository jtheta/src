const path = require('path')
const ROOT = path.join(__dirname, '..', '..')
const BLD = path.join(ROOT, 'bld')
const CMP = path.join(ROOT, 'cmp')
const DEV = path.join(ROOT, 'dev')

export default {
  ROOT,
  BLD,
  CMP,
  DEV  
}