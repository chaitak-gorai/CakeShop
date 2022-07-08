import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

//@desc fetch all products
//@route GET /api/products
//@access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log('GET /api/products'.white.inverse)
    const products = await Product.find({})

    res.json(products)
    console.log('Fetched all products'.green.inverse)
  })
)

//@desc fetch single product
//@route GET /api/products/:id
//@access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log('GET /api/products/:id'.white.inverse)
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
      console.log('Fetched product'.green.inverse)
    } else {
      res.status(404)
      throw new Error('Product not found')
      console.log('Product not found'.red.inverse)
    }
  })
)

export default router
