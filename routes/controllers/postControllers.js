const dbconnection = require('../../utils/dbconnection')

const bcrypt = require('bcrypt')


const postLogin = (passport) => 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })

module.exports = {
    postLogin
}