import React, { Component } from "react";
import "./App.css";
import api from "./api";
import ActionTypes from "./ActionTypes";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
import Checkout from "./Components/Checkout";
import Appbar from "./Components/AppBar";

class App extends Component {
  initialState = { products: [], error: null, cart: {} };
  state = this.initialState;

  actions = {
    addProducts(products) {
      return {
        type: ActionTypes.ADD_PRODUCTS,
        products
      };
    },
    addError(error) {
      return {
        type: ActionTypes.ADD_ERROR,
        error
      };
    },
    addToCart(product) {
      return {
        type: ActionTypes.ADD_TO_CART,
        product
      };
    },
    removeFromCart(product) {
      return {
        type: ActionTypes.REMOVE_FROM_CART,
        product
      };
    },
    checkout() {
      return {
        type: ActionTypes.CHECKOUT
      };
    }
  };
  changeCartQuantity = (state, product, changeQuantity) => {
    const productId = product.id;
    const newCartItem = state.cart[productId]
      ? {
          ...state.cart[productId],
          ...{ quantity: state.cart[productId].quantity + changeQuantity }
        }
      : {
          ...product,
          ...{ quantity: 1 }
        };

    const newCart = {
      ...state.cart,
      ...{ [productId]: newCartItem.quantity > 0 ? newCartItem : undefined }
    };
    return { ...state, ...{ cart: newCart } };
  };

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case ActionTypes.ADD_PRODUCTS:
        return { ...state, ...{ products: action.products } };
      case ActionTypes.ADD_TO_CART:
        return { ...this.changeCartQuantity(state, action.product, 1) };
      case ActionTypes.REMOVE_FROM_CART:
        return { ...this.changeCartQuantity(state, action.product, -1) };
      case ActionTypes.CHECKOUT:
        return { ...state, ...{ cart: {} } };
      case ActionTypes.ADD_ERROR:
        return { ...state, ...{ error: action.error } };
      default:
        return state;
    }
  };

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
        <Appbar cartItems={Object.values(this.state.cart).filter(f => f)} />
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
        <Cart cartItems={Object.values(this.state.cart).filter(f => f)} />
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
