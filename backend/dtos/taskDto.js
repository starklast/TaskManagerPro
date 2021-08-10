module.exports = class TaskDto {
  constructor(model) {
    this.id = model._id
    this.key = model.key
    this.parent_id = model.parent_id
    this.title = model.title
    this.description = model.description
    this.prioritY = model.prioritY
    this.status = model.status
    this.created_date = model.created_date
    this.created_by = model.created_by
    this.responsible_id = model.responsible_id
  }
}
