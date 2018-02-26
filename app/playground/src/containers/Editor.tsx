import * as React from 'react'
import * as monaco from '@timkendrick/monaco-editor'
const MonacoEditor = require('react-monaco-editor').default
type sourceFunc = (source: string) => void
import {colors} from '../components/theme'
import { lighten, darken } from 'polished'


/*
$background: #25292f;
$keywords: #025cbc;
$warn: #c45545;
$good: #6ac38a;
$foreground: #eff1f6;
*/

monaco.editor.defineTheme('jtheta', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  //https://coolors.co/121e21-4c5b5c-8aa29e-9cbfbc-dbadb1
  colors: {
    'editor.foreground': colors.light,
    'editor.background': colors.dark,
    'editorCursor.foreground': colors.light,
    'editor.lineHighlightBackground': colors.dark,
    'editorLineNumber.foreground': colors.light,
    'editor.selectionBackground': colors.blue,
    'editor.inactiveSelectionBackground': colors.dark,
    'scrollbarSlider.background': colors.dark
}
})

export default class Editor extends React.Component {
  constructor(props: object) {
    super(props)
    this.state = {
      hidden: true,
      height: 1000,
      width: 1000,
      source: this.getInitialSource()
    }
  }

  public props: {onChange?: sourceFunc, onRun?: sourceFunc}
  public state: {height: number, width: number, hidden: boolean, source: string}
  public editor: monaco.editor.IStandaloneCodeEditor
  public editorContainer: any

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
    this.updateDimensions()
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }
  render() {
    return <MonacoEditor
      monaco={monaco}
      value={this.state.source}
      width={'100%'}
      height={'100%'}
      onChange={(source: any)=> this.handleSourceChanged(source)}
      editorDidMount={this.handleEditorDidMount.bind(this)}
      ref={(editorContainer: any) => this.editorContainer = editorContainer}
      options={{
        theme: 'jtheta',
        minimap: {
          enabled: false
        }
      }}
    />
  }
  getInitialSource() {
    const stored = localStorage.getItem('jtheta.editor.source')
    if (stored) return stored
    return formatSrc(`
      const a = mat('1 1 1') // =>
      const b = mat('1 1 1') // =>
      const c = a.add(b).pow(2)
      const y = linspace(0, 10, b.size)
      disp(y)
    `)
  }
  handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    this.editor = editor
    this.updateDimensions()
    editor.focus()
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if(this.props.onRun) this.props.onRun(this.state.source)
    }, '')
  }
  handleSourceChanged(source: string) {
    this.setState({source})
    localStorage.setItem('jtheta.editor.source', source)
    if (this.props.onChange) this.props.onChange(source)
  }
  updateDimensions() {
    // let container = this.editorContainer
    // let wrapper = container && container.containerElement
    // let width = 200
    // let height = window.innerHeight - 80 // padding and margin in css
    // if (wrapper) {
    //   height = wrapper.clientHeight
    //   width = wrapper.clientWidth
    // }
    // this.setState({width, height, hidden: false})
    // if (this.editor) this.editor.layout({width, height})
  }
}

function formatSrc(src: string) {
  const lines = src.split('\n')
  let output: Array<any> = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    output.push(line.trim())
  }
  return output.join('\n')
}