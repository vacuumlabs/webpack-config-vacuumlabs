/* eslint-disable no-console */
import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import express from 'express'
import compression from 'compression'
import WebpackDevServer from 'webpack-dev-server'

export default (webpackConfig, options, done) => {
  new WebpackDevServer(webpack(webpackConfig), {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      // It suppress error shown in console, so it has to be set to false.
      quiet: false,
      // It suppress everything except error, so it has to be set to false as well
      // to see success build.
      noInfo: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
  }).listen(options.port, options.host, (err) => {
      if (err) {
          console.log(err) //eslint-disable-line no-console
      }
      console.log(`Webpack server has started on port ${options.port}`) // eslint-disable-line no-console
  })
}

/*
export default (webpackConfig, options, done) => {
  const compiler = webpack(webpackConfig)

  const app = express()

  app.use(compression({threshold: 0}))

  app.use(webpackDev(compiler, {
    headers: {'Access-Control-Allow-Origin': '*'},
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(webpackHot(compiler))

  app.listen(options.port, () => {
    console.log('Hot server started at port %d', options.port)
    done()
  })
}
*/
