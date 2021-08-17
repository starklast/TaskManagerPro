const asyncHandler = require('express-async-handler')
const { Tasks } = require('../data/tasks')
const taskService = require('../service/taskService')

// @desc    get all tasks
// @route   get '/api/tasks'
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const data = await taskService.getAll()
  return res.json(data)
  //res.json(Tasks.data)
})
// @desc    get all tasks
// @route   get '/api/tasks'
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  res.json(Tasks.data)
})
// @desc    get task by id
// @route   get /api/task/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const data = await taskService.getById(req.params.id)
  res.json(data)
})

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.body
  const data = await taskService.delete(id)
  res.json(data)
})

// @desc    add new task
// @route   POST '/api/task'
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  console.log(req.user)
  const data = { ...req.body }
  if (!data['created_by'] && req.user) {
    console.log(req.user.id)
    data['created_by'] = req.user
  }
  console.log(data)
  await taskService.addTask(data)
  res.send('ok')
})

// @desc    update  task
// @route   POST '/api/updateTask'
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  let { taskId, fields } = req.body
  console.log(fields)
  //chec correct data

  //save data in database
  taskService.updateTask(fields)
  res.send('ok')
})

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  getAll,
  deleteTask,
}
