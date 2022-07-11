import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

//* config for the persistor
const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

//*we are using the persisted reducer from the redux-persist library
const persistedReducer = persistReducer(persistConfig, reducer)

//! this can't be used as next is server generated and localstorage is client side
// const cartItemsFromStorage = getFromStorage('cartItems')
//   ? JSON.parse(getFromStorage('cartItems'))
//   : []
//* this function can be use but only in components to access the localstorage
// const getFromStorage = (key) => {
//   if (typeof window !== 'undefined') {
//     window.localStorage.getItem(key)
//   }
// }
const initialState = {}
export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)
