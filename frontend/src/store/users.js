import { makeAutoObservable, runInAction } from 'mobx'
import 'babel-polyfill'
import { ID, NAME, REFTYPEUSER, EMAIL, KEY } from '~/common/constant'
import { getAllUsers } from '~/api/server'
export default class {
  constructor(rootStore) {
    this.users = []
    this.state = 'pending'
    makeAutoObservable(this)

    this.rootStore = rootStore
    this.storage = this.rootStore.storage
    //this.updateData()
  }
  updateData() {
    getAllUsers().then((data) => {
      this.setData(data)
      console.log(data)
    })
  }
  setData(data) {
    this.users = data
    console.log('get data from server')
  }
  getNewID() {
    return (
      parseInt(
        this.users.reduce((max, cur) => (max < cur[ID] ? cur[ID] : max), 0)
      ) + 1
    )
  }
  add(fields) {
    console.log(fields)
    const newUser = {}
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        newUser[key] = fields[key]
      }
    }
    newUser[ID] = this.getNewID()
    this.users.push(newUser)
  }
  delite(userId) {
    this.users.splice(userId, 1)
  }

  update(userId, fields) {
    const userItem = this.users.find((item) => item[ID] == userId)

    if (!userItem) {
      this.add(fields)
    } else {
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          userItem[key] = fields[key]
        }
      }
    }
  }
  getOrderedFields() {
    const orderedFields = []
    const fields = this.getFields()
    orderedFields.push(
      { ...fields[ID], key: ID },
      { ...fields[KEY], key: KEY },
      { ...fields[NAME], key: NAME },
      { ...fields[EMAIL], key: EMAIL }
    )
    return orderedFields
  }
  getFields() {
    return {
      [ID]: {
        title: 'ID',
        type: 'integer',
        primary: true,
        readonly: true,
        visible: false,
      },
      [KEY]: {
        title: 'ID',
        type: 'integer',
        primary: true,
        readonly: true,
        visible: true,
      },
      [NAME]: {
        title: 'User name',
        type: 'string',
        default: '',
        required: true,
        refitem: true,
        refitemtype: REFTYPEUSER,
        visible: true,
      },
      [EMAIL]: {
        title: 'e-mail',
        type: 'string',
        default: '',
        required: true,
        visible: true,
      },
    }
  }
  get(userId) {
    const userItem = { ...this.users.find((item) => item[ID] == userId) }
    if (userItem) {
      userItem.update = (fields) => this.update(userId, fields)

      userItem.delegate = (userId) => this.delegate(userId, userId)

      userItem.getFields = () => this.getFields()

      userItem.getOrderedFields = () => this.getOrderedFields()

      return userItem
    } else {
      return null
    }
  }
}
