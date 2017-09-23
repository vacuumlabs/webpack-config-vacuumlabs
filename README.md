# webpack-config-vacuumlabs

Default Webpack 2 & 3 config we use in Vacuumlabs.

Use version ^1 for React ^15. Should also work with React 16, though you won't benefit from newer
React version.

Use version ^2 for React ^16.

All the loaders, transformers, etc.. are peer dependencies and should be installed top-level. Just
invoke [this command](./peerDeps.md). If you think, it's nuisance and the package should install
these for themselves, sadly it's not possible: the dependencies need to be installed top-level which
is only guaranteed by using peer-dependency mechanism.

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

## Hot reload

The config does only bare minimum on top of native webpack HMR, which is pretty awesome by itself.
Only try-catch around render are added and react-redbox is rendered on error.

```
// top level file main.js
// construct `store` here
render(<Root store={store} />, appElement)

// a few modules already required by `main.js` won't be updated
if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default
    // if you want to update store as well, you need to re-require it here
    // OTOH, if you use "Pershing Redux", store is almost never changed, so we just
    // use the old one.
    render(<NewRoot store={store} />, appElement)
  })
}
```
