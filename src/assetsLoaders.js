export default [
  {
    test: /\.(gif|jpg|png|svg)(\?.*)?$/,
    use: 'url-loader?limit=10000', // 10kb
  },
  {
    test: /favicon\.ico$/,
    use: 'url-loader?limit=1',
  },
  {
    test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
    use: 'url-loader?limit=100000', // 100kb
  },
]
