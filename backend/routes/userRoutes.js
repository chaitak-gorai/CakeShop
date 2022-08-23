import {
  authUser,
  registerUser,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js'
import { requestInfo } from '../middlewares/requestInfo.js'

const router = express.Router()
router.post('/', requestInfo, registerUser)
router.get('/', requestInfo, protect, admin, getUsers)
router.post('/login', requestInfo, authUser)
router.route('/profile').get(requestInfo, protect, getProfile)
router.route('/profile').put(requestInfo, protect, updateProfile)
router
  .route('/:id')
  .delete(requestInfo, protect, admin, deleteUser)
  .get(requestInfo, protect, admin, getUserById)
  .put(requestInfo, protect, admin, updateUser)

export default router
