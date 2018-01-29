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
import Connect, { APP_CONTEXT } from './Connect';
import PropTypes from "prop-types";



class App extends Component {
  initialState = { products: [], error: null, cart: {} };
  state = this.initialState;
  actions = actions;
  reducer = reducer;
  static childContextTypes = {
    [APP_CONTEXT]: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      [APP_CONTEXT]: this.state
    };
  }
  dispatch = action => {
    console.log("dispatching...", action);
    this.setState(this.reducer(this.state, action));
  };

  componentDidMount = () => {
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => this.dispatch(this.actions.addProducts(data)))
      .catch(err =>
        this.dispatch(this.actions.addError({ message: "Server Error" }))
      );
  };

  render() {
    return ( 
      <div className="App">
        <Appbar />
        <ProductList
          onAddToCart={product => {
            this.dispatch(this.actions.addToCart(product));
          }}
          onRemoveFromCart={product => {
            this.dispatch(this.actions.removeFromCart(product));
          }}
        />
        <Cart />
        <Checkout
          onCheckout={() => {
            this.dispatch(this.actions.checkout());
          }}
        />
      </div>
    );
  }
}

export default App;
