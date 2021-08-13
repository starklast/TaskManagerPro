const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const asyncHandler = require('express-async-handler')
const UserDto = require('../dtos/userDto')
const tokenService = require('./tokenService')
const ApiError = require('../exceptions/api-error')

class UserService {
  constructor() {
    this.getMaxKey().then((maxKey) => {
      if (maxKey) {
        this.getID = this.genID(++maxKey)
      } else {
        this.getID = this.genID(1)
      }
    })
  }
  *genID(from) {
    while (true) {
      yield from++
    }
  }
  getMaxKey = asyncHandler(async () => {
    const tasks = await UserModel.find().sort({ key: -1 })
    return tasks.length > 0 ? tasks[0].key : 1
  })
  getAll = asyncHandler(async () => {
    const users = await UserModel.find()
    return users.map((item) => new UserDto(item))
  })

  getById = asyncHandler(async (id) => {
    const user = await UserModel.findById(id)
    return new UserDto(user)
  })

  registration = asyncHandler(async (email, password) => {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    //const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      password: hashPassword,
      key: this.getID.next().value,
    })
    //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user) // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      userDto,
    }
  })

  login = asyncHandler(async (email, password) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Не верный логин или пароль')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Не верный логин или пароль')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  })

  refresh = asyncHandler(async (refreshToken) => {
    if (!refreshToken) {
      throw new Error('Пользователь не авторизован: нет токена')
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw new Error('Пользователь не авторизован: не нашли пользователя')
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  })
}
module.exports = new UserService()
