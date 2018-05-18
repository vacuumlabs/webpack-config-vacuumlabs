/*import Plugin from 'webpack-isomorphic-tools/plugin'

export default {
  assets: {
    images: {
      extensions: ['gif', 'jpg', 'png', 'ico'],
      parser: Plugin.url_loader_parser,
    },
    fonts: {
      extensions: ['eot', 'ttf', 'woff', 'woff2'],
      parser: Plugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: Plugin.url_loader_parser,
    },
    styles: {
      extensions: ['css', 'less', 'sass', 'scss', 'styl'],
      filter(module, regex, options, log) {
        return options.development
          ? Plugin.style_loader_filter(module, regex, options, log)
          : regex.test(module.name)
      },
      path(module, options, log) {
        return options.development
          ? Plugin.style_loader_path_extractor(module, options, log)
          : module.name
      },
      parser(module, options, log) {
        return options.development
          ? Plugin.css_modules_loader_parser(module, options, log)
          : module.source
      },
    },
  },
}
*/
