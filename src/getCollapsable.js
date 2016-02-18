const Rx = require('rx')
const targs = require('argtoob')

module.exports = (d, hasParent, skip) => Rx
    .Observable
    .merge(
      d.esc.map(false),
      d.target
        .combineLatest(d.node, targs('target', 'node'))
        .filter(x => !hasParent(x.target, x.node))
        .map(false),
      d.target
        .combineLatest(d.node, targs('target', 'node'))
        .filter(x => hasParent(x.target, x.node))
        .withLatestFrom(d.state, (a, b) => b)
        .map(x => skip ? x : !Boolean(x))
)
