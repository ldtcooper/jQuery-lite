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
