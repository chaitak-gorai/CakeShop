import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty,
    },
  })
}

export const removeFromCart = (id) => (dispotch) => {
  dispotch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  })
}
