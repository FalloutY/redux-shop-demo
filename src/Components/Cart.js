import React from 'react'

const Cart = ({ cartItems }) => (
  <div id="Cart">
    <div className="cart__container">
      <div className="cart__heading">
        Cart
      </div>
      <div className="cart__items_container">

        { cartItems.length > 0 && 
          <div className="cart__item header">
            <div className="cart__item_name">
              Service
            </div>
            <div className="cart__item_quantity">Months</div>
            <div className="cart__item_price">Price</div>
            <div className="cart__item_total">Total</div>
          </div>
        }

        { 
          cartItems.length > 0 &&
          cartItems.map(item => (
            <div className="cart__item">
              <div className="cart__item_name">
                {item.name}
              </div>
              <div className="cart__item_quantity">{item.quantity}</div>
              <div className="cart__item_price">{item.cost}</div>
              <div className="cart__item_total">{item.quantity * item.cost}</div>
            </div>
          ))
        }

        {
          cartItems.length > 0 &&
          <div className="cart__item total">
            <div className="cart__item_name">
              Total
            </div>
            <div className="cart__item_total">76.93</div>
          </div>

        }

        { cartItems.length > 0 &&
        
          <div className="cart__actions">
            <a href="#Checkout">
              <button className="cart__checkout">
                Checkout
              </button>
            </a>
          </div>
        }

        <div className="cart__actions">
          <a href="#" className="cart__cancel">
            {
              cartItems.length > 0 ?
              'Cancel' :
              'No Items in Cart, go back to shopping'
            }
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Cart;