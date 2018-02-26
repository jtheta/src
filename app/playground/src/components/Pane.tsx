import * as React from 'react'
import styled from 'styled-components'
import { Row, Col } from '../components/grid'
import {th} from './theme'
import {Flex, Box} from 'grid-styled'

// Pane
const Pane = styled(Box)`
  background: ${th.paneBackground};
  height: calc(100vh - 65px);
  width: 100%;
  color: ${th.foreground}
`;

export default (props: any) => (
  <Col flex='1'>
    <Pane light={props.light} p={3}>{props.children}</Pane>
  </Col>
)