const targs = require('argtoob')

module.exports = (state, component) => {
  return state
    .distinctUntilChanged()
    .withLatestFrom(component, targs('state', 'component'))
    .subscribe(x => x.component.dispatch('COLLAPSE', x.state))
}
