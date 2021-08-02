const UserModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    //const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      password: hashPassword,
    })
    //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    //const userDto = new UserDto(user); // id, email, isActivated
    //const tokens = tokenService.generateTokens({...userDto});
    //await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user }
  }
}

module.exports = new UserService()
