const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const authController = require('../controllers/authController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.post('/login', authController.login)
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.registerUser
)

router.get('/refresh', authController.refreshToken)

module.exports = router
