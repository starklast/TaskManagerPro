const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { User } = require('../data/users')

const protect = asyncHandler(async (req, res, next) => {
  let token
  console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)
      req.user = await User.findById(decoded.id)

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
