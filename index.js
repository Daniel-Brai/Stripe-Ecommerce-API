// Depenencies
const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./connection/connectDB')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const stripeRoutes = require('./routes/stripeRoutes')

// loading env variables 
dotenv.config({path: './env'})

// Initializing the server app
const app = express()

// Connect to DB 
connectDB()

// app utilities
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/user', stripeRoutes)

// Sever setup
const PORT = process.env.PORT || 5500
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}...`)
})