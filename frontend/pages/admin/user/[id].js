import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FormContainer from '../../../components/FormContainer'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { getUserDetails, updateUser } from '../../../store/actions/userActions'

const UserEdit = () => {
  const router = useRouter()
  const userId = router.query.id
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [isAdmin, setIsAdmin] = React.useState(false)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector((state) => state.updateUser)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: 'USER_UPDATE_RESET' })
      router.push('/admin/users')
    } else {
      if (!user?.name || user?._id != userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [userId, user, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    //
  }
  return (
    <>
      <Link href='/admin/users' className='btn btn-light my-3'>
        GO Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin?'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEdit
