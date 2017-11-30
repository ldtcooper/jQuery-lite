class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }

  html(arg) {
    if (arg === undefined) {
      return this.htmlArr[0].innerHTML;
    } else {
      this.htmlArr.forEach( (el) => {
        el.innerHTML = arg;
      });
    }
  }

  empty() {
    this.html("");
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
  }
}

export default DOMNodeCollection;
