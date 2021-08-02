import { makeAutoObservable, runInAction } from 'mobx'
import 'babel-polyfill'
import { ID, NAME, REFTYPEUSER, EMAIL } from '~/common/constant'
import { doLogin } from '~/api/server'
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
    this.userInfo = data
    this.loading = false
    console.log('get data from server')
  }
  logout() {
    this.userInfo = {}
    localStorage.clear()
  }
  login({ login, password }) {
    this.loading = true
    doLogin({ login, password }).then((userInfo) => {
      this.setData(userInfo)

      console.log(this.userInfo)
      this.rootStore.toDoList.updateData()
    })
  }
}
