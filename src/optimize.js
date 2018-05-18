import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default function(options) {
  return options.env === 'development'
    ? []
    : [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false, // Because uglify reports irrelevant warnings.
        },
        sourceMap: false,
      },
      cache: true,
      parallel: true,
    })]
}
