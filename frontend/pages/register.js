import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../store/actions/userActions'

const Register = () => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    //
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(email, name, password, confirmPassword))
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account ? <Link href='/login'>Log In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
