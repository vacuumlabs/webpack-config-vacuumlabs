import webpack from 'webpack'

export function entry(options) {
  return options.useDevServer
    ? [
      `webpack-dev-server/client?http://${options.host}:${options.port}`,
      'webpack/hot/only-dev-server']
    : []
}

export function loaders(options) {
  return options.useDevServer
    ? [{
      loader: 'eslint-loader',
      exclude: /node_modules/,
      test: /\.js/,
      options: {
        emitWarning: true
      },
    }] : []
}

export function plugins(options) {
  return options.useDevServer
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ] : []
}
