const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const tasks = require('./data/tasks')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

const { User } = require('./data/users')

const app = express()
const PORT = process.env.PORT || 5000

env.config()
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
