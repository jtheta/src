import * as React from 'react'
import './App.css'

import { mat } from '@jtheta/mat'

class App extends React.Component {
  render() {
    const a = mat('1 2 3 4 5')
    const b = mat('0 0 0 0 0')
    const dist = a.sub(b).norm()

    return (
      <div className="App">
        <Mat m={dist} />
      </div>
    )
  }
}

class Mat extends React.Component {
  public props: {m: any}
  render() {
    const m = this.props.m
    return <div>
      <pre>{m.inspect()}</pre>
    </div>
  }
}

export default App
