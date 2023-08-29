const express = require('express')
require('dotenv').config()
const app = express()
const db = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRoute')


const port = process.env.PORT || 8080

db()

// middlewares
app.use(express.json())
// cookie parser
app.use(cookieParser())

// user route
app.use('/api/users', userRouter)

// test route
app.get('/test', (req, res) => {
    res.send('hello exp')
})

// error handler middleware
app.use(errorHandler)


app.listen(port, () => {
    console.log('server started listening on port: ', port);
})