import ActionTypes from "./ActionTypes";
export const initialState = { products: [], error: null, cart: {} };
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

const handlers = {
  [ActionTypes.ADD_TO_CART]: (state, action) => {
    return { ...changeCartQuantity(state, action.product, 1) };
  },
  [ActionTypes.REMOVE_FROM_CART]: (state, action) => {
    return { ...changeCartQuantity(state, action.product, -1) };
  },
  [ActionTypes.ADD_PRODUCTS]: (state, action) => {
    return { ...state, ...{ products: action.products } };
  },
  [ActionTypes.CHECKOUT]: (state, action) => {
    return { ...state, ...{ cart: {} } };
  },
  [ActionTypes.ADD_ERROR]: (state, action) => {
    return { ...state, ...{ error: action.error } };
  },
  [ActionTypes.INIT_CART]: (state, action) => {
    console.log(action.cart);
    return { ...state, ...{cart: action.cart} };
  }
};

const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

export default createReducer({ products: [], error: null, cart: {} }, handlers);

export const selectors = {
  getCartItems(state) {
    return Object.values(state.cart).filter(f => f);
  }
};
