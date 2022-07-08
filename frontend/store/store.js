import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailReducer,
} from './reducers/productReducers'
import { createWrapper } from 'next-redux-wrapper'
import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
})

const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    window.localStorage.getItem(key)
  }
}
const cartItemsFromStorage = getFromStorage('cartItems')
  ? JSON.parse(getFromStorage('cartItems'))
  : []

const initialState = {
  cart: {
    cartItems: [],
  },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
// const makeStore = () => store

// export const wrapper = createWrapper(makeStore)
export default store
