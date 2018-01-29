import ActionTypes from './ActionTypes';

export default {
  addProducts(products) {
    return {
      type: ActionTypes.ADD_PRODUCTS,
      products
    };
  },
  addError(error) {
    return {
      type: ActionTypes.ADD_ERROR,
      error
    };
  },
  addToCart(product) {
    return {
      type: ActionTypes.ADD_TO_CART,
      product
    };
  },
  removeFromCart(product) {
    return {
      type: ActionTypes.REMOVE_FROM_CART,
      product
    };
  },
  checkout() {
    return {
      type: ActionTypes.CHECKOUT
    };
  }
}