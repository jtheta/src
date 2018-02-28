import * as matFuncs from '@jtheta/mat'
import * as esprima from 'esprima'

export default function compileAndRun(source: string, out: any) {

  const disp = (n: any) => {
    out(n)
  }
  const plot = (x: any, y: any) => {
    out({plotData: {x, y}, type: 'line'})
  }
  const surface = (z: any) => {
    out({plotData: {z}, type: 'surface'})
  }
  const funcs = {surface, disp, ...matFuncs}

  const template = `
    (${Object.keys(funcs).join(',')}) => {
      ${source}
    }
    `
  
  const compiled = compile(source)

  const executable = eval(template)

  try {
    executable.apply(null, Object.keys(funcs).map(k => funcs[k]))
  } catch (e) {
    out(e)
  }
}

function compile(source) {
  const lines = source.split('\n')
  const ast = esprima.parse(source, {comment: true, range: true})
  console.log(ast)
  for (let comment of ast.comments) {
    if (comment.value.trim() == '=>') {
      console.log(comment.range)
    }
  }
  return source 
}

