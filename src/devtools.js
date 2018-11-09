import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

export function entry(options) {
  return options.useDevServer
    ? ['webpack-hot-middleware/client']
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
      // so module names are named properly and are not just numbers in the console
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
    : [new ProgressBarPlugin()]
}
