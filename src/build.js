import log from 'fancy-log'
import PluginError from 'plugin-error'
import webpack from 'webpack'

export default (webpackConfig, done) => {

  webpack(webpackConfig, (fatalError, stats) => {
    const jsonStats = stats.toJson()

    // We can save jsonStats to be analyzed with
    // http://webpack.github.io/analyse or
    // https://github.com/robertknight/webpack-bundle-size-analyzer.
    // import fs from 'fs'
    // fs.writeFileSync('./bundle-stats.json', JSON.stringify(jsonStats))

    const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0]

    if (buildError) {
      throw new PluginError('webpack', buildError)
    }

    log('[webpack]\n', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      children: false,
    }))

    done()
  })
}
