declare var Plotly: any
declare var createPlotlyComponent: any

import * as React from 'react';
import Editor from './Editor'
import Inspection from './Inspection'
import compileAndRun from './compileAndRun'
import Pane from '../components/Pane'
import { Flex, Box } from 'grid-styled'
import { Row, Col } from '../components/grid'

export default class Container extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      lastOutput: null,
      output: []
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
          {this.state.output.map(n => <Inspection raw={n} />)}
        </Pane>
      </Row>
    )
    // return (
    //   <Grid fluid>
    //     <Row className="container">
    //       <Col className="editor" lg>
    //         <Editor onRun={this.handleRun.bind(this)} />
    //       </Col>
    //       <Col className="output" lg>
    //       </Col>
    //     </Row>
    //   </Grid>
    // )
  }
  handleOutput(n: any) {
    this.setState((state: any) => {
      return {
        output: [...state.output, n]
      }
    })
  }

  handleRun(source: string) {
    this.setState({ output: [] })
    compileAndRun(source, (n: any) => this.handleOutput(n))
  }
}