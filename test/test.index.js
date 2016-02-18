import test from 'ava'
import { spy, stub } from 'sinon'
import e from '../src/index'

test(t => {
  const ReactDOM = {}
  const window = {}
  const stream = {}
  const params = {skip: false}
  const component = {}
  const sources = {component}
  const hasParent = {}
  const currState = {}
  const getSourceStreams = stub().returns(sources)
  const getCollapsable = stub().returns(currState)
  const dispatch = spy()
  e({getSourceStreams, getCollapsable, dispatch, hasParent}, ReactDOM, window, stream, params)

  t.ok(getSourceStreams.calledWith(ReactDOM, window, stream))
  t.ok(getCollapsable.calledWith(sources, hasParent, params.skip))
  t.ok(dispatch.calledWith(currState, component))
})
