import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import e from '../src/getCollapsable'

const {onNext} = ReactiveTest
const testObserver = s => {
  const out = []
  s.subscribe(x => out.push(x))
  return out
}

const hasParent = (node, parent) => node.parent === parent

test('esc', t => {
  const sh = new TestScheduler()

  const esc = sh.createHotObservable(onNext(210))
  const target = sh.createHotObservable()
  const node = sh.createHotObservable()
  const state = sh.createHotObservable()

  const out = testObserver(e(esc, target, node, state, hasParent, true))
  sh.start()
  t.same(out, [false])
})

test('target:inside', t => {
  const sh = new TestScheduler()
  const parent = {}
  const esc = sh.createHotObservable()
  const target = sh.createHotObservable(
    onNext(210, {parent}),
    onNext(220, {parent})
  )
  const node = sh.createHotObservable(onNext(200, parent))
  const state = sh.createHotObservable(
    onNext(201, true),
    onNext(215, false)
  )

  const out = testObserver(e(esc, target, node, state, hasParent, false))
  sh.start()
  t.same(out, [false, true])
})

test('target:outside', t => {
  const sh = new TestScheduler()
  const parent = {}
  const esc = sh.createHotObservable()
  const target = sh.createHotObservable(
    onNext(210, {parent: {}}),
    onNext(220, {parent: {}})
  )
  const node = sh.createHotObservable(onNext(200, parent))
  const state = sh.createHotObservable()

  const out = testObserver(e(esc, target, node, state, hasParent, false))
  sh.start()
  t.same(out, [false, false])
})

test('target:inside:skipped', t => {
  const sh = new TestScheduler()
  const parent = {}
  const esc = sh.createHotObservable()
  const target = sh.createHotObservable(
    onNext(210, {parent}),
    onNext(220, {parent})
  )
  const node = sh.createHotObservable(onNext(200, parent))
  const state = sh.createHotObservable(
    onNext(201, true),
    onNext(215, false)
  )

  const out = testObserver(e(esc, target, node, state, hasParent, true))
  sh.start()
  t.same(out, [true, false])
})
