import { Mish } from "@jtheta/mat";
import Plot from "../lib/Plot";
import Figure from "../lib/Figure";

/*
function myGraph() {
  const f = x => x ^ 2
  const y = linspace(0, 100, 1000)
  const x = y.map(f)

  return <Graphics>
    <Layer>
      <Figure title="positive / negative">
        <Plot {...{x, y}} />
        <Plot {...{x: x.neg(), y}} />
      </Figure>
      <Figure title="inverse">
        <Plot {...{x: x.inv(), y}} />
      </Figure>
    </Layer>
  </Graphics>
}
*/

export function plot(x: Mish, y: Mish) {
  return new Plot(x, y)
}

export function toSVG(layers: Array<Layer>) {

}

export function figure(plot: Plot, ) {

}