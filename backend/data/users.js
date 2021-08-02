const bcrypt = require('bcryptjs')

class User {
  constructor() {
    this.data = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
      },
      {
        id: 3,
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
      },
      {
        id: 4,
        name: 'Jane Doe',
        email: '1',
        password: bcrypt.hashSync('1', 10),
      },
    ]
    this.matchPassword = this.matchPassword.bind(this)
    this.findOne = this.findOne.bind(this)
    this.findById = this.findById.bind(this)
  }

  matchPassword = async function (enteredPassword, cryptPassword) {
    return await bcrypt.compare(enteredPassword, cryptPassword)
  }
  findOne(filds) {
    return this.data.find((item) => {
      for (const key in filds) {
        if (Object.hasOwnProperty.call(filds, key)) {
          if (filds[key] !== item[key]) {
            return false
          }
          return true
        }
      }
    })
  }

  findById(id) {
    return this.data.find((item) => item.id == id)
  }
}

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    id: 4,
    name: 'Jane Doe',
    email: '1',
    password: bcrypt.hashSync('1', 10),
  },
]

matchPassword = async function (enteredPassword, cryptPassword) {
  return await bcrypt.compare(enteredPassword, cryptPassword)
}

module.exports = { users, matchPassword, User: new User() }
