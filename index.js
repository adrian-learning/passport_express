require('dotenv').config()

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const app = express()
const passportInitialize = require('./config/passport')

const loginRoute = require('./routes/loginRoute')

passportInitialize.initialize(passport)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



app.use('/login', loginRoute(passport))

app.get('/', passportInitialize.checkAutenticated, (req, res) => {
    res.send(`Home Page of ${req.usr.name}`)
})





app.listen(4000, () => console.log('Server Listening...'))