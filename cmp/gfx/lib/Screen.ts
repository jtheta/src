import Plot from "./Plot";
import {Matrix, mat} from "@jtheta/mat";
import {isTensor, tenToMat} from '@jtheta/ten'
import { assert } from "../../mat/lib/assert";

type ScreenChangeType = 'inspection' | 'plot'

interface IScreenManager {
  update: (type: ScreenChangeType, screen: Screen) => void
}

type MatrixInspection = {
  title?: string,
  matrix: Matrix
}

export default class Screen {
  constructor() {
    this.disp = this.disp.bind(this)
    this.plot = this.plot.bind(this)
  }
  public inspections: Array<any> = []
  public plots: Array<Plot> = []
  private manager: IScreenManager
  private currentId: 1
  plot(x?: Matrix, y?: Matrix) {
    const plot = new Plot(this)
    this.plots.push(plot)
    if (x && y) {
      plot.line(x, y)
    } else if (x && !mat(x).size.isVector()) {
      plot.surface(x)
    }
    this.handleChange('plot', plot)
    return plot
  }
  async disp(obj: any) {
    const keys = Object.keys(obj)
    const isNamed = keys.length === 1
    const title = isNamed ? keys[0] : undefined
    let matrix = obj
    if (title) {
      matrix = obj[title]
    }
    const push = (matrix) => {
      const ins = {title, matrix}
      this.inspections.push(ins)
      this.handleChange('inspection', ins)
    }

    if (isTensor(matrix)) {
      matrix = await tenToMat(matrix)
      push(matrix)
    } else {
      push(matrix)
    }
  }
  displayError(e: Error) {
    this.inspections.push(e)
    console.error(e)
    this.handleChange('inspection', e)
  }
  handleChange(type: ScreenChangeType, changedObject: any) {
    this.manager.update(type, this)
  }
  update(manager: IScreenManager) {
    this.manager = manager
  }
}