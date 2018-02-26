import { darken } from 'polished'
import * as React from 'react'
import styled from 'styled-components'
import {Flex, Box} from 'grid-styled'
import {th} from './theme'

// Menu
const Background = styled.div`
  background: ${th.menuBg};
  border-bottom: ${th.menuBottomBorder};
  filter: drop-shadow(0 3px 3px ${th.menuBg});
`

const StyledButton = styled.button`
  background: ${th.menuBg};
  height: ${th.mainLineHeight}px;
  color: ${th.buttonTextColor};
  background: ${th.buttonPrimaryBg};
  border: ${th.buttonBorder};
  border-left: solid 4px ${th.navBorderColor};
  font-weight: ${th.menuButtonWeight};
  text-decoration: none;
`

const Button = ({children}: any) => (
  <Box px={1}>
    <StyledButton>{children}</StyledButton>
  </Box>
)

const Group = styled(Flex)`
`
Group.defaultProps = {px: 3}

export default (props: any) => (
  <Background>
    <Flex>
      <Group ml={-1}>
        <Button>Logo</Button>
        <Button>Documentation</Button>
        <Button>Ecosystem</Button>
        <Button>Playground</Button>
      </Group>
      <Group mr={-1} ml='auto'>
        <Button>Github</Button>
        <Button>Blog</Button>
        <Button>Help</Button>
      </Group>
    </Flex>
  </Background>
)