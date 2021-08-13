module.exports = class UserDto {
  email
  id
  isActivated

  constructor(model) {
    this.email = model && model.email
    this.name = model && model.email
    this.id = model && model._id
    this.key = model && model.key
    this.isActivated = model && model.isActivated
  }
}
