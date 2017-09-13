# webpack-config-vacuumlabs

Default Webpack 2 & 3 config we use in Vacuumlabs. All the loaders, transformers, etc.. are peer
dependencies and should be installed top-level. You should invoke:

```
yarn add autoprefixer babel-loader babel-plugin-react-transform babel-plugin-transform-decorators-legacy babel-plugin-transform-react-constant-elements babel-preset-env babel-preset-stage-0 css-loader eslint-loader extract-text-webpack-plugin file-loader postcss-loader react-transform-catch-errors redbox-react sass-loader style-loader url-loader webpack webpack-isomorphic-tools whatwg-fetch --save
```

(or similar stuff with npm).

## Example usage for development

```javascript
import {server, makeConfig} from 'webpack-config-vacuumlabs'
import path from 'path'

const options = {
  useDevServer: true,
  env: 'development',
  host: localhost,
  port: 8888,
  entry: path.join(__dirname, '../../src/client/index.js'),
  buildDir: path.join(__dirname, '../../build'),
}

const webpackConfig = makeConfig(options)

server(webpackConfig, options, () => {
  console.log(`Webpack server has started on port 8888`) // eslint-disable-line no-console
})
```

## Building for production

```javascript
import {makeConfig, build} from 'webpack-config-vacuumlabs'
import path from 'path'

const options = {
  useDevServer: false,
  env: 'production',
  entry: path.join(__dirname, '../src/client/index.js'),
  buildDir: path.join(__dirname, '../build'),
}

const config = makeConfig(options)

build(config, () => {
  console.log('Build has finished.') // eslint-disable-line no-console
})
```
