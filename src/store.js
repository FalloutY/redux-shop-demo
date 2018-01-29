import { createStore } from 'redux'

import reducer, { initialState } from './reducer'

const enableDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(reducer, initialState, enableDevTools);

export default store;