'use strict'
import test from 'ava'

import dscriptMapper from '../lib/'

test('it should map Deku model to React model', t => {
  const dekuModel = {
    props: {
      count: 3
    },
    children: [
      'hi'
    ]
  }

  const reactModel = dscriptMapper.mapModelToReact(dekuModel)

  t.is(reactModel.count, 3)
  t.same(reactModel.children, ['hi'])
})

test('it should map React model to Deku model', t => {
  const reactModel = {
    count: 3,
    children: ['hi']
  }

  const dekuModel = dscriptMapper.mapModelToDeku(reactModel)

  t.is(dekuModel.props.count, 3)
  t.is(dekuModel.props.children, undefined)
  t.same(dekuModel.children, ['hi'])
})

test('it should return same Deku model when already a Deku model', t => {
  const dekuModel = {
    props: {
      count: 3
    },
    children: [
      'hi'
    ]
  }

  const sameDekuModel = dscriptMapper.mapModelToDeku(dekuModel)

  t.is(sameDekuModel, dekuModel)
})

test('it should return same React model when already a React model', t => {
  const reactModel = {
    count: 3,
    children: ['hi']
  }

  const sameReactModel = dscriptMapper.mapModelToReact(reactModel)

  t.is(sameReactModel, reactModel)
})
