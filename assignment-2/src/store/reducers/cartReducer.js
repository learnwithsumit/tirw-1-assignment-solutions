const initState = {
  products: [],
  totalQty: 0,
  totalPrice: 0,
}
export const CART_ADD_PRODUCT = 'product/cart/add_product'
export const CART_REMOVE_PRODUCT = 'product/cart/remove_product'
export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
        totalQty: action.payload.totalQty,
        totalPrice: action.payload.totalPrice,
      }
    case CART_REMOVE_PRODUCT:
      return {
        ...state,
        products: action.payload.products,
        totalQty: action.payload.totalQty,
        totalPrice: action.payload.totalPrice,
      }
    default:
      return state
  }
}
