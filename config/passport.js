const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtConfig = require('../config/jwt-config')
const dbconnection = require('../utils/dbconnection')

const cookieExtractor = (req) => req.cookies ? req.cookies['jwt'] : null

const initialize = (passport) => {
    let opts = {}
    opts.jwtFromRequest = cookieExtractor
    opts.secretOrKey = jwtConfig.jwt.secret

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const user = dbconnection.getUserById(jwt_payload.id)
        //console.log(jwt_payload)
        const { expiration } = jwt_payload

        if (Date.now() > expiration) {
            done('Unauthorized', false)
        }

        if (user) done(null, user)
        else done(null, false)
    }));
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) => done(null, dbconnection.getUserById(id)))
}


module.exports = {
    initialize
}