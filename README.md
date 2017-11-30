# README

## What is this?

jQuery is one of the (if not the) most popular JavaScript libraries for frontend development. It abstracts away a lot of the DOM manipulation required to make modern web applications. However, what is the fun of all that abstraction if you can't unabstract it all? That's where jQuery-Lite comes in. It is a stripped-down version of jQuery that I have built using vanilla JS inspired by an App Academy project. If that sounds fun, keep reading.

## Technical Overview

jQuery-Lite is built around a main function, `$l` (taking a cue from jQuery's ever-present dollar sign) which allows users to select elements on the page based on CSS selectors or by feeding HTML elements in directly and creates an array of them. This array is then passed into a custom-made `DOMNodeCollection` class, which is where the bulk of the work happens. The main functions of jQuery-Lite are all methods of `DOMNodeCollection`. It should be noted that each method returns a `DOMNodeCollection` after changes have been made, making every jQuery-Lite method chainable.

## API

jQuery-Lite's API is roughly split into five parts:
  - The Selector (mostly done)
  - Editing
  - Traversal (in development)
  - Event Handling (in development)
  - AJAX (in development)

### The Selector

DOM elements can be selected with the jQuery-Lite Selector `$l()`. It can take arguments in string form or in HTMLElement form, and returns a `DOMNodeCollection` object.
If it receives a string, it will return a `DOMNodeCollection` of every DOM element that matches the CSS selector corresponding to that string. If fed an HTMLElement, it will return a `DOMNodeCollection` containing only that element.

Example:

**HTML on page**
```html
  <body>
    <article class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </article>
    <section class="content">
      <ul>
        <li id="lorem">Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
        <li>sit</li>
        <li>amet</li>
      </ul>
    </section>
  </body>
```

**jQuery-Lite Example**
```javascript
  $l("li")
  // => DOMNodeCollection with all five list items
  $l(".content")
  // => DOMNodeCollection containing the article.content and section.content elements
  $("#lorem")
  // => DOMNodeCollection containing just the first list item

  // assume 'elem' is an HTMLElement object
  $(elem)
  // => DOMNodeCollection containing that single element
```

### Editing
These methods let one edit the HTML inside of selected elements.

#### .html()
`.html()` acts as a getter method, and returns the `innerHTML` of the first element in its selector.


`.html(string)` acts as a setter method, setting the `innerHMTL` of each element of the selection to the inputted string.

Both getter and setter functionalities return the original selection.

```html
  <div>
    <p>I'm a paragraph!</p>
    <p><span>So am I!</span></p>
  </div>
```

```javascript
  $l("div").html()
  // => "I'm a paragraph"
  $l("p:nth-child(2)").html()
  // => <span>So am I!</span>
  $l("div").html("paragraph")
  // turns both p elements into
  // <p>paragraph</p>

```

#### .empty()
`.empty` removes all `innerHTML` from the selected elements, leaving a pair of empty tags. It returns the original selection, albeit without content.

#### .append()
Appends its arguments to its selection as child nodes and returns the original selection.

`.append(DOMNodeCollection)` will add every element in the argument to each element in the selection.

`.append(HTMLElement)` will add the passed-in HTMLElement to each element in the selection.

`.append(string)` will add the passed in string to each element in the selection. If the string is valid HTML, it will show up in the DOM as such.

#### .attr()
Adds attributes onto selected elements and returns the original selection.

`.attr(attribute, value)` will (assuming both arguments are strings) assign the each element in the selection an `attribute` with the given `value`.

`.attr(Object)` will assign many attributes to each element in the selection, with the keys being the attributes names and the values being the values.

#### .addClass()
Adds classes to the selected elements and returns the original selection.

`.addClass(string)` adds the given string onto all of the selected elements' class lists.

`.addClass(array)` adds all of the array's strings onto the selection's class lists.

#### .removeClass()
Removes classes from the selected elements and returns the original selection.

`.removeClass(string)` takes the given string out of all the selected elements' class lists.

`.removeClass(array)` removes all of the array's strings from the selection's class lists.

### Traversal

#### .children()
`.children()` takes no arguments and returns a new DOMNodeCollection of the direct children of each element in the selection.

Example:

**HTML On Page:**

```html
  <body id="test">
    <div id="a">
      <p>Div A</p>
    </div>
    <div id="b">
      <p>Div B</p>
    </div>
    <div id="c">
      <p>Div C</p>
    </div>
  </body>
```

**jQuery-Lite**
```javascript
  $l("#test").children()
  // => DOMNodeCollection containing the three divs with ids #a, #b, and #c

  $l("#c").children()
  // => DOMNodeCollection containing only the paragraph element with 'Div C' written in it
```

#### .parent()
`.parent()` takes no arguments and returns a unique DOMNodeCollection of the parent elements of each selected element.

Example:

Assume the same HTML as `.children()`.

**jQuery-Lite**
```javascript
  $l("p").parent()
  // => DOMNodeCollection with the three divs with ids #a, #b, and #c

  $l("div").parent()
  // => DOMNodeCollection with just the div #test
```
