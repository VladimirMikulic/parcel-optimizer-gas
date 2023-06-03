const fs = require('fs');
const assert = require('assert');
const test = require('node:test');
const { execSync } = require('child_process');

test('Building demo project', async () => {
  process.chdir('./test/demo');
  execSync('../../node_modules/.bin/parcel build main.js');
  const bundledJS = fs.readFileSync('./dist/main.js', { encoding: 'utf-8' });

  assert.ok(bundledJS.includes('function customFunction() {}'));
  assert.ok(/function onInstall\(.\) {}/.test(bundledJS))
  assert.ok(/function onOpen\(.\) {}/.test(bundledJS));
});
