import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Row, Table, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../../store/actions/productActions'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'

const Products = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const router = useRouter()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate
  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' })
    if (!userInfo?.isAdmin) {
      router.push('/login')
    }
    if (successCreate) {
      router.push(`/admin/products/${createdProduct._id}`)
    } else {
      dispatch(listProducts())
    }
  }, [userInfo, successDelete, successCreate, createdProduct])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      //   diatch(deleteUserData(id))

      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fa fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link href={`/admin/products/${product._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash-alt'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Products
