import * as React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Flex, Box} from 'grid-styled'
import theme from './theme'
import {th} from './theme'

const Container = styled.div`
  color: ${th.foreground};
  font-family: ${th.font};
  background: ${th.background};
  position: absolute;
  height: 100%;
  width: 100%;
`

export default class Chrome extends React.Component{
  props: {children: any}
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          {this.props.children}
        </Container>
      </ThemeProvider>
    )
  }
}