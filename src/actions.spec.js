import actions from './actions';
import ActionTypes from './ActionTypes';


describe('Action Tests', () => {
  it('addProducts generates the action of correct type', () => {
    expect(
      actions.addProducts()
    ).toEqual(
      { type: ActionTypes.ADD_PRODUCTS}
    )
  });

  it('addProducts forwards the products argument', () => {
    const products = ['test_products']
    expect(
      actions.addProducts(products)
    ).toEqual(
      { type: ActionTypes.ADD_PRODUCTS, products: products}
    )
  });

  it('addError generates the action of correct type', () => {
    expect(
      actions.addError()
    ).toEqual(
      { type: ActionTypes.ADD_ERROR }
    )
  });
})