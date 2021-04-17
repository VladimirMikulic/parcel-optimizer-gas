# parcel-optimizer-gas

![Version](https://img.shields.io/npm/v/parcel-optimizer-gas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: VladoDev](https://img.shields.io/twitter/follow/VladoDev.svg?style=social)](https://twitter.com/VladoDev)

> 🌀 Parcel plugin that enables Google App Script bundling.

## :package: Installation

```shell
# Installs the plugin and saves it as a development dependency
npm i parcel-optimizer-gas -D
```

## 🔌 Configuration

We need to create `.parcelrc` configuration file and add the plugin to reporters like this:

```js
{
  "extends": "@parcel/config-default",
  "reporters": ["...", "parcel-reporter-gas-imports"]
}
```

## :cloud: Usage

This plugin modifies the Parcel bundle to be Google App Script compatible.
Parcel uses process called uglifying when generating your production build.
Uglifying is the process of converting long function/variable names into shorter versions
i.e. `onInstall` becomes `j`. This is a problem since Google's runtime expects explicit
`onInstall` method to be available in global scope. This applies to other methods as well.
That's why default Parcel bundle doesn't work on Google's runtime environment.

By attaching methods to the `global` entity in source code, you prevent
uglifying and with a bit of the plugin's magic your code works on Google's
runtime environment.

### 🏠 Single file

**index.js**

```js
// Runs when user installs extension
global.onInstall = e => {
  onOpen();
};

// Runs as soon as user opens a document
global.onOpen = e => {
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
global.onInstall = e => {
  customFunction();
};
```

**my-module.js**

```js
global.customFunction = () => {
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
