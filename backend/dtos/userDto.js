module.exports = class UserDto {
  email
  id
  isActivated

  constructor(model) {
    this.email = model.email
    this.name = model.email
    this.id = model._id
    this.key = model.key
    this.isActivated = model.isActivated
  }
}
