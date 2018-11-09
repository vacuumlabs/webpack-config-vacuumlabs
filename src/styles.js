import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import _ from 'lodash'

const _loaders = {
  css: null,
  scss: 'sass-loader',
  sass: 'sass-loader?indentedSyntax',
}
const cssModulesConfig = '?modules&camelCase=dashes&localIdentName=[path][name]---[local]---[hash:base64:8]'

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer({browsers: 'last 2 version'})],
  },
}

const cssLoader = (modules) => `css-loader${modules ? cssModulesConfig : ''}`
const use = (modules, ext) => _.compact([cssLoader(modules), postcssLoader, _loaders[ext]])

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
    : (l) => ExtractTextPlugin.extract({fallback: 'style-loader', use: l})

  return _.keys(_loaders).map(_.partial(rule, transform))
}

// Render styles into separate cacheable file to prevent FOUC and
// optimize for critical rendering path.
export function plugins(options) {
  return options.useDevServer
    ? []
    : [new ExtractTextPlugin({
      filename: options.useHashedAssetNames ? 'app.[contenthash].css' : 'app.css',
      allChunks: true})]
}
