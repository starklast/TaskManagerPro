const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.get('/getAll', protect, usersController.getAll)
router.get('/get/:count', protect, usersController.getUsers)
router.get(
  '/getFiltered/:count&&:filter',
  protect,
  usersController.getFilteredUsers
)
//router.get('/:id', protect, usersController.getTaskById)
router.route('/:id').get(protect, usersController.getUserById)
//router.route('/:id').get('/:id', protect, usersController.getAll)

module.exports = router
