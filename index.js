const ReactDOM = require('react-dom')
const e = require('./src/index')
const createDeclarative = require('react-announce').createDeclarative

exports.collapsable = createDeclarative(
  function (stream, dispose, params) {
    dispose(e(e, ReactDOM, window, stream, params))
  }
)
