import * as styles from './styles'
import assetsLoaders from './assetsLoaders'
import babelLoader from './babelLoader'
import polyfills from './polyfills'
import * as devtools from './devtools'
import globals from './globals'
import optimize from './optimize'
import output from './output'

export default function makeConfig(options) {
  return {
    // the cache seems to be in-memory only: https://webpack.github.io/docs/configuration.html#cache
    cache: options.useDevServer,

    // cheap-module-eval-source-map, because we want original source, but we don't
    // care about columns, which makes this devtool faster than eval-source-map.
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: options.env === 'development' ? 'cheap-module-eval-source-map' : '',
    mode: options.env === 'development' ? 'development' : 'production',
    entry: {
      app: [
        ...polyfills,
        ...devtools.entry(options),
        options.entry,
      ],
    },
    module: {
      rules: [
        ...assetsLoaders,
        babelLoader(options),
        ...devtools.loaders(options),
        ...styles.loaders(options),
      ],
    },
    output: output(options),
    optimization: {
      minimize: true,
      minimizer: [
        ...optimize(options),
      ],
    },
    plugins: [
      ...globals(options),
      ...devtools.plugins(options),
      ...styles.plugins(options),
    ],
    performance: {
      hints: false,
    },
  }
}
