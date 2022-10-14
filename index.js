require('dotenv').config()

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const app = express()
const flash = require('express-flash')
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
app.use(flash())

//Rotas
app.use('/login', loginRoute(passport))

//Home
app.get('/', passportInitialize.checkAutenticated, (req, res) => {
    res.render('index.ejs', { user: req.user })
})

app.post('/logout', (req, res) => {
    req.logOut((err) => console.log(err))
    res.redirect('/login')
})


app.listen(4000, () => console.log('Server Listening...'))