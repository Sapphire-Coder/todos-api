require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Environment Variables (getting ready for Heroku)
const app = express()
const db = mongoose.connection
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({ extended: false })) // extended: false - does not allow nested objects in query strings
app.use(express.json()) // use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html
app.use(cors())

// Routes
const todosController = require('./controllers/todos')
app.use('/todos', todosController)

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
    console.log(`MongoDB connection established`)
})

// Error / Disconnection
db.on('error', err => console.log(`${err.message} is MongoDB not running?`))
db.on('disconnected', () => console.log('mongo disconnected'))

app.listen(PORT, () => {console.log(`Let's get things done on port ${PORT}`)})