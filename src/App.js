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
    const {dispatch} = this.props;
    api
      .getServices()
      .then(resp => resp.json())
      .then(data => dispatch(actions.addProducts(data)))
      .catch(err => dispatch(actions.addError({ message: "Server Error" })));
  };

  render() {
    const {dispatch} = this.props;

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

const ConnectedApp = connect()(App);

const AppWrapped = () => (
  <Provider store={store}>
    <ConnectedApp />    
  </Provider>
)

export default AppWrapped;
