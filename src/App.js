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

class App extends Component {
  initialState = { products: [], error: null, cart: {} };
  state = this.initialState;
  actions = actions;
  reducer = reducer;

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
        <Appbar cartItems={selectors.getCartItems(this.state)} />
        <ProductList
          products={this.state.products}
          cart={this.state.cart}
          onAddToCart={product => {
            this.dispatch(this.actions.addToCart(product));
          }}
          onRemoveFromCart={product => {
            this.dispatch(this.actions.removeFromCart(product));
          }}
        />
        <Cart cartItems={selectors.getCartItems(this.state)} />
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
