const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api/products', require('./routes/products'))
app.use(require('./middleware/errorHandler'))

app.get('/', (req, res) => {
  res.json({ message: 'Product Manager API is running 🚀' })
})

module.exports = app