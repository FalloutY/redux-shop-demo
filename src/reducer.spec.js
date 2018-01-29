import reducer, { initialState, selectors } from "./reducer";
import ActionTypes from "./ActionTypes";

describe("Add Products Reducer", () => {
  it("ADD_PRODUCTS action should add products to the store", () => {
    const state = initialState;
    const action = {
      type: ActionTypes.ADD_PRODUCTS,
      products: ["Product 1", "Product 2"]
    };
    const expectedState = {
      products: ["Product 1", "Product 2"],
      error: null,
      cart: {}
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});

describe("Add to Cart Reducer", () => {
  const state = {
    products: [
      {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      },
      {
        id: "hulu",
        name: "Hulu",
        cost: 7.999
      }
    ],
    error: null,
    cart: {}
  };

  it("ADD_TO_CART action should add product to the cart", () => {
    const action = {
      type: ActionTypes.ADD_TO_CART,
      product: {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      }
    };

    const resultingState = reducer(state, action);
    expect(resultingState.cart["netflix"]).toBeDefined();
    expect(resultingState.cart['netflix'].quantity).toEqual(1);
  });
});


describe("Remove from Cart Reducer", () => {
  const state = {
    products: [
      {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      },
      {
        id: "hulu",
        name: "Hulu",
        cost: 7.999
      }
    ],
    error: null,
    cart: {
      netflix: {
        id: "netflix",
        name: "Netflix",
        cost: 12.99,
        quantity: 2
      }
    }
  };

  it("REMOVE_FROM_CART action should remove products from the cart", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_CART,
      product: {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      }
    };

    const resultingState = reducer(state, action);
    expect(resultingState.cart["netflix"]).toBeDefined();
    expect(resultingState.cart['netflix'].quantity).toEqual(1);
  });

  it("REMOVE_FROM_CART action should remove product entirely from cart if quantity goes to zero", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_CART,
      product: {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      }
    };

    let resultingState = reducer(state, action);
    resultingState = reducer(resultingState, action);    
    expect(resultingState.cart["netflix"]).toBeUndefined();
  });
});

describe("Checkout", () => {
  const state = {
    products: [
      {
        id: "netflix",
        name: "Netflix",
        cost: 12.99
      },
      {
        id: "hulu",
        name: "Hulu",
        cost: 7.999
      }
    ],
    error: null,
    cart: {
      netflix: {
        id: "netflix",
        name: "Netflix",
        cost: 12.99,
        quantity: 2
      }
    }
  };

  it("CHECKOUT action should remove everything from cart", () => {
    const action = {
      type: ActionTypes.CHECKOUT
    };

    expect(reducer(state, action).cart).toEqual(initialState.cart);
  });
});