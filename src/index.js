'use strict'

/**
 * Is model a Deku model?
 *
 * Naively assume if props and children are properties of object that it is a
 * Deku model.
 *
 * @param {Object} model - model to examine
 * @return {Boolean} - model is a Deku model
 */
const isDekuModel = model =>
  model.props && model.children

/**
 * Is model a React model
 *
 * Naively assume if props does not exist as a property and children exists that it
 * is a React model.
 *
 * @param {Object} model - model to examine
 * @return {Boolean} - model is a React model
 */
const isReactModel = model =>
  !model.props && model.children

/**
 * Convert model to a Deku model
 *
 * @param {Object} model - model to convert
 * @return {Object} - a Deku model
 */
const mapModelToDeku = model => {
  if (isDekuModel(model)) {
    return model
  }

  const props = model
  const children = model.children

  /* eslint-disable prefer-reflect */
  delete props.children
  /* eslint-enable prefer-reflect */

  return {props, children}
}

/**
 * Convert model to a React model
 *
 * @param {Object} model - model to convert
 * @return {Object} - a React model
 */
const mapModelToReact = model => {
  if (isReactModel(model)) {
    return model
  }

  model.props.children = model.children

  return model.props
}

module.exports = {
  mapModelToDeku,
  mapModelToReact
}
