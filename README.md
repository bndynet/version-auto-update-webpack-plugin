# version-auto-update-webpack-plugin

A webpack plugin to update version in package.json automatically.

## Installation

```bash
npm i @bndynet/version-auto-update-webpack-plugin --save-dev
```

## Usage

```javascript
const VersionAutoUpdateWebpackPlugin = require('@bndynet/version-auto-update-webpack-plugin');

// webpack config
{
  plugins: [
    new VersionAutoUpdateWebpackPlugin()
  ]
}
```

**Example**:

```javascript
const VersionAutoUpdateWebpackPlugin = require('@bndynet/version-auto-update-webpack-plugin');

new HeaderInjectionWebpackPlugin({
    versionType: 'major|minor|patch',   // or specified by argument like `webpack --vau.versionType minor` in your package.json
})
```