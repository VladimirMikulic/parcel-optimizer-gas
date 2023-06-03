require('./module');

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
