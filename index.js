const express = require('express')
const app = express()
require('dotenv').config()
const CategoryRouter = require('./API/Category/Router')

const port = process.env.SERVER_PORT || 3100

app.use(express.json())
app.use('/api', CategoryRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})