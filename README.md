# react-announce-collapse

[![Greenkeeper badge](https://badges.greenkeeper.io/tusharmath/react-announce-collapse.svg)](https://greenkeeper.io/)
[![Build Status][travis-svg]][travis-build]
[![npm][npm-version-svg]][npm]
[![Coverage Status][coverage-svg]][coverage]

Dispatches custom event `COLLAPSE` on the component stream.

## Purpose
The decorator auto listens to two events on `window` object via — 'click' and the 'keydown' events. Based on certain conditions *(as described below)* the `COLLAPSE` custom-event is fired on the component stream.

- **CLICKs outside:** `false` is dispatched as an argument with the COLLAPSE event.
- **CLICKs inside:** The current state is `toggled` and then dispatched.

## Example
```javascript
import {Component} from 'React'
import {Subject} from 'rx'
import {asStream} from 'react-announce'
import {collapsable, isActive} from 'react-announce-collapse'

const state = new Subject()


@collapsable
@asStream(state) // observer is required for the decorator to dispatch the COLLAPSE event on it
class Dropdown extends Component {
  render () {
    return (<div>Hello World</div>)
  }
}

// isActive() is a utility method that returns the state (Boolean) as an Observable
isActive(state)
  .subscribe(x => console.log(x))

/* OUTPUT
  false
  true
  false
*/

```




[0]: https://github.com/lodash/lodash/issues/2004#issuecomment-185087141
[travis-svg]: https://travis-ci.org/tusharmath/react-announce-collapse.svg?branch=master
[travis-build]: https://travis-ci.org/tusharmath/react-announce-collapse
[npm-version-svg]: https://img.shields.io/npm/v/react-announce-collapse.svg
[npm]: https://www.npmjs.com/package/react-announce-collapse
[coverage-svg]: https://coveralls.io/repos/github/tusharmath/react-announce-collapse/badge.svg?branch=master
[coverage]: https://coveralls.io/github/tusharmath/react-announce-collapse?branch=master
