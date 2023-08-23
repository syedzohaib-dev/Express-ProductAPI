const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.SERVER_PORT
const cors = require('cors')
// const path = require('path')

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

app.listen(port, () => {
  console.log(`Example app listening on portnpm  ${port}`)
})