import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import e from '../src/getCollapsable'

const {onNext} = ReactiveTest
const testObserver = s => {
  const out = []
  s.subscribe(x => out.push(x))
  return out
}

test('esc', t => {
  const sh = new TestScheduler()

  const esc = sh.createHotObservable(onNext(210))
  const targets = sh.createHotObservable()
  const node = sh.createHotObservable()
  const component = sh.createHotObservable()
  const state = sh.createHotObservable()

  const out = testObserver(e(esc, targets, node, component, state, true))
  sh.start()
  t.same(out, [false])
})
