import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { getOrderDetails, payOrder } from '../../store/actions/orderActions.js'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'

const orders = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const id = router.query.id
  console.log(router.query.id)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const paypalScript = document.createElement('script')
    //   paypalScript.type = 'text/javascript'
    //   paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   paypalScript.async = true
    //   paypalScript.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(paypalScript)
    // }
    if (!order || successPay) {
      dispatch({ type: 'ORDER_PAY_RESET' })
      dispatch(getOrderDetails(id))
    }
    //  else if (!order.isPaid) {
    //   if (!window.paypal) {
    //     addPayPalScript()
    //   } else {
    //     setSdkReady(true)
    //   }
    // }
  }, [dispatch, id, successPay, order])
  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDeliverd ? (
                <Message variant='success'>
                  Deliverd on {order.deliverdAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Deliverd</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong> Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Summary</h2>
              {order.orderItems.length === 0 ? (
                <Message>No items in order</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            fluid
                            alt={item.name}
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link href={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          {item.qty}X{item.price}=$
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'AZKVfEgx6HciSa53tpfr7CBxN9m3Z-LliIcHqMcC1bfK4_WlTueaiQkKL_eaxobhp9EGRmmVoXDNdeTz',
                      currency: 'USD',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice.toFixed(2),
                              },
                            },
                          ],
                        })
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          dispatch(payOrder(router.query.id, details))
                        })
                      }}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default orders
