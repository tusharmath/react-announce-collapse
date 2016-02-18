import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import e from '../src/getCollapsable'

const {onNext} = ReactiveTest
const testObserver = s => {
  const out = []
  s.subscribe(x => out.push(x))
  return out
}

const hotties = (sh, count) => {
  const hot = []
  while(count-- !== 0){
    hot.push(sh.createHotObservable())
  }
  return hot
}

test('esc', t => {
  const sh = new TestScheduler()

  const esc = sh.createHotObservable(onNext(210))
  const [targets, node, component, state] = hotties(sh, 4)

  const out = testObserver(e(esc, targets, node, component, state, true))
  sh.start()
  t.same(out, [false])
})
