import ActionTypes from './ActionTypes';
import api from './api';


const makeActionCreator = (type, ...argNames) =>  (...args) => {
  let action = { type }
  argNames.forEach((arg, i) => {
    action[argNames[i]] = args[i]
  })
  return action
};


const actions = {
  addProducts: makeActionCreator(ActionTypes.ADD_PRODUCTS, 'products'),
  addError: makeActionCreator(ActionTypes.ADD_ERROR, 'error'),
  addToCart: makeActionCreator(ActionTypes.ADD_TO_CART, 'product'),
  removeFromCart: makeActionCreator(ActionTypes.REMOVE_FROM_CART, 'product'),
  checkout: makeActionCreator(ActionTypes.CHECKOUT),
  initCart: makeActionCreator(ActionTypes.INIT_CART, 'cart')
};

const asyncActions = {
  getProducts: () => dispatch => {
    return api
    .getServices()
    .then(resp => resp.json())
    .then(data => dispatch(actions.addProducts(data)))
    .catch(err => dispatch(actions.addError({ message: "Server Error" })));
  },
  initCart: () => dispatch => {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || {};
    dispatch(actions.initCart(cart));
  }
}

export default {...actions, ...asyncActions};