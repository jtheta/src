import * as React from 'react';
import Chrome from './components/Chrome'
import Menu from './components/Menu'
import Playground from './containers/Playground'

export default class App extends React.Component {
  render() {
    return (
      <Chrome>
        <Menu />
        <Playground />
      </Chrome>
    )
  }
}