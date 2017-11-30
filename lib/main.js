import DOMNodeCollection from './dom_node_collection.js';

window.$l = (arg) => {
  if (typeof arg === 'string') {
    const selection = document.querySelectorAll(arg);
    return Array.from(selection);
  }
};
