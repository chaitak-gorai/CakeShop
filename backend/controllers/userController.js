import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import jwt from 'jsonwebtoken'

//@desc Create a new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const user = await User.create({ name, email, password })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('User not created, Invalid user data')
    }

    res.status(201).json({
      success: true,
      data: user,
      token,
      message: 'User created successfully',
    })
  }
})

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  console.log('POST /api/users/login'.white.inverse)
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    console.log('User not found'.red.inverse)
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    console.log('Incorrect password'.red.inverse)
    return res.status(401).json({
      success: false,
      message: 'Incorrect password',
    })
  } else {
    console.log('User authenticated'.green.inverse)
    return res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
    console.log('Fetched user profile'.green.inverse)
  } else {
    res.status(404)
    throw new Error('User not found, Invalid user data')
  }
})
export { authUser, getProfile, registerUser }
