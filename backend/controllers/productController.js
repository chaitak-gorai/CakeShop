import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
//@desc fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
  console.log('Fetched all products'.green.inverse)
})

//@desc fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
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

export { getProducts, getProductById }
