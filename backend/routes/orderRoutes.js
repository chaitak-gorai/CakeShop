import { addOrderItems } from '../controllers/orderController.js'
import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { requestInfo } from '../middlewares/requestInfo.js'

const router = express.Router()
router.post('/', requestInfo, protect, addOrderItems)

export default router
