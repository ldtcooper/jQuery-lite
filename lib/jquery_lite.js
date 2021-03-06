/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(1);


const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch (typeof arg) {
    case 'string':
      const selection = document.querySelectorAll(arg);
      const selectedArr = Array.from(selection);
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](selectedArr);
    case 'HTMLElement':
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */]([arg]);
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }

  // editing

  html(arg) {
    if (arg === undefined) {
      return this.htmlArr[0].innerHTML;
    } else {
      this.htmlArr.forEach( (el) => {
        el.innerHTML = arg;
      });
    }
    return this;
  }

  empty() {
    this.html("");
    return this;
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      arg.htmlArr.forEach( (argEl) => {
        this.htmlArr.forEach( (ownEl) => {
          ownEl.innerHTML += argEl.outerHTML;
        });
      });
    } else if (arg instanceof HTMLElement) {
      this.htmlArr.forEach( (el) => {
        el.innerHTML += arg.outerHTML;
      });
    } else {
      this.htmlArr.forEach( (el) => {
        el.innerHTML += arg;
      });
    }
    return this;
  }

  attr(arg, value) {
    if (typeof arg === 'string') {
      this.htmlArr.forEach( (el) => {
        el.setAttribute(arg, value);
      });
    } else {
      this.htmlArr.forEach( (htmlEl) => {
        Object.keys(arg).forEach( (el) => {
          htmlEl.setAttribute(el, arg[el]);
        });
      });
    }
    return this;
  }

  removeAttr(arg) {
    if (typeof arg === 'string') {
      this.htmlArr.forEach( (el) => {
        el.removeAttribute(arg);
      });
    } else if (Array.isArray(arg)) {
      this.htmlArr.forEach( (htmlEl) => {
        arg.forEach( (el) => {
          htmlEl.removeAttribute(el);
        });
      });
    }
    return this;
  }

  addClass(arg) {
    if (Array.isArray(arg)) {
      this.htmlArr.forEach( (el) => {
        el.classList.add(...arg);
      });
    } else {
      this.htmlArr.forEach( (el) => {
        el.classList.add(arg);
      });
    }
    return this;
  }

  removeClass(arg) {
    if (Array.isArray(arg)) {
      this.htmlArr.forEach( (el) => {
        el.classList.remove(...arg);
      });
    } else {
      this.htmlArr.forEach( (el) => {
        el.classList.remove(arg);
      });
    }
    return this;
  }

  css(property, value) {
    if (typeof property === 'string') {
      this.htmlArr.forEach( (el) => {
        el.style[property] = value;
      });
    } else if (typeof property === 'object') {
      this.htmlArr.forEach( (el) => {
        Object.keys(property).forEach( (style) => {
          el.style[style] = property[style];
        });
      });
    }
    return this;
  }

  // traversal

  children() {
    let allChildren = [];
    this.htmlArr.forEach( (el) => {
      const childList = Array.from(el.children);
      allChildren = allChildren.concat(childList);
    });
    return new DOMNodeCollection(allChildren);
  }

  parents() {
    let allParents = [];
    this.htmlArr.forEach( (el) => {
      allParents.push(el.parentNode);
    });
    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let descNodes = [];
    this.htmlArr.forEach( (el) => {
      descNodes = descNodes.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(descNodes);
  }

  remove() {
    while (this.htmlArr.length > 0) {
      const currentNode = this.htmlArr.pop();
      currentNode.remove();
    }
  }

  // events

  on(eventType, callback) {
    this.htmlArr.forEach( (el) => {
      el.addEventListener(eventType, callback);
      const eventName = `event-${eventType}-${callback.name}`;
      el[eventName] = callback;
    });
    return this;
  }

  off(eventType, callback) {
    // if no callback is given, all of that event type are removed
    let validEvents;
    if (eventType === undefined && callback === undefined) {
      this.htmlArr.forEach( (el) => {
        validEvents = Object.keys(el).filter( (k) => {
          return k.match(`event-`);
        });
        validEvents.forEach( (func) => {
          const pulledType = func.split("-")[1];
          el.removeEventListener(pulledType, el[func]);
        });
      });
    } else if (callback === undefined) {
      this.htmlArr.forEach( (el) => {
        validEvents = Object.keys(el).filter( (k) => {
          return k.match(`event-${eventType}`);
        });
        validEvents.forEach( (func) => {
          el.removeEventListener(eventType, el[func]);
          delete el[func];
        });
      });
    } else {
      this.htmlArr.forEach( (el) => {
        el.removeEventListener(eventType, callback);
        delete el[`event-${eventType}-${callback.name}`];
      });
    }
    return this;
  }

  // utils

  length() {
    return(this.htmlArr.length);
  }

  each(callback) {
    this.htmlArr.forEach(function(ind, el) {
      callback(ind, el);
    });
    return new DOMNodeCollection(this.htmlArr);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);