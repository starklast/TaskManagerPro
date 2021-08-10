const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const tasks = require('./data/tasks')
const authRoutes = require('./routes/authRoutes')
const usersRoutes = require('./routes/usersRoutes')
const taskRoutes = require('./routes/taskRoutes')
const errorMiddleware = require('./middleware/error-middleware')
const { User } = require('./data/users')

const app = express()
const PORT = process.env.PORT || 5000

env.config()
app.use(express.json())
app.use(cookieParser())
/* app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
) */
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use(errorMiddleware)

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
