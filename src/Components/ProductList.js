import React from "react";
import { selectors } from '../reducer';
import { connect }  from 'react-redux';
import actions from "../actions";


const Product = ({ product, cartItem, onAddToCart, onRemoveFromCart }) => (
  <div className="product__container">
    <div className="product__icon">
      <img
        src={product.logo}
        alt={`logo for ${product.name}`}
        className="product__img"
      />
    </div>
    <div className="product__title">{product.name}</div>
    <div className="product__price">
      <span className="product__price__number">${product.cost.toFixed(2)}</span>
      <span className="product__price_desc"> / {product.cycle}</span>
    </div>
    <div className="product__description__copy">{product.description}</div>

    {cartItem ? (
      <div className="product__actions__added">
        <button
          className="product__qminus"
          onClick={() => {
            onRemoveFromCart(product);
          }}
        >
          -
        </button>
        <div className="product__quantity">{cartItem.quantity}</div>
        <button
          className="product__qplus"
          onClick={() => {
            onAddToCart(product);
          }}
        >
          +
        </button>
      </div>
    ) : (
      <div className="product__actions">
        <div className="product__add_to_cart">
          <button
            className="product__atc_button"
            onClick={() => {
              onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    )}
  </div>
);

const ProductList = ({ products, cart, onAddToCart, onRemoveFromCart }) => (
  <div className="products__list">
    {products &&
      products.map(product => (
        <Product
          product={product}
          key={product.id}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          cartItem={cart[product.id]}
        />
      ))}
  </div>
);


const msp = (state) => ({
  cart: state.cart,
  products: state.products
});
const mdp = (dispatch) => ({
  onAddToCart: (product) => dispatch(actions.addToCart(product)),
  onRemoveFromCart: (product) => dispatch(actions.removeFromCart(product))
});

export default connect(msp, mdp)(ProductList);

