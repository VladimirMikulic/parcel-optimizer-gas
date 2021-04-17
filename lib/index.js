const { Optimizer } = require('@parcel/plugin');
const generateEntryFunctions = require('gas-entry-generator').generate;

module.exports = new Optimizer({
  async optimize({ contents, map }) {
    const bundleForEntryGen = contents.replace(/globalThis\./g, 'global.');
    const entryPointFunctions = generateEntryFunctions(bundleForEntryGen)
      .entryPointFunctions.split('\n')
      .join('');

    const newContents = `${entryPointFunctions}${contents}`;
    return { contents: newContents, map };
  }
});
