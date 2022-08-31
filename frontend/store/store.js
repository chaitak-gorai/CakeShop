import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  deleteUser,
  getUsers,
  updateUser,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from './reducers/orderReducers'
import { getAllUsers } from './actions/userActions'

//* config for the persistor
const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  getUsers: getUsers,
  deleteUser: deleteUser,
  updateUser: updateUser,
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
