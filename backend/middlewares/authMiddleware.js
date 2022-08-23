import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
  let token
  const authT = req.headers.authorization
  if (authT && authT.startsWith('Bearer')) {
    try {
      token = authT.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (err) {
      res.status(401)
      throw new Error('Unauthorized, token is invalid')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized, token is missing')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Unauthorized, user is not an admin')
  }
}
export { protect, admin }
