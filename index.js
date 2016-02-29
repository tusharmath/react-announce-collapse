const ReactDOM = require('react-dom')
const e = require('./src/collapsable')

exports.collapsable = e(e, ReactDOM, window)
exports.isActive = src => src
  .filter(x => x.event === 'COLLAPSE')
  .map(x => x.args[0])
  .distinctUntilChanged()
