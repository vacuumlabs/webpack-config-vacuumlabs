import webpack from 'webpack'

export default function(options) {
  return options.env === 'development'
    ? []
    : [new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false, // Because uglify reports irrelevant warnings.
      },
    })]
}
