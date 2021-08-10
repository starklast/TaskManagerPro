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
}
module.exports = new UsersController()
