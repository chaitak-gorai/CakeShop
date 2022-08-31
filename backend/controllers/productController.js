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

//@desc delete single product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ msg: 'Product removed' })
    console.log('Product deleted '.green.inverse)
  } else {
    res.status(404)
    throw new Error('Product not found')
    console.log('Product not found'.red.inverse)
  }
})

//@desc create a product
//@route POST /api/products/
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: ' Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
  console.log('Product created'.green.inverse)
})

//@desc Update a product
//@route PUT /api/products/
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, brand, description, image, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.category = category
    product.brand = brand
    product.description = description
    product.image = image
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
    console.log('Product Updated'.green.inverse)
  } else {
    res.status(404)
    throw new Error('Product not found')
    console.log('Product not found'.red.inverse)
  }
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
