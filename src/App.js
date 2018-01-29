import React, { Component } from "react";
import "./App.css";
import api from "./api";
import ActionTypes from "./ActionTypes";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
import Checkout from "./Components/Checkout";
import Appbar from "./Components/AppBar";
import actions from "./actions";
import reducer, { selectors } from "./reducer";
import store from "./store";
import PropTypes from "prop-types";
import { Provider, connect } from 'react-redux';
 
class App extends Component {
  componentDidMount = () => {
    this.props.initCart();    
    this.props.getProducts();
  };
  render() {
    return (
      <div className="App">
        <Appbar />
        <ProductList />
        <Cart />
        <Checkout />
      </div>
    );
  }
}

const mdp = dispatch => ({
  getProducts() {
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => dispatch(actions.addProducts(data)))
      .catch(err => dispatch(actions.addError({ message: "Server Error" })));
  },
  initCart() {
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    console.log(cart);
    dispatch(actions.initCart(cart));
  }
})

const ConnectedApp = connect(() => ({}), mdp)(App);

const AppWrapped = () => (
  <Provider store={store}>
    <ConnectedApp />    
  </Provider>
)

export default AppWrapped;
