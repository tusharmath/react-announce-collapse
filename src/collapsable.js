const Rx = require('rx')
const createDeclarative = require('react-announce').createDeclarative

const e = module.exports = (d, ReactDOM, window) => createDeclarative(
    function (stream, dispose, params) {
      dispose(d.collapsable(d, ReactDOM, window, stream, params))
    }
)

e.init = (d, ReactDOM, window, stream, params) => {
  const s = d.getSourceStreams(ReactDOM, window, stream)
  const currState = d.getCollapsable(s, d.hasParent, params.skip)
  return d.dispatch(currState, s.component)
}

e.getCollapsable = require('./getCollapsable')
e.hasParent = require('./hasParent')
e.dispatch = require('./dispatch')

e.getSourceStreams = (ReactDOM, window, stream) => ({
    esc: e.getEscKey(window),
    target: e.getClickTargets(window),
    node: e.getDomNode(ReactDOM, stream),
    component: e.getComponent(stream),
    state: e.getState(stream)
})

e.getState = stream => stream
    .filter(x => x.event === 'COLLAPSE')
    .map(x => x.args[0])
    .distinctUntilChanged()

e.getComponent = stream => stream
    .pluck('component')
    .first()

e.getEscKey = window => Rx
    .Observable
    .fromEvent(window, 'keydown')
    .pluck('keyCode')
    .filter(x => x === 27)

e.getClickTargets = window => Rx
    .Observable
    .fromEvent(window, 'click')
    .pluck('target')

e.getDomNode = (ReactDOM, stream) => stream
    .filter(x => ['DID_MOUNT', 'DID_UPDATE'].indexOf(x.event) > -1)
    .map(x => ReactDOM.findDOMNode(x.component))
    .distinctUntilChanged()
