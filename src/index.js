import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./App.css";

import App from './App';
import { configureStore } from "./store";
import { Provider } from 'react-redux';

const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
document.getElementById('root'));
