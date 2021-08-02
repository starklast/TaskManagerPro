import axios from 'axios'
import jwt from 'jsonwebtoken'

let server = axios.create({
  baseURL: '/api',
})

server.interceptors.request.use(function(request) {
  console.log(request)
  checkToken()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log('request after')
  request.headers.authorization = 'Bearer ' + userInfo.tokens.access
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

export function checkToken() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo)
  if (userInfo && userInfo.tokens) {
    if (!checkTokenExp(userInfo.tokens.access)) {
      console.log('RT-f')
      return refreshAccessToken(userInfo)
    } else return true
  }

  console.log('6-f')
  return false
}

function checkTokenExp(token) {
  if (token) {
    const payload = jwt.decode(token)
    console.log(payload.exp)
    console.log(new Date() / 1000 - 1)
    if (payload.exp > new Date() / 1000 - 1) {
      return true
    }
  }
  return false
}

async function refreshAccessToken(userInfo) {
  console.log('refresh s')
  console.log(checkTokenExp(userInfo.tokens.refresh))
  if (userInfo.tokens.refresh && checkTokenExp(userInfo.tokens.refresh)) {
    console.log('refresh s 2')
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + userInfo.tokens.refresh,
        },
      }

      const { data } = await axios.post('/api/users/refreshToken', {}, config)

      localStorage.setItem('userInfo', JSON.stringify(data))
      console.log('refresh !')
      return true
    } catch (error) {
      console.log('!!!!refresh !')
      return false
    }
  }
  return false
}
//export default server;

export async function getAllTasks() {
  let data = await server.get('/tasks')
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}

export async function addTask(newTask) {
  let data = await server.post('/tasks/addTask', newTask)
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}
export async function updateTask(taskData) {
  let data = await server.post('/tasks/updateTask', taskData)
  if (data.status === 200) {
    return data.data
  } else {
    return []
  }
}

export async function getAllUsers() {
  let data = await axios.get('/api/users')
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

    const { data } = await axios.post(
      '/api/users/login',
      {
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
