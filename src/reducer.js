import ActionTypes from './ActionTypes';

const changeCartQuantity = (state, product, changeQuantity) => {
  const productId = product.id;
  const newCartItem = state.cart[productId]
    ? {
        ...state.cart[productId],
        ...{ quantity: state.cart[productId].quantity + changeQuantity }
      }
    : {
        ...product,
        ...{ quantity: 1 }
      };

  const newCart = {
    ...state.cart,
    ...{ [productId]: newCartItem.quantity > 0 ? newCartItem : undefined }
  };
  return { ...state, ...{ cart: newCart } };
};

const reducer = (state = this.initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCTS:
      return { ...state, ...{ products: action.products } };
    case ActionTypes.ADD_TO_CART:
      return { ...changeCartQuantity(state, action.product, 1) };
    case ActionTypes.REMOVE_FROM_CART:
      return { ...changeCartQuantity(state, action.product, -1) };
    case ActionTypes.CHECKOUT:
      return { ...state, ...{ cart: {} } };
    case ActionTypes.ADD_ERROR:
      return { ...state, ...{ error: action.error } };
    default:
      return state;
  }
};

export const selectors = {
  getCartItems(state) {
    return Object.values(state.cart).filter(f => f);
  }
}

export default reducer;