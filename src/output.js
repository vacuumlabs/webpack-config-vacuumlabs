export default function(options) {
  return {
    path: options.buildDir,
    filename: options.useHashedAssetNames ? '[name].[hash].js' : '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: options.env === 'development'
      ? `http://${options.host}:${options.port}/`
      : options.publicPath,
  }
}
