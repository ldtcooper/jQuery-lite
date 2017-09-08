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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if (typeof selector === "string") {
    let selectedEls = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(selectedEls));
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
  }

  html(string) {
    if (string === undefined) {
      return this.htmlEls[0].innerHTML;
    } else {
      this.htmlEls.forEach( (el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(addition) {
    // let addtionHtml =
    if (typeof addition === "string" || addition instanceof HTMLElement) {
      this.appendSingle(addition);
    } else {
      addition.forEach((el) => {
        this.appendSingle(el);
      });
    }
  }

  appendSingle(newElement) {
    this.htmlEls.forEach((el) => {
      if (typeof newElement === "string") {
        el.innerHTML += newElement;

      } else {
        el.innerHTML += newElement.outerHTML;
      }
    });
  }

  addClass(cls) {
    this.htmlEls.forEach( (el) => {
      el.classList.add(cls);
    });
  }

  removeClass(cls) {
    this.htmlEls.forEach( (el) => {
      el.classList.remove(cls);
    });
  }

  children() {
    let childrenCollection = [];
    this.htmlEls.forEach((el) => {
      childrenCollection = childrenCollection.concat(el.children);
    });
    const domChildren = new DOMNodeCollection(childrenCollection);
    return domChildren;
  }

  parent() {
    let parentCollection = [];
    this.htmlEls.forEach( (el) => {
      parentCollection.push(el);
    });
    const domParent = new DOMNodeCollection(parentCollection);
    return domParent;
  }

  find(selector) {
    const matchedDescendents = [];
    this.htmlEls.forEach( (el) => {
      matchedDescendents.concat(el.querySelectorAll(selector));
    });
    const domDescendents = new DOMNodeCollection(matchedDescendents);
    return domDescendents;
  }

  remove() {
    this.htmlEls.forEach( (el) =>{
      el.remove();
    });
    this.htmlEls = [];
  }

  on(type, listener) {
    this.htmlEls.forEach( function(el) {
      let listenName = `jqlite-${type}`;
      if (!el[listenName]) {
        el[listenName] = [];
      }
      el[listenName].push(listener);
      el.addEventListener(type, listener);
    });
  }

  off(type, listener){
    this.htmlEls.forEach( function(el) {
      let listenName = `jqlite-${type}`;
      if (!listener) {
        el.removeEventListener(type);
        el[listenName] = undefined;
      } else {
        el.removeEventListener(type, listener);
        let listenerIdx = el[listenName].indexOf(listener);
        el[listenName].splice(listenerIdx, 1);
      }
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);