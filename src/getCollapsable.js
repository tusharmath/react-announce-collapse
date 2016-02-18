const Rx = require('rx')
const targs = require('argtoob')

module.exports = (esc, target, node, state, hasParent, skip) => Rx
    .Observable
    .merge(
      esc.map(false),
      target
        .combineLatest(node, targs('target', 'node'))
        .filter(x => hasParent(x.target, x.node))
        .withLatestFrom(state, (a, b) => b)
        .map(x => !Boolean(x))
        .distinctUntilChanged()
)
