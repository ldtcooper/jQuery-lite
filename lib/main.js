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

window.$l.ajax = (options) => {
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const verb = options.verb ? options.verb : 'GET';
    const data = options.data ? options.data : null;
    const url = options.url;
    xhr.open(verb, url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => resolve(xhr.statusText);
    xhr.send(data);
  });

  // xhr.onload = () => {
  //   console.log(xhr);
  // };

  // xhr.open(options.verb, options.url);
  // xhr.send(data);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( (func) => {
    func();
  });
});
