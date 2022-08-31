import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FormContainer from '../../../components/FormContainer'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { getUserDetails, updateUser } from '../../../store/actions/userActions'
import {
  listProductDetails,
  updateProduct,
} from '../../../store/actions/productActions'

const ProductEdit = () => {
  const router = useRouter()
  const productId = router.query.id

  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [image, setImage] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [brand, setBrand] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [countInStock, setCountInStock] = React.useState(0)

  const [isAdmin, setIsAdmin] = React.useState(false)

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = productUpdate
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' })
      router.push('/admin/products')
    } else {
      if (!product?.name || product?._id != productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [productId, product, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        brand,
        category,
        countInStock,
      })
    )
  }
  return (
    <>
      <Link href='/admin/products' className='btn btn-light my-3'>
        GO Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
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
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default ProductEdit
