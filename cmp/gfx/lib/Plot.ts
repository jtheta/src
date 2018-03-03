import {mat, Matrix} from '@jtheta/mat'
import Screen from './Screen'
import { Tensor } from '@jtheta/ten';

type TraceTypes = 'lines' | 'scatter'
type Trace = {
  x: Array<number>,
  y: Array<number>,
  name?: string,
  mode?: string,
  type?: TraceTypes
}

type Plotable = Matrix | Tensor

async function matFromAny(x: any): Promise<Matrix> {
  if (Matrix.isMatrix(x)) {
    return x
  }
  if (Tensor.isTensor(x)) {
    return x.asMatrix()
  }
  throw new Error('Could not convert any to Matrix')
}

export default class Plot {
  constructor(private screen: Screen) {
  }
  private traces: Array<Trace> = []
  private pending: any = []

  private async resolve(trace: any) {
    let xp
    let yp
    let zp

    if (trace.x) {
      xp = matFromAny(trace.x)
    }
    if (trace.y) {
      yp = matFromAny(trace.y)
    }
    if (trace.z) {
      zp = matFromAny(trace.z)
    }

    const [x, y, z] = await Promise.all([xp, yp, zp])
    if (x) {
      trace.x = x.toData()
    }
    if (y) {
      trace.y = y.toData()
    }
    if (z) {
      trace.z = z.to2dArray()
    }

    this.traces.push(trace)
    this.screen.handleChange('plot', this)
  }

  async wait() {
    await Promise.all(this.pending)
    this.pending = []
  }

  trace(options: any = {}): Plot {
    this.pending.push(this.resolve(options))
    return this
  }

  trace2d(x: Plotable, y: Plotable, options?: any): Plot {
    return this.trace({
      x,
      y,
      ...options
    })
  }

  trace3d(z: Plotable, options?: any): Plot {
    return this.trace({
      z,
      ...options
    })
  }

  line(x: Plotable, y: Plotable, options?: any): Plot {
    return this.trace2d(x, y, {...options, mode: 'lines'})
  }

  dot(x: Plotable, y: Plotable, options?: any): Plot {
    return this.trace2d(x, y, {...options, mode: 'markers'})
  }

  surface(z: Plotable, options?: any): Plot {
    return this.trace3d(z, {type: 'surface'})
  }

  contour(z: Plotable, options?: any): Plot {
    return this.trace3d(z, {type: 'contour'})
  }

  toPlotlyProps(): {data: Array<Trace>} {
    return {
      data: this.traces
    }
  }
}