import { makeAutoObservable, runInAction } from 'mobx'
import 'babel-polyfill'
import { ID, NAME, REFTYPEUSER, EMAIL } from '~/common/constant'
import { doLogin, registration } from '~/api/server'
export default class {
  constructor(rootStore) {
    this.userInfo = {}
    this.error = ''

    this.loading = false
    makeAutoObservable(this)

    this.rootStore = rootStore
    this.storage = this.rootStore.storage
  }
  setData(data) {
    this.userInfo = data?.data?.user
    this.error = data?.error
    this.loading = false
    console.log('get data from server')
  }
  logout() {
    this.userInfo = {}
    localStorage.clear()
  }
  login({ login, password }) {
    this.loading = true
    doLogin({ login, password }).then((data) => {
      this.setData(data)
      this.rootStore.updateData()
      //callback()
      //this.rootStore.toDoList.updateData()
    })
  }
  async registration(name, email, password) {
    try {
      const response = await registration(name, email, password)
      const { userInfo } = { ...response }
      this.setData(userInfo)
      this.rootStore.updateData()
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }
}
