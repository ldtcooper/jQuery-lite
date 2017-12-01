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
    } else {
      this.htmlArr.forEach( (htmlEl) => {
        Object.keys(arg).forEach( (el) => {
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

export default DOMNodeCollection;
