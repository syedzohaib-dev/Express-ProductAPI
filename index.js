const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.SERVER_PORT
const cors = require('cors')
const path = require('path')


const clientPath = path.join(__dirname, './client/dist')
app.use('/', express.static(clientPath))

app.use(express.json()) // stringify me change karnay k liye ye karyngy json ko
app.use(cors())
// app.use(cors())
// app.use('/', express.static(clientPath))

app.use('/api', require('./API/User/userRouter'))
app.use('/api', require('./API/Category/categoryRouter'));
app.use('/api', require('./API/Brands/brandRoutes'))
app.use('/api', require('./API/Products/productRoutes'))
app.use('/api', require('./API/mailer/router'))
app.use('/api', require('./API/orders/router'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on portnpm  http://localhost:${port}`)
})