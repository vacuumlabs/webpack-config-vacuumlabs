const hmrPlugins =[['react-transform', {
  transforms: [{
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  }, {
    transform: 'react-transform-catch-errors',
    imports: ['react', 'redbox-react'],
  }],
  superClasses: [
    'React.Component',
    'Component',
    'PureComponent',
  ],
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
        ...(options.useDevServer ? hmrPlugins : []),
        ...(options.env === 'development' ? [] : ['transform-react-constant-elements']),
      ],

    },
  }
}
