/* eslint-disable no-console */

import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import express from 'express'
import compression from 'compression'

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
