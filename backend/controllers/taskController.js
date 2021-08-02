const asyncHandler = require('express-async-handler')
const { Tasks } = require('../data/tasks')
const generateToken = require('../utils/generateToken.js')

// @desc    get all tasks
// @route   get '/api/tasks'
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  res.json(Tasks.data)
})
// @desc    get task by id
// @route   get /api/task/:id
// @access  Private
const getTasksById = asyncHandler(async (req, res) => {
  res.json(Tasks.findOne(req.params.id))
})

// @desc    add new task
// @route   POST '/api/task'
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  Tasks.data.push(req.body)
  res.send('ok')
})

// @desc    update  task
// @route   POST '/api/updateTask'
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  let { taskId, fields } = req.body
  const taskListItem = Tasks.findById(taskId)

  if (!taskListItem) {
    //this.add(fields)
  } else {
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        taskListItem[key] = fields[key]
      }
    }
  }
})

module.exports = { getTasks, getTasksById, addTask, updateTask }
