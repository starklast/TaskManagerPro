const UserModel = require('../models/userModel')
const TaskModel = require('../models/taskModel')
const TaskDto = require('../dtos/taskDto')
const uuid = require('uuid')
const asyncHandler = require('express-async-handler')

class TaskService {
  constructor() {
    this.getMaxKey().then((maxKey) => {
      this.getID = this.genID(++maxKey)
    })
  }
  *genID(from) {
    while (true) {
      yield from++
    }
  }
  getMaxKey = asyncHandler(async () => {
    const tasks = await TaskModel.find().sort({ key: -1 })
    return tasks.length > 0 ? tasks[0].key : 1
  })

  getAll = asyncHandler(async () => {
    const tasks = await TaskModel.find()
      .populate('created_by', '_id email')
      .populate('responsible_id', '_id email')
    //console.log(tasks)
    return tasks.map((item) => new TaskDto(item))
  })

  getById = asyncHandler(async (id) => {
    const task = await TaskModel.findById(id)
      .populate('created_by', '_id email')
      .populate('responsible_id', '_id email')
    return new TaskDto(task)
  })

  addTask = asyncHandler(async (data) => {
    const user = await TaskModel.create({
      ...data,
      key: this.getID.next().value,
    })
  })
  updateTask = asyncHandler(async (data) => {
    console.log(data['id'])
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (typeof data[key] == 'object') {
          data[key] = data[key] && data[key].id
        }
      }
    }
    return await TaskModel.updateOne({ _id: data['id'] }, data)
    const task = await TaskModel.findById(data['id'])
    console.log(task)
    if (task) {
      for (const key in data) {
        console.log(Object.hasOwnProperty.call(task, key))
        if (
          Object.hasOwnProperty.call(data, key) &&
          Object.hasOwnProperty.call(task, key)
        ) {
          task[key] = data[key]
        }
      }
      return task.save()
    }
  })
}
module.exports = new TaskService()
