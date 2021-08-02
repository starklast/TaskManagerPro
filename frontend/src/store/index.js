import toDoList from './toDoList'
import users from './users'
import currentUser from './currentUser'

class RootStore {
  constructor() {
    this.storage = localStorage

    this.toDoList = new toDoList(this)
    this.users = new users(this)
    this.currentUser = new currentUser(this)
  }
}

export default new RootStore()
