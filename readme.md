# dscript-mapper
[![NPM version](https://badge.fury.io/js/dscript-mapper.svg)](https://badge.fury.io/js/dscript-mapper)
[![Build Status](https://travis-ci.org/dustinspecker/dscript-mapper.svg?branch=master)](https://travis-ci.org/dustinspecker/dscript-mapper)
[![Coverage Status](https://img.shields.io/coveralls/dustinspecker/dscript-mapper.svg)](https://coveralls.io/r/dustinspecker/dscript-mapper?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/dscript-mapper/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/dscript-mapper)
[![Dependencies](https://david-dm.org/dustinspecker/dscript-mapper.svg)](https://david-dm.org/dustinspecker/dscript-mapper/#info=dependencies&view=table)
[![DevDependencies](https://david-dm.org/dustinspecker/dscript-mapper/dev-status.svg)](https://david-dm.org/dustinspecker/dscript-mapper/#info=devDependencies&view=table)

> Map models between stateless function components from different frameworks

A ***naive*** attempt at converting models to create framework agnostic stateless function components.

## Install
```
npm install --save dscript-mapper
```

## Purpose

To ***experiment*** with the idea of creating framework agnostic stateles function components. If maintainers could produce components supported by multiple frameworks with as close to
zero cost as possible, the benefits could be huge.

## *"Supported"* Frameworks
- Deku - Deku models' `context` and `dispatch` are lost when converting to React
- React

## Usage
```javascript
// maintainer-uses-deku-structure.js
import dscript from 'dscript'
import {mapModelToDeku} from 'dscript-mapper'

export default renderer => model => {
  const {li, ul} = dscript(renderer)

  const {props, children} = mapModelToDeku(model)

  return (
    ul('.list-container',
      props.items.map(item =>
        li([item.name])
      )
    )
  )  
}
```

```javascript
// maintainer-uses-react-structure.js
import dscript from 'dscript'
import {mapModelToReact} from 'dscript-mapper'

export default renderer => model => {
  const {li, ul} = dscript(renderer)

  const props = mapModelToReact(model)
  // props has children via props.children

  return (
    ul('.list-container',
      props.items.map(item =>
        li([item.name])
      )
    )
  )  
}

```

```javascript
// consumer-uses-deku-but-wants-to-use-react-structured-component
import {element} from 'deku'

import reactComponent from 'maintainer-uses-react-structure'

export default reactComponent(element)
```

```javascript
// consumer-uses-react-but-wants-to-use-deku-structured-component
import {createElement} from 'react'

import dekuComponent from 'maintainer-uses-deku-structure'

export default dekuComponent(createElement)
```

## Current Cons

- Lose unique properties such as Deku models having dispatch
- Probably tons of cases and edge cases I can't even begin to think of
- Prop validation is tough. *(Need to find a way to convert the model before calling the render function.)*
- Consumers need to pass their renderer function. Feels awkward.

## Ideas
- dscript helper to pass `createElement` from dscript to prevent awkwardness of manually passing it down
- Wrap render function to map model before passing to render function. (Enables prop validation)

## API

### mapModelToDeku(model)
Convert a model to a Deku model.

#### model
type: `object`

The model to be converted. If model looks like a Deku model, then the **same** model is returned.

### mapModelToReact(model)
Convert a model to a React model.

#### model
type: `object`

The model to be converted. If model looks like a React model, then the **same** model is returned.

## LICENSE
MIT © [Dustin Specker](https://github.com/dustinspecker)
