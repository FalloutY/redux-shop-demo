import React from 'react'

const Checkout = ({onCheckout}) => (
  <div id="Checkout" >
    <div className="checkout__success">
      Checkout Successful
    </div>
    
    <a href="#">
      <button onClick={() => {onCheckout()}}>
        Go Back to Shopping
      </button>
    </a>

  </div>
);

export default Checkout;