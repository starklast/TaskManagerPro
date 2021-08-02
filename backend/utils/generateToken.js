const jwt = require('jsonwebtoken')

const generateToken = (data) => {
  return jwt.sign({ ...data }, process.env.JWT_SECRET)
}

const generateAccessToken = (data) => {
  return generateToken({ ...data, exp: Math.floor(Date.now() / 1000) + 60 })
}

const generateRefreshToken = (data) => {
  return generateToken({
    ...data,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  })
}

module.exports = { generateAccessToken, generateRefreshToken }
