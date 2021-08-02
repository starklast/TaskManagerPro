const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const userController = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').post(userController.registerUser).get(userController.getUsers)
router.post('/login', userController.authUser)
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registerUser
)

router.post('/refreshToken', protect, userController.refreshToken)

module.exports = router
