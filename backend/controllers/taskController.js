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
const getTasksById = asyncHandler(async (req, res) => {
  res.json(Tasks.findOne(req.params.id))
})

// @desc    add new task
// @route   POST '/api/task'
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  Tasks.data.push(req.body)
  await taskService.addTask(req.body)
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

module.exports = { getTasks, getTasksById, addTask, updateTask, getAll }
