const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.get('/getAll', protect, usersController.getAll)

module.exports = router
