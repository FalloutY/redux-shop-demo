import React, { Component } from "react";
import "./App.css";
import api from "./api";
import Cart from './Components/Cart';
import ProductList from './Components/ProductList';
import Checkout from './Components/Checkout';
import Appbar from './Components/AppBar';

class App extends Component {
  initialState = { products: [], error: null, cart: [] };
  state = this.initialState;

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case "ADD_PRODUCTS":
        return { ...state, ...{ products: action.data } };
      case "ADD_ERROR":
        return { ...state, ...{ error: action.error } };
      default:
        return state;
    }
  };

  dispatch = action => {
    this.setState(this.reducer(this.state, action));
  };

  componentDidMount = () => {
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => this.dispatch({ type: "ADD_PRODUCTS", data }))
      .catch(err =>
        this.dispatch({ type: "ADD_ERROR", error: { message: "Server Error" } })
      );
  };

  render() {
    return (
      <div className="App">
        <Appbar cartItems={this.state.cart} />
        <ProductList products={this.state.products} />
        <Cart cartItems={this.state.cart}/>
        <Checkout />
      </div>
    );
  }
}

export default App;
