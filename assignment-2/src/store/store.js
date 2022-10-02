import { createStore, combineReducers } from 'redux'
import { cartReducer } from './reducers/cartReducer'
import { productReducer } from './reducers/productReducer'
import { selectedReducer } from './reducers/selectedCartReducer'
const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  selectedProduct: selectedReducer,
})

const store = createStore(rootReducer)
export default store
