import Link from 'next/link'
import React from 'react'
import { Nav } from 'react-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item style={{ marginTop: '0.5rem' }}>
        {step1 ? (
          <Link href='/login?redirect=shipping'>
            <p style={{ color: 'orangered', fontWeight: 'bold' }}>Sign In</p>
          </Link>
        ) : (
          <p>Sign In </p>
        )}
      </Nav.Item>

      <Nav.Item style={{ marginTop: '0.5rem' }}>
        {step2 ? (
          <Link href='/shipping'>
            <p style={{ color: 'orangered', fontWeight: 'bold' }}>Shipping</p>
          </Link>
        ) : (
          <p>Shipping </p>
        )}
      </Nav.Item>
      <Nav.Item style={{ marginTop: '0.5rem' }}>
        {step3 ? (
          <Link href='/payment'>
            <p style={{ color: 'orangered', fontWeight: 'bold' }}>Payment</p>
          </Link>
        ) : (
          <p>Payment</p>
        )}
      </Nav.Item>
      <Nav.Item style={{ marginTop: '0.5rem' }}>
        {step4 ? (
          <Nav.Link href='/placeorder'>
            <p style={{ color: 'orangered', fontWeight: 'bold' }}>
              Place Order
            </p>
          </Nav.Link>
        ) : (
          <p>Place Order</p>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
