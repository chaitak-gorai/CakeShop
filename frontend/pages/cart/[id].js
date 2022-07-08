import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/actions/cartActions'

const Cart = () => {
  const router = useRouter()
  const { id } = router.query
  const { qty } = router.query
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [id, qty, dispatch])
  return (
    <div>
      Cart {id}
      {qty}
    </div>
  )
}

export default Cart
