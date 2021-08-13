const asyncHandler = require('express-async-handler')
const userService = require('../service/userService')

class UsersController {
  // @desc    Auth user & get token
  // @route   POST /api/users/login
  // @access  Public

  getAll = asyncHandler(async (req, res, next) => {
    try {
      const usersData = await userService.getAll()
      return res.json(usersData)
    } catch (e) {
      next(e)
    }
  })
  // @desc    get task by id
  // @route   get /api/task/:id
  // @access  Private
  getUserById = asyncHandler(async (req, res) => {
    const data = await userService.getById(req.params.id)
    res.json(data)
  })
}
module.exports = new UsersController()
