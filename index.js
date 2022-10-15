require('dotenv').config()

const express = require('express')
const passport = require('passport')
const cookieParser = require("cookie-parser")

const session = require('express-session')
const app = express()
const flash = require('express-flash')
const passportConfig = require('./config/passport')
const jwtConfig = require('./config/jwt-config')

const loginRoute = require('./routes/loginRoute')

passportConfig.initialize(passport)


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET
}))

app.use(passport.initialize())
app.use(cookieParser())
app.use(passport.session())
app.use(flash())

//Rotas
app.use('/login', loginRoute)

//Home
app.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
    console.log('User é:', req.user)

    res.render('index.ejs', { user: req.user })
})


app.post('/logout', (req, res) => {
    if (req.cookies['jwt']) res.clearCookie('jwt')

    req.logOut((err) => console.log(err))
    res.status(200).redirect('/login')
})


app.listen(4000, () => console.log('Server Listening...'))