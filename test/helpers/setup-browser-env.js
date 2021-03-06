'use strict';

const jsdom = require('jsdom');

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

propagateToGlobal(win);

function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

const storage = {};

window.localStorage = window.sessionStorage = {
  getItem(key) {
    return storage[key];
  },

  setItem(key, value) {
    storage[key] = value;
  },

  removeItem(key) {
    if (storage[key]) delete storage[key];
  },

  clear() {
    for (const key in storage) {
      if (storage.hasOwnProperty(key)) {
        delete storage[key];
      }
    }
  },
};
