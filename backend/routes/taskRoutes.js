const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')

const router = express.Router()
const {
  getTasks,
  getAll,
  getTaskById,
  addTask,
  updateTask,
} = require('../controllers/taskController.js')

router.route('/:id').get(protect, getTaskById)
router.route('/').get(protect, getAll) //getTasks)
router.route('/addTask').post(protect, addTask)
router.route('/updateTask').post(protect, updateTask)
module.exports = router
