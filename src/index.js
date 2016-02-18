const Rx = require('rx')
const createDeclarative = require('react-announce').createDeclarative
const targs = require('argtoob')
const getCollapsable = require('./getCollapsable')

const e = module.exports = (ReactDOM, window) => createDeclarative(
    function (stream, dispose, params) {
      dispose(e.collapsable(ReactDOM, window, stream, params))
    }
)

e.collapsable = (ReactDOM, window, stream, params) => {
  const esc = e.getEscKey(window)
  const targets = e.getClickTargets(window)
  const node = e.getDomNode(ReactDOM, stream)
  const component = e.getComponent(stream)
  const state = e.getState(stream)

  return getCollapsable(esc, targets, node, component, state).subscribe(e.dispatch)
}

e.dispatch = x => x.component.dispatch('COLLAPSE', x.state)

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
    .pluck('event', 'keyCode')
    .filter(x => x === 27)

e.getClickTargets = window => Rx
    .Observable
    .fromEvent(window, 'click')
    .pluck('event', 'target')

e.getDomNode = (ReactDOM, stream) => stream
    .filter(x => ['DID_MOUNT', 'DID_UPDATE'].includes(x.event))
    .map(x => ReactDOM.findDOMNode(x))
    .filter()
    .distinctUntilChanged()
