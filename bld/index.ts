import * as path from 'path'
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

function root(relative) {
  return path.join(__dirname, '..', relative)
}

function dev(relative) {
  return root(path.join('dev', relative))
}

function dist(relative) {
  return root(path.join('dist', relative))
}

export function getWebpackConfig(target: string) {
  switch (target) {
    case 'debugger':
      return getDebuggerConfig()
  }
}

function getDebuggerConfig() {
  return {
    entry: dev('debugger/entry.ts'),
    module: {
      rules: [
        {
          test: (file) => {
            if(/node_modules/.test(file)) return false
            return /\.tsx?$/.test(file)
          },
          loader: 'ts-loader',
          options: {
            configFile: root('tsconfig.web.json')
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
      new TsconfigPathsPlugin()
    ],
    output: {
      filename: 'debugger.bundle.js',
      path: dist('debugger')
    }
  }
}