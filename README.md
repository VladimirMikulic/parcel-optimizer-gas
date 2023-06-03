# parcel-optimizer-gas

![Version](https://img.shields.io/npm/v/parcel-optimizer-gas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![CI](https://github.com/VladimirMikulic/parcel-optimizer-gas/actions/workflows/ci.yml/badge.svg)](https://github.com/VladimirMikulic/parcel-optimizer-gas/actions)
[![Twitter: VladoDev](https://img.shields.io/twitter/follow/VladoDev.svg?style=social)](https://twitter.com/VladoDev)

> 🌀 Parcel plugin that enables Google App Script bundling.

_This is the plugin for Parcel v2. The plugin for the first version can be found [here](https://github.com/VladimirMikulic/parcel-plugin-gas)._

## :package: Installation

```shell
# Installs the plugin and saves it as a development dependency
npm i parcel-optimizer-gas -D
```

## 🔌 Configuration

We need to create `.parcelrc` configuration file and add the plugin to optimizers like this:

> Syntax "..." instructs Parcel to apply the plugin on top of existing JS optimizations

```js
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.js": ["...", "parcel-optimizer-gas"]
  }
}
```

## :cloud: Usage

This plugin modifies the Parcel bundle to be Google App Script compatible.
Parcel uses process called uglifying when generating your production build.
Uglifying is the process of converting long function/variable names into shorter versions
i.e. `onInstall` becomes `j`. This is a problem since Google's runtime expects explicit
`onInstall` method to be available in global scope. This applies to other methods as well.
That's why default Parcel bundle doesn't work on Google's runtime environment.

By attaching methods to the
[`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
in source code, you prevent uglifying and with a bit of the plugin's magic your
code works on Google's runtime environment.

### 🏠 Single file

**index.js**

```js
// Runs when user installs extension
globalThis.onInstall = e => {
  onOpen();
};

// Runs as soon as user opens a document
globalThis.onOpen = e => {
  DocumentApp.getUi() // Or SlidesApp or FormApp.
    .createMenu('My Add-on')
    .addItem('Open', 'showSidebar')
    .addToUi();
};
```

### 💫 Multiple files

Google App Script runtime environment differs from normal JS environment that you are
used to in your Browser or Node.js. There are simply no modules. Everything is loaded in one
global scope/namespace.

**index.js**

```js
require('./my-module');

// Runs when user installs extension
globalThis.onInstall = e => {
  customFunction();
};
```

**my-module.js**

```js
globalThis.customFunction = () => {
  console.log('Hello from Google App Script!');
};
```

### 🚀 Build

`parcel build index.js` -> produces bundle which you can manually upload to your Google App Script project or push it from CLI with [clasp](https://developers.google.com/apps-script/guides/clasp).

<!--## :sparkles: Run tests

The plugin uses [Jest](https://jestjs.io/) for running tests.

Jest will execute all `.test.js` files in the `test` folder.

```sh
npm test
```-->

## :man: Author

**Vladimir Mikulic**

- Twitter: [@VladoDev](https://twitter.com/VladoDev)
- Github: [@VladimirMikulic](https://github.com/VladimirMikulic)
- LinkedIn: [@vladimirmikulic](https://www.linkedin.com/in/vladimir-mikulic/)

## :handshake: Contributing

Contributions, issues and feature requests are welcome!

## :pencil: License

This project is licensed under [MIT](https://opensource.org/licenses/MIT) license.

## :man_astronaut: Show your support

Give a ⭐️ if this project helped you!
