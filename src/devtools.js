import webpack from 'webpack'

export function entry(options) {
  return options.env === 'development'
    ? [`webpack-hot-middleware/client?path=http://${options.host}:${options.port}/__webpack_hmr`]
    : []
}

export function loaders(options) {
  return options.env === 'development'
    ? [{
      loader: 'eslint-loader',
      exclude: /node_modules/,
      test: /\.js/,
    }] : []
}

export function plugins(options) {
  return options.env === 'development'
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ] : []
}
