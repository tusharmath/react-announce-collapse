import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import { spy, stub } from 'sinon'
import e from '../src/collapsable'

const {onNext} = ReactiveTest
const testObserver = s => {
  const out = []
  s.subscribe(x => out.push(x))
  return out
}

test(t => {
  const mock = x => x
  const out = e({collapsable: x => null }, 'react-dom', 'window')()(mock)
  t.is(out, mock)
})

test('init', t => {
  const ReactDOM = {}
  const window = {}
  const stream = {}
  const component = {}
  const sources = {component}
  const hasParent = {}
  const currState = {}
  const getSourceStreams = stub().returns(sources)
  const getCollapsable = stub().returns(currState)
  const dispatch = spy()
  e.init({getSourceStreams, getCollapsable, dispatch, hasParent}, ReactDOM, window, stream)

  t.ok(getSourceStreams.calledWith(ReactDOM, window, stream))
  t.ok(getCollapsable.calledWith(sources, hasParent))
  t.ok(dispatch.calledWith(currState, component))
})

test('getDomNode', t => {
  const component = {}
  const sh = new TestScheduler()
  const findDOMNode = stub().returns('dom-node')
  const ReactDOM = {findDOMNode}
  const stream = sh.createHotObservable(onNext(210, {event: 'DID_MOUNT', component}))
  const out = testObserver(e.getDomNode(ReactDOM, stream))
  sh.start()
  t.ok(findDOMNode.calledWith(component))
  t.same(out, ['dom-node'])
})

test('getClickTargets', t => {
  const addEventListener = (ev, cb) => cb({target: 'dom-node'})
  const window = {addEventListener}
  const out = testObserver(e.getClickTargets(window))
  t.same(out, ['dom-node'])
})

test('getEscKey', t => {
  const addEventListener = (ev, cb) => cb({keyCode: 27})
  const window = {addEventListener}
  const out = testObserver(e.getEscKey(window))
  t.same(out, [27])
})
