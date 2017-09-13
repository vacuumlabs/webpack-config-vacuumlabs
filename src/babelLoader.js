const reportErrorPlugins =[['react-transform', {
  transforms: [{
    transform: 'react-transform-catch-errors',
    imports: ['react', 'redbox-react'],
  }],
}]]

export default function babelLoader(options) {
  return {
    loader: 'babel-loader',
    test: /\.js$/,
    exclude: /node_modules/,
    options: {
      // when turned on, it sometimes leads to strange errors
      cacheDirectory: false,
      presets: [['env', {modules: false}], 'react', 'stage-0'],
      plugins: [
        'transform-decorators-legacy',
        ...(options.useDevServer ? reportErrorPlugins : []),
        ...(options.env === 'development' ? [] : ['transform-react-constant-elements']),
      ],

    },
  }
}
