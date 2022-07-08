import Link from 'next/link'
import React, { useEffect } from 'react'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import Rating from '../../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  listProducts,
} from '../../store/actions/productActions'
import { useRouter } from 'next/router'
import Loader from '../../components/loader'
import Message from '../../components/message'

const ProductScreen = () => {
  const [qty, setQty] = React.useState(1)
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (id) {
      dispatch(listProductDetails(id))
    }
  }, [dispatch, id])

  const addToCartHandler = () => {
    router.push(`/cart/${id}?qty=${qty}`)
  }
  return (
    <>
      <Link href='/'>
        <Button className='btn btn-dark my-3'>Go Back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}
// export const getServerSideProps = async (ctx) => {
//   const { id } = ctx.params
//   console.log(id)
// }
// it estimates the no of path or static files next has to make for this page
// export const getStaticPaths = async () => {
//   useEffect(() => {
//     const dispatch = useDispatch()
//     dispatch(listProducts())
//   })

//   const productList = useSelector((state) => state.productList)
//   const { products } = productList
//   const paths = products.map((product) => ({
//     params: {
//       id: product._id,
//     },
//   }))
//   return {
//     paths,
//     fallback: false,
//   }
// }
// // it gets the data for the path and renders the page
// export const getStaticProps = async (context) => {
//   const id = context.params.id

//   useEffect(() => {
//     const dispatch = useDispatch()
//     dispatch(listProducts())
//   })

//   const productList = useSelector((state) => state.productList)
//   const { products } = productList
//   const product = products.find((product) => product._id == id)

//   return {
//     props: {
//       product,
//     },
//   }
// }
export default ProductScreen
