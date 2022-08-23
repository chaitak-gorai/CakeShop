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

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      success: true,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
    console.log('Updated user profile'.green.inverse)
  } else {
    res.status(404)
    throw new Error('User not found, Invalid user data')
  }
})

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (users) {
    res.json(users)
    console.log('Fetched all users '.green.inverse)
  } else {
    res.status(404)
    throw new Error('Users not found, Invalid user data')
  }
})

//@desc Delete User
//@route GET /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()

    res.json({ message: 'User deleted successfully' })
    console.log('Fetched all users '.green.inverse)
  } else {
    res.status(404)
    throw new Error('Users not found, Invalid user data')
  }
})

//@desc Get all users
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
    console.log('User Found '.green.inverse)
  } else {
    res.status(404)
    throw new Error('Users not found, Invalid user data')
  }
})

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save()
    res.json({
      success: true,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
    console.log('Updated user profile'.green.inverse)
  } else {
    res.status(404)
    throw new Error('User not found, Invalid user data')
  }
})
export {
  authUser,
  getProfile,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
