const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const dbconnection = require('../utils/dbconnection')


const initialize = (passport) => {

    const autenticar = async (user, password, done) => {
        if (!user || !password) return done(null, false, { message: 'Informações incorretas!' })

        const usr = dbconnection.getUserByName(user)

        if (usr != null || usr != undefined) {
            const hash = await dbconnection.getUserPassword(usr.id)
            
            if (await bcrypt.compare(password, hash)) {
                console.log('Comparou sim')
                return done(null, usr)
            }
            else {
                console.log('falhou senha')
                return done(null, false, { message: 'Senha Incorreta' })
            }
        }

        return done(null, false, { message: 'Usuario não existe!' })
    }

    passport.use(new LocalStrategy({ usernameField: 'user', passwordField: 'pass' }, autenticar))
    passport.serializeUser((usr, done) => done(null, usr.id))
    passport.deserializeUser((id, done) => {
        return done(null, dbconnection.getUserById(id))
    })
}

const checkAutenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

const checkIsNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = {
    initialize,
    checkAutenticated,
    checkIsNotAuthenticated
}