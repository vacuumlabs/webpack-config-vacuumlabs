import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import _ from 'lodash'

const _loaders = {
  css: null,
  scss: 'sass-loader',
  sass: 'sass-loader?indentedSyntax',
}
const cssModuleOptions = {
  modules: true,
  camelCase: 'dashes',
  localIdentName: '[path][name]---[local]---[hash:base64:8]',
  importLoaders: 1,
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    //use this option instead default not append to default
    plugins: () => [autoprefixer({browsers: 'last 2 version'})],
  },
}

const cssLoader = (modules) => ({
  loader: 'css-loader',
  options: modules ? cssModuleOptions : {},
})

const use = (modules, ext) => _.compact([cssLoader(modules), postCssLoader, _loaders[ext]])

function rule(transform, ext) {
  return {
    test: new RegExp(`\\.${ext}$`),
    oneOf: [
      {
        resourceQuery: /module/,
        use: transform(use(true, ext)),
      },
      {
        use: transform(use(false, ext)),
      },
    ],
  }
}

export function loaders(options) {
  const transform = options.useDevServer
    ? (l) => ['style-loader', ...l]
    : (l) => [MiniCssExtractPlugin.loader, ...l]

  return _.keys(_loaders).map(_.partial(rule, transform))
}

// Render styles into separate cacheable file to prevent FOUC and
// optimize for critical rendering path.
export function plugins(options) {
  return options.useDevServer
    ? []
    : [new MiniCssExtractPlugin({
      filename: options.useHashedAssetNames ? 'app.[contenthash].css' : 'app.css',
    })]
}
