const asyncHandler = require('express-async-handler')
const userService = require('../service/user-service')
const { validationResult } = require('express-validator')

const { User, matchPassword } = require('../data/users')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken.js')

class UserController {
  // @desc    Auth user & get token
  // @route   POST /api/users/login
  // @access  Public
  authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //const user = users.find((item) => item.email == email)
    const user = User.findOne({ email })

    if (user && (await matchPassword(password, user.password))) {
      const payloadToken = {
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,

        id: user.id,
        isAdmin: user.isAdmin,
      }

      res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        tokens: {
          access: generateAccessToken(payloadToken),
          refresh: generateRefreshToken(payloadToken),
        },
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

  // @desc    get tokens
  // @route   POST /api/users/refreshToken
  // @access  Public
  refreshToken = asyncHandler(async (req, res) => {
    const user = req.user

    const payloadToken = {
      id: user.id,
      isAdmin: user.isAdmin,
    }

    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      tokens: {
        access: generateAccessToken(payloadToken),
        refresh: generateRefreshToken(payloadToken),
      },
    })
  })

  // @desc    Register a new user
  // @route   POST /api/users
  // @access  Public
  registerUser = asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new Error('Ошибка при валидации', errors.array())
      }
      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  })

  // @desc    Get all users
  // @route   GET /api/users
  // @access
  getUsers = asyncHandler(async (req, res) => {
    const resUsers = User.data.map((item) => {
      return { id: item.id, name: item.name, email: item.email }
    })
    res.json(resUsers)
  })
}
module.exports = new UserController()
