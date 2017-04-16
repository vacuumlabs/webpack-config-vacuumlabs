export default function babelLoader() {
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
        [
          'transform-runtime',
          {
            helpers: false,
            polyfill: false,
            regenerator: false,
          },
        ],
      ],
      env: {
        development: {
          plugins: [[
            'react-transform', {
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
            },
          ]],
        },
        production: {
          plugins: ['transform-react-constant-elements'],
        },
      },
    },
  }
}
