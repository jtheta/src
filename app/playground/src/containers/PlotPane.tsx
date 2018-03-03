import * as React from 'react';
import { Flex, Box } from 'grid-styled'
import { Row, Col } from '../components/grid'
import {Plot as GfxPlot} from '@jtheta/gfx'
import Plotly from 'react-plotly.js'

export default class PlotPane extends React.Component {
  props: {
    plots: Array<GfxPlot>
  }
  render() {
    const plots = this.props.plots

    if (!plots || plots.length < 1) return null

    return (
      <Box p={3} mb={-3}>
        {plots.map(p => (
          <Row>
            <Plotly {...p.toPlotlyProps()} />
          </Row>
        ))}
      </Box>
    )
  }
}

