const dbconnection = require('../../utils/dbconnection')

const bcrypt = require('bcrypt')


const postLogin = (passport) => (req, res) => {
    console.log('Autenticando')
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
}

module.exports = {
    postLogin
}