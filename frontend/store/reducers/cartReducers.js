export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload
      const exist = state.cartItems.find((x) => x.product === item.product)
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exist.product ? item : x
          ),
        }
      } else {
      }
      return { ...state, cartItems: [...state.cartItems, item] }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default:
      return state
  }
}
