const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


const initialize = (passport) => {

    const autenticar = async (user, password, done) => {
        console.log(user, password)
        if (!user || !password) return done(null, false, { message: 'Informações incorretas!' })

        const usr = dbconnection.getUserByName()
        console.log('User: ', usr)

        if (usr) {
            if (await bcrypt.compare(password, getUserPassword(usr.id))) {
                console.log('Comparou sim')
                return done(null, usr)
            }
            else return done(null, false, { message: 'Senha Incorreta' })
        }

        
    }

    passport.use(new LocalStrategy({ usernameField: 'user', passwordField: 'pass' }, autenticar))
    passport.serializeUser((usr, done) => done(null, usr.id))
    passport.deserializeUser((id, done) => {
        return done(null, id)
    })
}

const checkAutenticated = (passport) => (req, res, next) => {

    if (req.isAuthenticated()) return next()

    res.redirect('/login')
}

module.exports = {
    initialize,
    checkAutenticated
}