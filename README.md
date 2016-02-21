# react-announce-collapse
[![Build Status][travis-svg]][travis-build]
[![npm][npm-version-svg]][npm]
[![Coverage Status][coverage-svg]][coverage]

Dispatches custom event `COLLAPSE` on the component stream.

## Purpose
The decorator auto listens to two events on `window` object via — 'click' and the 'keydown' events. Based on certain conditions *(as described below)* the `COLLAPSE` custom-event is fired on the component stream.

- **CLICKs outside:** `false` is dispatched as an argument with the COLLAPSE event.
- **CLICKs inside:** The current state is `toggled` and then dispatched.
- **CLICKs inside of skipped:** By default the state is always toggled when the clicks happen anywhere inside the component, but sometimes it is necessary to not close the dropdown automatically eg. — Calendar Widget Dropdowns. In this case no value is dispatched.

## Example
```javascript
import {Component} from 'React'
import {Subject} from 'rx'
import {asStream} from 'react-announce'
import {collapsable} from 'react-announce-collapse'

const state = new Subject()
@asStream(state)
@collapsable
class Dropdown extends Component {
  render () {
    return (<div>Hello World</div>)
  }
}

state
  .filter(x => x.event === 'COLLAPSE')
  .map(x => x.args[0])
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
