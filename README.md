# README

## What is this?

jQuery is one of the (if not the) most popular JavaScript libraries for frontend development. It abstracts away a lot of the DOM manipulation required to make modern web applications. However, what is the fun of all that abstraction if you can't unabstract it all? That's where jQuery-Lite (JQL) comes in. It is a stripped-down version of jQuery that I have built using vanilla JS inspired by an App Academy project. If that sounds fun, keep reading.

## Technical Overview

JQL is built around a main function, `$l` (taking a cue from jQuery's ever-present dollar sign) which allows users to select elements on the page based on CSS selectors or by feeding HTML elements in directly and creates an array of them. This array is then passed into a custom-made `DOMNodeCollection` class, which is where the bulk of the work happens. The main functions of JQL are all methods of `DOMNodeCollection`.
