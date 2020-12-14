const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

//Init Middleware
app.use(express.json({ extended: false }))

// app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/members', require('./routes/api/members'))
app.use('/api/packages', require('./routes/api/packages'))
app.use('/api/payments', require('./routes/api/payments'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${5000}`)
})