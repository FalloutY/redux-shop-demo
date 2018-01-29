import React from 'react'

const Appbar = ({ cartItems }) => (
  <div className="appbar__container">
    <div className="appbar">
      <div className="appbar__left">
        <div className="brand__name">
         📱 App Shop
        </div>
      </div>

      <div className="appbar__right">
        <div className="cart__info">
          <a href="#Cart">
            <span className="cart__icon">
              Cart
            </span>
            {
              cartItems.length > 0 &&
              <span className="cart__alert">
                {cartItems.length}
              </span>
            }
          
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Appbar;
