import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import { requestInfo } from '../middlewares/requestInfo.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', requestInfo, getProducts)
router.post('/', requestInfo, protect, admin, createProduct)
router.get('/:id', requestInfo, getProductById)
router.delete('/:id', requestInfo, protect, admin, deleteProduct)
router.route('/:id').put(requestInfo, protect, admin, updateProduct)
export default router
