const ReactDOM = require('react-dom')
const e = require('./src/collapsable')
const createDeclarative = require('react-announce').createDeclarative

exports.collapsable = createDeclarative(
  function (stream, dispose, params) {
    dispose(e(e, ReactDOM, window, stream, params))
  }
)
