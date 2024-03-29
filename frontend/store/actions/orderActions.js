import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_CREATE_REQUEST' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config
    )

    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    )

    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PAY_REQUEST' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_MY_LIST_REQUEST' })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/myorders`,
      config
    )
    console.log(data, 'data')
    dispatch({ type: 'ORDER_MY_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDER_MY_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
