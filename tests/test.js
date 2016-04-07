'use strict'
import {createElement} from 'react'
import dscript from 'dscript'
import {element} from 'deku'
import test from 'ava'

import dscriptMapper from '../lib/'

const dekuModelForComponent = {
  children: [],
  props: {
    items: [
      {name: 'abe'},
      {name: 'george'}
    ]
  }
}

const reactModelForComponent = {
  children: [],
  items: [
    {name: 'abe'},
    {name: 'george'}
  ]
}

const dekuComponent = renderer => model => {
  const {li, ul} = dscript(renderer)

  const {props} = dscriptMapper.mapModelToDeku(model)

  return (
    ul('.list-container',
      props.items.map((item, key) =>
        li({key}, [item.name, 'hello'])
      )
    )
  )
}

const reactComponent = renderer => model => {
  const {li, ul} = dscript(renderer)

  const props = dscriptMapper.mapModelToReact(model)

  return (
    ul('.list-container',
      props.items.map((item, key) =>
        li({key}, [item.name, 'hello'])
      )
    )
  )
}

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
  t.deepEqual(reactModel.children, ['hi'])
})

test('it should map React model to Deku model', t => {
  const reactModel = {
    count: 3,
    children: ['hi']
  }

  const dekuModel = dscriptMapper.mapModelToDeku(reactModel)

  t.is(dekuModel.props.count, 3)
  t.is(dekuModel.props.children, undefined)
  t.deepEqual(dekuModel.children, ['hi'])
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

test('it should render React component with Deku model and renderer', t => {
  const component = reactComponent(element)(dekuModelForComponent)

  t.is(component.attributes.class, 'list-container')
  t.is(component.type, 'ul')

  const [firstItem, secondItem] = component.children

  t.is(firstItem.type, 'li')
  t.is(firstItem.children[0].type, '#text')
  t.is(firstItem.children[0].nodeValue, 'abe')

  t.is(secondItem.type, 'li')
  t.is(secondItem.children[0].type, '#text')
  t.is(secondItem.children[0].nodeValue, 'george')
})

test('it should render React component with React model and renderer', t => {
  const component = reactComponent(createElement)(reactModelForComponent)

  t.is(component.props.class, 'list-container')
  t.is(component.type, 'ul')

  const [firstItem, secondItem] = component.props.children

  t.is(firstItem.type, 'li')
  t.is(firstItem.props.children[0], 'abe')

  t.is(secondItem.type, 'li')
  t.is(secondItem.props.children[0], 'george')
})

test('it should render Deku component with Deku model and renderer', t => {
  const component = dekuComponent(element)(dekuModelForComponent)

  t.is(component.attributes.class, 'list-container')
  t.is(component.type, 'ul')

  const [firstItem, secondItem] = component.children

  t.is(firstItem.type, 'li')
  t.is(firstItem.children[0].type, '#text')
  t.is(firstItem.children[0].nodeValue, 'abe')

  t.is(secondItem.type, 'li')
  t.is(secondItem.children[0].type, '#text')
  t.is(secondItem.children[0].nodeValue, 'george')
})

test('it should render Deku component with React model and renderer', t => {
  const component = dekuComponent(createElement)(reactModelForComponent)

  t.is(component.props.class, 'list-container')
  t.is(component.type, 'ul')

  const [firstItem, secondItem] = component.props.children

  t.is(firstItem.type, 'li')
  t.is(firstItem.props.children[0], 'abe')

  t.is(secondItem.type, 'li')
  t.is(secondItem.props.children[0], 'george')
})
