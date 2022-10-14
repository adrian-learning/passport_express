const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const JwtCookieComboStrategy = require('passport-jwt-cookiecombo')

const bcrypt = require('bcrypt')

const jwtConfig = require('../config/jwt-config')
const dbconnection = require('../utils/dbconnection')

const cookieExtractor = (req) => {
    const token = req.cookies ? req.cookies['jwt'] : null
    
    return token
}

const initialize = (passport) => {
    // let opts = {}
    // opts.jwtFromRequest = cookieExtractor
    // opts.secretOrKey = jwtConfig.jwt.secret

    passport.use(new JwtCookieComboStrategy({
        secretOrPublicKey:jwtConfig.jwt.secret,
        //jwtVerifyOptions: jwtConfig.jwt.options
    }, (payload, done) => {
        console.log('OK')
        const user = dbconnection.getUserById(payload.id)
        console.log(payload)

        if(user) return done(null, user)
        else return done(null, false)
    }))

    // passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //     const user = dbconnection.getUserById(jwt_payload.id)
    //     console.log(jwt_payload)

    //     if(user) done(null, user)
    //     else done(null, false)
    // }));
}

const checkAutenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

const checkIsNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = {
    initialize,
    checkAutenticated,
    checkIsNotAuthenticated
}