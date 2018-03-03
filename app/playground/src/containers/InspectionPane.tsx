declare var Plotly: any
declare var createPlotlyComponent: any

import * as React from 'react';
import Inspection from './Inspection'
import { Flex, Box } from 'grid-styled'
import { Row, Col } from '../components/grid'
import {Plot} from '@jtheta/gfx'

export default class InspectionPane extends React.Component {
  props: {
    inspections: Array<any>
  }
  render() {
    const inspections = this.props.inspections

    if (!inspections || inspections.length < 1) return null

    return (
      <Row p={3} mb={-3}>
        {inspections.map(ins => <Inspection raw={ins} />)}
      </Row>
    )
  }
}

