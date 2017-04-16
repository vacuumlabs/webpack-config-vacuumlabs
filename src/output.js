export default function(options) {
  return {
    path: options.buildDir,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: options.env === 'development'
      ? `http://${options.host}:${options.port}/`
      : options.publicPath,
  }
}
