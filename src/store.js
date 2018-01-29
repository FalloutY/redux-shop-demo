import { createStore, applyMiddleware } from 'redux'

import reducer, { initialState } from './reducer'

import { thunk, cartLocalStorage } from './middlewares' 

const enableDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(reducer, initialState, applyMiddleware(thunk, cartLocalStorage));

export default store;