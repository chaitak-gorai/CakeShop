import {
  authUser,
  registerUser,
  getProfile,
} from '../controllers/userController.js'
import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { requestInfo } from '../middlewares/requestInfo.js'
const router = express.Router()
router.post('/', requestInfo, registerUser)
router.post('/login', requestInfo, authUser)
router.route('/profile').get(requestInfo, protect, getProfile)

export default router
