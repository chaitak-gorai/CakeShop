import Link from 'next/link';
import React from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../../components/Rating';
import products from '../../products';

const ProductScreen = ({ product }) => {
  return (
    <>
      <Link href='/'>
        <Button className='btn btn-dark my-3'>Go Back</Button>
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid alt={product.name} />
        </Col>
        <Col md={6}>
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
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
          <Col md={3}>
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
                <ListGroupItem>
                  <Button
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
        </Col>
      </Row>
    </>
  );
};
// it estimates the no of path or static files next has to make for this page
export const getStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: {
      id: product._id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
// it gets the data for the path and renders the page
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const product = products.find((product) => product._id == id);

  return {
    props: {
      product,
    },
  };
};
export default ProductScreen;
