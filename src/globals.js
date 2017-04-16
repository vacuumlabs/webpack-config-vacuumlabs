import webpack from 'webpack'

export default function(options) {
  return [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(options.env),
    },
  })]
}
