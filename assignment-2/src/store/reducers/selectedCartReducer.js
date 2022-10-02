const initState = {
  product: {},
}
export const SELECTED_PRODUCT_CART = 'product/cart/selected/productId'
export const selectedReducer = (state = initState, action) => {
  switch (action.type) {
    case SELECTED_PRODUCT_CART:
      return {
        ...state,
        product: action.payload.product,
      }
    default:
      return state
  }
}
