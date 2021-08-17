import axios from 'axios'
import jwt from 'jsonwebtoken'
import store from '~/store'

let server = axios.create({
  baseURL: '/api',
})
let baseserver = axios.create({
  baseURL: '/',
})

server.interceptors.request.use(async function(request) {
  console.log(request)
  await tokenService.checkToken()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log('request after')
  //request.headers['Content-Type'] = 'application/json'
  request.headers.authorization = 'Bearer ' + userInfo?.accessToken
  console.log('request')
  return request
})

server.interceptors.response.use(function(response) {
  /*if(typeof response.data !== "object"){
        throw new Error("server did not send json");
    }*/
  console.log('response')
  return response
})

class TokenService {
  async checkToken() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo && userInfo.accessToken) {
      if (!this.checkTokenExp(userInfo.accessToken)) {
        return await this.refreshAccessToken(userInfo)
      } else return true
    }

    return false
  }

  checkTokenExp(token) {
    if (token) {
      const payload = jwt.decode(token)
      if (payload.exp > new Date() / 1000 - 1) {
        return true
      }
    }
    return false
  }

  async refreshAccessToken(userInfo) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await baseserver.get('/api/auth/refresh', {}, config)

      localStorage.setItem('userInfo', JSON.stringify(data))
      store.currentUser.setData({ data })
      return true
    } catch (error) {
      return false
    }
  }
}

export const tokenService = new TokenService()

class TaskServise {
  async getAllTasks() {
    let data = await server.get('/tasks')
    if (data.status === 200) {
      return data.data
    } else {
      return []
    }
  }

  async getTaskById(id) {
    let data = await server.get(`/tasks/${id}`)
    if (data.status === 200) {
      return data.data
    } else {
      return []
    }
  }

  async deleteTask(id) {
    let data = await server.post('/tasks/delete', { id })
    if (data.status === 200) {
      return data.data
    } else {
      return []
    }
  }

  async addTask(newTask) {
    let data = await server.post('/tasks/addTask', newTask)
    if (data.status === 200) {
      return data.data
    } else {
      return []
    }
  }

  async updateTask(taskData) {
    console.log(taskData)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let data = await server.post('/tasks/updateTask', taskData, config)
    if (data.status === 200) {
      return data.data
    } else {
      return []
    }
  }
}

export const taskService = new TaskServise()

export async function getAllUsers() {
  let data = await server.get('/users/getAll')
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}
export async function getUsers(count) {
  let data = await server.get(`/users/get/${count}`)
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}
export async function getFilterUsers(filter, count) {
  let data = await server.get(`/users/getFiltered/${count}&&${filter}`)
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}
export async function getUserById(id) {
  if (!id) {
    return []
  }
  let data = await server.get(`/users/${id}`)
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}

export async function doLogin({ login, password }) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('start getting info')
    console.log({ login, password })

    const { data } = await baseserver.post(
      '/api/auth/login',
      {
        email: login,
        password,
      },
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data))
    return { data, error: '' }
  } catch (error) {
    console.log('error')
    console.log(`error.response ${error.response}`)
    console.log(`error.response.data.message ${error.response.data.message}`)
    console.log(`error.message ${error.message}`)

    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }
  }
}
export async function registration({ name, login, password }) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log('start getting info')
    console.log({ name, login, password })

    const { data } = await baseserver.post(
      '/api/auth/registration',
      {
        name: name,
        email: login,
        password,
      },
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    console.log('error')
    console.log(error)
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
}
