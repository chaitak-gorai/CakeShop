import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../store/actions/userActions'
import { listMyOrder } from '../store/actions/orderActions'

const Profile = () => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOders, orders } = orderListMy
  console.log(user)
  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrder())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, dispatch, user, userUpdateProfile])
  console.log(orders)
  const submitHandler = (e) => {
    e.preventDefault()
    //
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='c_password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Re-Enter Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : errorOders ? (
          <Message variant='danger'>{errorOders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {' '}
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link href={`/orders/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default Profile
