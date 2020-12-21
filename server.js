const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

connectDB()

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
  }
  
app.use(auth);

//Init Middleware
app.use(express.json({ extended: false }))

// app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/members', require('./routes/api/members'))
app.use('/api/packages', require('./routes/api/packages'))
app.use('/api/payments', require('./routes/api/payments'))

if(process.env.NODE_ENV === 'default') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${5000}`)
})