import * as React from 'react'
import {Flex, Box} from 'grid-styled'

export const Row = (props: any) => (
  <Flex
    {...props}
    mx={-2}
  />
)

export const Col = (props: any) => (
  <Box
    {...props}
    px={2}
    flex='1 1 auto'
  />
)