import React, { Component } from "react";
import "./App.css";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
import Checkout from "./Components/Checkout";
import Appbar from "./Components/AppBar";
import actions from "./actions";
import store from "./store";
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
    dispatch(actions.getProducts())
  },
  initCart() {
    dispatch(actions.initCart())
  }
})

const ConnectedApp = connect(() => ({}), mdp)(App);

const AppWrapped = () => (
  <Provider store={store}>
    <ConnectedApp />    
  </Provider>
)

export default AppWrapped;
