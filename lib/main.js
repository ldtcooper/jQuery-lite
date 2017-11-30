import DOMNodeCollection from './dom_node_collection.js';

window.$l = (arg) => {
  if (typeof arg === 'string') {
    const selection = document.querySelectorAll(arg);
    const selectedArr = Array.from(selection);
    return DOMNodeCollection(selectedArr);
  } else if (arg instanceof HTMLElement) {
    return DOMNodeCollection([arg]);
  }
};
