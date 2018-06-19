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
        ie8: true,
        safari10: true,
      },
      cache: true,
      parallel: true,
    })]
}

_.reduce(props, (res,key, value) => ({...res, key: value(props)}, {}))