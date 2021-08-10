const asyncHandler = require('express-async-handler')
const userService = require('../service/userService')
const { validationResult } = require('express-validator')

const { User, matchPassword } = require('../data/users')

addCookie = (res, userData) => {
  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: process.env.JWT_REFRESH_TIME * 1000,
    httpOnly: true,
    path: '/api/auth',
  })
  delete userData.refreshToken
}

class AuthController {
  // @desc    Auth user & get token
  // @route   POST /api/users/login
  // @access  Public

  login = asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      addCookie(res, userData)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  })

  // @desc    get tokens
  // @route   POST /api/users/refreshToken
  // @access  Public

  refreshToken = asyncHandler(async (req, res, next) => {
    try {
      console.log('refresh token')
      const { refreshToken } = req.cookies
      console.log(refreshToken)
      const userData = await userService.refresh(refreshToken)
      console.log('refresh done')

      addCookie(res, userData)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
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
      addCookie(res, userData)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  })

  logout = asyncHandler(async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken)
    return token
  })
}
module.exports = new AuthController()
