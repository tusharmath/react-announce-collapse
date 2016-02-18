import test from 'ava'
import { TestScheduler, ReactiveTest, Disposable } from 'rx'
import d from '../src/dispatch'

const {onNext} = ReactiveTest

test('dispose', t => {
  const sh = new TestScheduler()
  const state = sh.createHotObservable()
  const component = sh.createHotObservable()
  t.true(Disposable.isDisposable(d(state, component)))
})

test('event:COLLAPSE', t => {
  const out = []
  const _component = {dispatch: (ev, state) => out.push({ev, state})}
  const sh = new TestScheduler()
  const state = sh.createHotObservable(onNext(210, true), onNext(220, false))
  const component = sh.createHotObservable(onNext(200, _component))
  d(state, component)
  sh.start()
  t.same(out, [
    {ev: 'COLLAPSE', state: true},
    {ev: 'COLLAPSE', state: false}
  ])
})

test('event:distinct', t => {
  const out = []
  const _component = {dispatch: (ev, state) => out.push(state)}
  const sh = new TestScheduler()
  const state = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false),
    onNext(230, false)
  )
  const component = sh.createHotObservable(onNext(200, _component))
  d(state, component)
  sh.start()
  t.same(out, [true, false])
})
