
import ActionTypes from './ActionTypes';


export const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)

export const cartLocalStorage = store => next => action => {
  next(action);
  const whiteListedActions = [ActionTypes.ADD_TO_CART, ActionTypes.REMOVE_FROM_CART, ActionTypes.CHECKOUT];

  if (whiteListedActions.indexOf(action.type) > -1) {
    window.localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  }

}
