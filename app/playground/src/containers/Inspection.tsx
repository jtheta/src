import * as React from 'react'
import {Matrix, mat} from '@jtheta/mat'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styled from 'styled-components'
import {th} from '../components/theme'
import Plot from 'react-plotly.js'

// Pane
const Size = styled.div`
  text-align: center;
`;

export default class Inspection extends React.Component {
  props: {raw: any}
  render() {
    const {raw} = this.props
    
    if (raw instanceof Error) {
      console.log(raw)
      return <InspectError err={raw} />
    }

    if (raw && raw.plotData) {
      return <Plot data={toPlotlyArray(raw.plotData)} />
    }

    const m = mat(raw)

    return (
      <Grid className="matrixInspection" fluid>
        <Row>
          <Col lg>
            <Size>{`${m.size.rows} x ${m.size.columns}`}</Size>
          </Col>
        </Row>
        {each(m)}
      </Grid>
    )
  }
}

function toPlotlyArray(data: any) {
  const x:any = []
  const y:any = []
  for (let i = 0; i < data.y.size.length(); i++) {
    x.push(data.x.idx(i))
    y.push(data.y.idx(i))
  }
  console.log(x,y)
  return [{x, y}]
}


function each(m: Matrix) {
  const rows: any = []
  const height = 25
  const width = 20
  for (let i = 0; i < m.size.rows; i++) {
    const row: any = []
    for (let j = 0; j < m.size.columns; j++) {
      const n = m.at(i, j)
      console.log(n)
      row.push((
        <Col lg key={[i,j].join('.')}>
          <div className="matrixAtValue">{n}</div>
        </Col>
      ))
    }
    rows.push(<Row children={row} />)
  }
  return rows
}


class InspectError extends React.Component {
  props: any
  render() {
    const err = this.props.err

    return (
      <pre className="uncaughtError">
        {err.toString()}
      </pre>
    )
  }
}