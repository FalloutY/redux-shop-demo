import React, { Component } from "react";
import "./App.css";
import api from "./api";
import ActionTypes from "./ActionTypes";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
import Checkout from "./Components/Checkout";
import Appbar from "./Components/AppBar";
import actions from './actions';
import reducer, { selectors } from './reducer';
import { createStore } from 'redux'
import Connect, { APP_CONTEXT } from './Connect';
import PropTypes from "prop-types";



class App extends Component {
  initialState = { products: [], error: null, cart: {} };
  store = createStore(reducer, this.initialState);
  static childContextTypes = {
    [APP_CONTEXT]: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      [APP_CONTEXT]: this.store.getState()
    };
  }

  componentDidMount = () => {
    const dispatch = this.store.dispatch;
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => dispatch(actions.addProducts(data)) )
      .catch(err => dispatch(actions.addError({ message: "Server Error" }))
      );
    this.unsubscribe = this.store.subscribe(this.forceUpdate.bind(this));
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    const dispatch = this.store.dispatch;
    
    return ( 
      <div className="App">
        <Appbar />
        <ProductList
          onAddToCart={product => {
            dispatch(actions.addToCart(product));
          }}
          onRemoveFromCart={product => {
            dispatch(actions.removeFromCart(product));
          }}
        />
        <Cart />
        <Checkout
          onCheckout={() => {
            dispatch(actions.checkout());
          }}
        />
      </div>
    );
  }
}

export default App;
