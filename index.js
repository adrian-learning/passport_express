require('dotenv').config()

const express = require('express')
const passport = require('passport')
const cookieParser = require("cookie-parser")

const session = require('express-session')
const app = express()
const flash = require('express-flash')
const passportConfig = require('./config/passport')

const loginRoute = require('./routes/loginRoute')

passportConfig.initialize(passport)


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(cookieParser())
// app.use(passport.session())
//app.use(flash())

//Rotas
app.use('/login', loginRoute)

//Home
app.get('/', (req, res) => {
    console.log('User é:', req.body)
    
    //res.render('index.ejs', { user: req.user })
})


app.post('/logout', (req, res) => {
    req.logOut((err) => console.log(err))
    res.redirect('/login')
    
})


app.listen(4000, () => console.log('Server Listening...'))