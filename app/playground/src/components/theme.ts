import { lighten, darken } from 'polished'

export const colors = {
  dark: '#25292F',
  blue: '#4da4b7',
  red: '#c45545',
  green: '#6ac38a',
  light: '#ebedf2'
}

export const th = {
  padding: (props:any) => '10px',
  background: (props:any) => colors.dark,
  buttonPrimaryBg: (props:any) => colors.dark,
  buttonTextColor: (props:any) => lighten(0.3, colors.dark),
  navBorderColor:  (props:any) => colors.blue,
  buttonBorder: (props:any) => 'none',
  buttonPadding: (props:any) => '10px 20px',
  menuButtonWeight: (props:any) => 'bold',
  menuBg: (props:any) => darken(0.05, colors.dark),
  keywords: (props:any) => colors.blue,
  warn: (props:any) => colors.red,
  good: (props:any) => colors.green,
  foreground: (props:any) => colors.light,
  color: (props:any) => (name:string)  => colors[name],
  // space: (props:any) => [ 0, 6, 12, 18, 24 ],
  // sp: (props:any) => (i:number) => th.space(props)[i],
  // breakpoints: (props:any) => [ '32em', '48em', '64em' ],
  font: (props:any) => 'Monaco',
  mainLineHeight: (props:any) => 24,
  thinBorder: (props:any) => `solid 1px ${lighten(0.25, colors.dark)}`,
  paneBackground: (props:any) => props.light ? lighten(0.025, colors.dark) : darken(0.025, colors.dark),
  menuBottomBorder: (props:any) => `solid 1px ${darken(0.1, colors.dark)}`
}

function build(): object {
  const o = {}
  for (let [key, value] of Object.entries(th)) {
    o[key] = value({})
  }
  return o
}

export default build()