import express from 'express'
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'
import { requestInfo } from '../middlewares/requestInfo.js'
const router = express.Router()

router.get('/', requestInfo, getProducts)
router.get('/:id', requestInfo, getProductById)

export default router
