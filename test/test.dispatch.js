import test from 'ava'
import { TestScheduler, ReactiveTest, Disposable } from 'rx'
import d from '../src/dispatch'

const {onNext} = ReactiveTest

const testObserver = s => {
  const out = []
  s.subscribe(x => out.push(x))
  return out
}

test('dispose', t => {
  const sh = new TestScheduler()
  const state = sh.createHotObservable()
  const component = sh.createHotObservable()
  t.true(Disposable.isDisposable(d(state, component)))
})
