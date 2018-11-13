
export default function babelLoader(options) {
  return {
    loader: 'babel-loader',
    test: /\.js$/,
    exclude: /node_modules/,
    options: {
      // when turned on, it sometimes leads to strange errors
      cacheDirectory: false,
      presets: [['@babel/env', {modules: false}], '@babel/react'],
      plugins: [
        ['@babel/proposal-decorators', {legacy: true}],
        '@babel/proposal-class-properties',
        ...(options.env === 'development' ? [] : ['@babel/transform-react-constant-elements']),
      ],

    },
  }
}
