import React, { Component } from 'react'

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
);

const ProductList = ({products}) => (
  <div className="products__list">
    {
      products && 
      products.map(product => (
        <Product product={product} key={product.id}/>
      ))
    }
</div>
);

export default ProductList;