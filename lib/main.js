import DOMNodeCollection from './dom_node_collection.js';

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch (typeof arg) {
    case 'string':
      const selection = document.querySelectorAll(arg);
      const selectedArr = Array.from(selection);
      return new DOMNodeCollection(selectedArr);
    case 'HTMLElement':
      return new DOMNodeCollection([arg]);
    case 'function':
      if (_docReady) {
        arg();
      } else {
        _docReadyCallbacks.push(arg);
      }
  }
};

window.$l.extend = (target, ...objects) => {
  objects.forEach( (obj) => {
    const keys = Object.keys(obj);
    keys.forEach( (k) => {
      target[k] = obj[k];
    });
  });
  return target;
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( (func) => {
    func();
  });
});
