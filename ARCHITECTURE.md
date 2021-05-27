# Architecture

This guide explains the concepts behind the parcel-plugin-gas.

## Part 1

As already written in README "Usage" section, to prevent uglifying it is
mandatory for a method to be attached to some entity (`globalThis`). The entity
is just a sintatical sugar, thus it can be any arbitrary value (except `global`
since it creates an issue with Parcel)!

We use `globalThis` to reference the global object and attach methods to it.

In the browser it's `window` object, in Node.js it's `global` object and in Google App Script environment
it is simply an object! The common misconception is that Google App Script is powered by Node.js,
but that is not true. Both of them use Google's V8 as a JS engine but their runtime environments are different.

## Part 2

Next, we need to generate function declarations at the top of the bundle. If you
open the generated bundle you'll notice this pattern:
`function onInstall(e) {}function onOpen(e) {} ...` at the top of the bundle.

Why is this necessary? Haven't we already made methods global with `globalThis`?

Yes and no. As mentioned in the README "Usage" section, Google's App Script runtime
expects explicit `onInstall` method. (not `globaThis.onInstall`)

Although calling `onInstall()` would be perfectly fine, I suspect
Google doesn't blindly execute your JS. Instead, Google probably uses something like [esprima](https://www.npmjs.com/package/esprima)
to get the names of standalone global functions.
Standalone means that functions are not explicitly attached to an object. (`globaThis.onInstall`)

That's why we generate the function declarations at the top of the bundle.

If you are not familiar with how JS works, you might be thinking
"Hey!? Those function declarations bodies are empty. When Google's runtime executes them
nothing will happen!?"

That's not the case. Since those function declerations are in global scope, they are being overwritten by _real_ functions with bodies (hence `globalThis`). `onInstall() {} -> onInstall(e) { // code }`
