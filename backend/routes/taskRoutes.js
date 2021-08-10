const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')

const router = express.Router()
const {
  getTasks,
  getAll,
  getTasksById,
  addTask,
  updateTask,
} = require('../controllers/taskController.js')

router.route('/').get(protect, getAll) //getTasks)
router.route('/getById/:id').get(protect, getTasksById)
router.route('/addTask').post(protect, addTask)
router.route('/updateTask').post(protect, updateTask)
module.exports = router
