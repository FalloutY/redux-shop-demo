import ActionTypes from './ActionTypes';

const makeActionCreator = (type, ...argNames) =>  (...args) => {
  let action = { type }
  argNames.forEach((arg, i) => {
    action[argNames[i]] = args[i]
  })
  return action
};


export default {
  addProducts: makeActionCreator(ActionTypes.ADD_PRODUCTS, 'products'),
  addError: makeActionCreator(ActionTypes.ADD_ERROR, 'error'),
  addToCart: makeActionCreator(ActionTypes.ADD_TO_CART, 'product'),
  removeFromCart: makeActionCreator(ActionTypes.REMOVE_FROM_CART, 'product'),
  checkout: makeActionCreator(ActionTypes.CHECKOUT)
}