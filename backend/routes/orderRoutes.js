import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { requestInfo } from '../middlewares/requestInfo.js'

const router = express.Router()
router.post('/', requestInfo, protect, addOrderItems)
router.get('/:id', requestInfo, protect, getOrderById)
router.put('/:id/pay', requestInfo, protect, updateOrderToPaid)
export default router
