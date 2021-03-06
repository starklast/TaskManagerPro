import { makeAutoObservable, runInAction } from 'mobx'
import 'babel-polyfill'
import { taskService } from '~/api/server'

import {
  ID,
  KEY,
  TITLE,
  DESCRIPTION,
  CREATED_DATE,
  CREATED_BY,
  PARENT_ID,
  RESPONSIBLE_ID,
  STATE_IN_PROGRESS,
  STATUS,
  STATE_NEW,
  STATE_COMPLETED,
  SUPPOSEDLY_COMPLETED,
  STATE_DECLINED,
  PRIORITY,
  TASKS,
  USERS,
  REFTYPETASK,
  TYPE_ENUM,
  TYPE_DATETIME,
} from '~/common/constant'
export default class {
  constructor(rootStore) {
    this.taskList = []

    this.state = 'pending'
    this.loading = false
    makeAutoObservable(this)

    this.rootStore = rootStore
    this.storage = this.rootStore.storage
    //this.updateData()
  }

  updateData() {
    this.loadin = true
    taskService.getAllTasks().then((data) => this.setData(data))
  }
  setData(data) {
    data.forEach((item) => {
      if (item.CREATED_DATE) {
        item.CREATED_DATE = new Date(item.CREATED_DATE)
      }
    })
    this.taskList = data
    this.loadin = false
    console.log(data)
  }
  getNewID() {
    return (
      parseInt(
        this.taskList.reduce((max, cur) => (max < cur[ID] ? cur[ID] : max), 0)
      ) + 1
    )
  }
  add(fields) {
    const newTask = {}
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        newTask[key] = fields[key]
      }
    }
    newTask[CREATED_DATE] = new Date()
    newTask[ID] = this.getNewID()
    newTask[STATUS] = STATE_NEW

    if (!newTask[CREATED_BY]) {
      newTask[CREATED_BY] = this.rootStore.currentUser.userInfo.id
      console.log(`CREATED_BY: ${this.rootStore.currentUser.userInfo.id}`)
    }
    //this.taskList.push(newTask)
    taskService.addTask(newTask)
    this.updateData()
  }
  delete(taskId) {
    taskService.deleteTask(taskId)
    //this.taskList.splice(taskId, 1)
  }

  update(taskId, fields) {
    if (!fields[ID] || fields[ID] == '') {
      this.add(fields)
    } else {
      taskService.updateTask({ taskId, fields })
    }
    this.updateData()
  }
  getOrderedFields = () => {
    const orderedFields = []
    const fields = this.getFields()
    orderedFields.push(
      { ...fields[ID], key: ID },
      { ...fields[KEY], key: KEY },
      { ...fields[TITLE], key: TITLE },
      { ...fields[DESCRIPTION], key: DESCRIPTION },
      { ...fields[STATUS], key: STATUS },
      { ...fields[CREATED_DATE], key: CREATED_DATE },
      { ...fields[CREATED_BY], key: CREATED_BY },
      { ...fields[RESPONSIBLE_ID], key: RESPONSIBLE_ID },
      { ...fields[PRIORITY], key: PRIORITY }
    )
    return orderedFields
  }
  getFields = () => {
    const fields = {}
    fields[ID] = {
      title: 'ID',
      type: 'integer',
      primary: true,
      readonly: true,
      visible: false,
    }
    fields[KEY] = {
      title: 'KEY',
      type: 'integer',
      primary: true,
      readonly: true,
      visible: true,
      menu: false,
    }
    fields[PARENT_ID] = {
      title: 'ID ???????????????????????? ????????????',
      type: 'integer',
      referenceType: TASKS,
      default: 0,
      visible: true,
    }
    fields[TITLE] = {
      title: '????????????????',
      type: 'string',
      required: true,
      refitem: true,
      refitemtype: REFTYPETASK,
      visible: true,
    }
    fields[DESCRIPTION] = {
      title: '????????????????',
      type: 'string',
      visible: true,
    }

    fields[PRIORITY] = {
      title: '??????????????????',
      type: TYPE_ENUM,
      values: {
        '2': '??????????????',
        '1': '??????????????',
        '0': '????????????',
      },
      default: 1,
      visible: true,
    }
    fields[STATUS] = {
      title: '????????????',
      type: TYPE_ENUM,
      values: {
        '1': '??????????',
        '2': '???????? ????????????????????',
        '3': '??????????????????????',
        '4': '?????????????? ????????????????',
        '5': '??????????????????',
        '6': '????????????????',
      },
      default: 1,
      visible: true,
    }
    fields[CREATED_BY] = {
      title: '??????????????????????',
      type: 'integer',
      referenceType: USERS,
      required: true,
      visible: true,
    }
    fields[CREATED_DATE] = {
      title: '???????? ????????????????',
      type: TYPE_DATETIME,
      readonly: true,
      visible: true,
    }
    fields[RESPONSIBLE_ID] = {
      title: '??????????????????????',
      type: 'integer',
      referenceType: USERS,
      required: true,
      visible: true,
    }

    return fields
  }
  async get(taskId) {
    ///const taskListItem = { ...this.taskList[taskId] }
    this.loadin = true

    let taskListItem = null
    if (taskId) {
      taskListItem = { ...(await taskService.getTaskById(taskId)) }
    }
    this.loadin = false

    /* const taskListItem = {
      ...this.taskList.find((item) => item[ID] == taskId),
    } */
    if (!taskListItem) {
      taskListItem = {}
    }

    taskListItem.update = (fields) => {
      return this.update(taskId, fields)
    }
    taskListItem.delete = () => this.delete(taskId)

    taskListItem.delegate = (userId) => this.delegate(taskId, userId)

    taskListItem.start = () => this.start(taskId)

    taskListItem.complete = () => this.complete(taskId)

    taskListItem.approve = () => this.approve(taskId)

    taskListItem.deger = () => this.deger(taskId)

    taskListItem.disapprove = () => this.disapprove(taskId)

    taskListItem.getFields = () => this.getFields()

    taskListItem.getOrderedFields = () => this.getOrderedFields()

    return taskListItem
  }
  delegate(taskId, userId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[RESPONSIBLE_ID] = userId
    }
  }
  start(taskId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[STATUS] = STATE_IN_PROGRESS
    }
  }
  complete(taskId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[STATUS] = SUPPOSEDLY_COMPLETED
    }
  }
  approve(taskId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[STATUS] = STATE_COMPLETED
      taskListItem[CLOSED_DATE] = new Data()
    }
  }
  deger(taskId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[STATUS] = STATE_PENDING
    }
  }
  disapprove(taskId) {
    const taskListItem = this.taskList[taskId]
    if (taskListItem) {
      taskListItem[STATUS] = STATE_DECLINED
    }
  }
}
function getDataOfTask(taskList, index) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = index < taskList.length ? taskList[index] : null
      return res(data)
    }, 1000)
  })
}
