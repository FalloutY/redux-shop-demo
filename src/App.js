import React, { Component } from "react";
import "./App.css";
import api from "./api";

const Appbar = ({ cart }) => (
  <div className="appbar__container">
    <div className="appbar">
      <div className="appbar__left">
        <div className="brand__name">
         📱 App Shop
        </div>
      </div>

      <div className="appbar__right">
        <div className="cart__info">
          <span className="cart__icon">
            Cart
          </span>
          <span className="cart__alert">
            4
          </span>
        </div>
      </div>
    </div>
  </div>

)

const Product = ({product}) => (
  <div className="product__container">
    <div className="product__icon">
      <img src={product.logo} alt={`logo for ${product.name}`} className="product__img"/>
    </div>
    <div className="product__title">{product.name}</div>
    <div className="product__price">
      <span className="product__price__number">${product.cost.toFixed(2)}</span>
      <span className="product__price_desc"> / {product.cycle}</span>
    </div>
    <div className="product__description__copy">{product.description}</div>
    <div className="product__actions">
      <div className="product__add_to_cart">
        <button className="product__atc_button">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
)
class App extends Component {
  initialState = { products: [], error: null };
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
        <Appbar cart={this.state.cart} />
        <div className="products__list">
          {
            this.state.products && 
              this.state.products.map(product => (
                <Product product={product} key={product.id}/>
              ))
          }
        
        </div>

      </div>
    );
  }
}

export default App;
