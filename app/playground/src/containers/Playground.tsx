declare var Plotly: any
declare var createPlotlyComponent: any

import * as React from 'react';
import Editor from './Editor'
import InspectionPane from './InspectionPane'
import PlotPane from './PlotPane'
import compileAndRun from './compileAndRun'
import Pane from '../components/Pane'
import { Flex, Box } from 'grid-styled'
import { Row, Col } from '../components/grid'
import {compile, run} from '@jtheta/run'
import {createScreen, Screen} from '@jtheta/gfx'

export default class Container extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      screen: {
        plots: [],
        inspections: []
      }
    }
  }
  state: any

  render() {
    return (
      <Row p={3} mb={-3}>
        <Pane light={true} flex='1' width={1 / 2}>
          <Editor onRun={this.handleRun.bind(this)} />
        </Pane>
        <Pane flex='1' width={1 / 2}>
          <PlotPane plots={this.state.screen.plots} />
          <InspectionPane inspections={this.state.screen.inspections} />
        </Pane>
      </Row>
    )
  }

  handleRun(source: string) {
    this.setState({screen: {}})
    const exe = compile(source)
    const screen = createScreen()
    
    screen.update({
      update: (type, screen: Screen) => {
        // TODO(ritch) optimize for type
        this.setState({
          screen: {
            plots: screen.plots,
            inspections: screen.inspections
          }
        })
      }
    })
    
    const [exit, process] = run(exe, screen)
    // compileAndRun(source, (n: any) => this.handleOutput(n))
  }
}

