import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import os from 'os'
import compression from 'compression'
import path from 'path'
const __dirname = path.resolve()

import { PORT } from './src/config/keys.js'

let userName = os.userInfo().username
console.log(`Hello ${userName}`)
const app = express()

import dbConnection from './src/config/dbConnect.js'
import authRouter from './src/router/auth.routers.js'
import expensesRouter from './src/router/expenses.route.js'

const port = PORT || 4000

// connection to database
dbConnection()

// setting
app.use(express.static(`${__dirname}/assets`))
app.use(compression()) // сжатие gzip уменьшает размер передаваемых данных любого формата
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.use('/api', authRouter)
app.use('/api', expensesRouter)

// Listen Port
app.listen(port || 4000, () => console.log(`PORT listen http://localhost:${port}`))
