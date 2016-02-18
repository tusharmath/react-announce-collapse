const Rx = require('rx')
const createDeclarative = require('react-announce').createDeclarative
const targs = require('argtoob')

const e = module.exports = (ReactDOM, window) => createDeclarative(
    function (stream, dispose, params) {
      dispose(e.collapsable(ReactDOM, window, stream, params))
    }
)

e.collapsable = (ReactDOM, window, stream, params) => {
  const esc = getEscKey(window)
  const targets = getClickTargets(window)
  const node = getDomNode(ReactDOM, stream)
  const component = getComponent(stream)
  const state = getState(stream)

  return getCollapsable(esc, targets, node, component, state)
}

e.getCollapsable = (esc, targets, node, component, state) => Rx
    .Observable
    .merge(
      esc.map(false),
      targets
        .combineLatest(node, targs('target', 'node'))
        .skipWhile(x => hasParent(x.target, x.node))
        .withLatestFrom(state, (a, b) => b)
        .map(x => params.skip ? x : !!!x)
        .distinctUntilChanged()
        .withLatestFrom(component, targs('state', 'component'))
        .subscribe(x => x.component.dispatch('COLLAPSE', x.state))
)

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

e.hasParent = (node, parent) => {
  while (node) {
    if (parents === node) {
      return true
    }
    node = node.parentElement
  }
  return false
}
