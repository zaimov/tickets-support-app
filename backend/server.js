const express = require('express')
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

const app = express()

// set body parser middleware to read raw json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
