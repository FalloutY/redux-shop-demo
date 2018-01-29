import React from 'react'
import { connect } from 'react-redux';
import actions from "../actions";



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

const mdp = dispatch => ({
  onCheckout:() => dispatch(actions.checkout())
})

export default connect(() => ({}), mdp)(Checkout);