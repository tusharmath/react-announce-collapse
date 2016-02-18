const Rx = require('rx')
const targs = require('argtoob')
const hasParent = require('./hasParent')

module.exports = (esc, targets, node, component, state, skip) => Rx
    .Observable
    .merge(
      esc.map(false),
      targets
        .combineLatest(node, targs('target', 'node'))
        .skipWhile(x => hasParent(x.target, x.node))
        .withLatestFrom(state, (a, b) => b)
        .map(x => skip ? x : !Boolean(x))
        .distinctUntilChanged()
        .withLatestFrom(component, targs('state', 'component'))
)
