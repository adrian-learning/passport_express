const express = require('express')
const { checkAutenticated } = require('../config/passport')
const router = express.Router()
const GetLoginController = require('./controllers/getControllers')
const PostLoginController = require('./controllers/postControllers')


const routerPassaport = (passport) => {

    router.get('/', GetLoginController.getFormLogin)

    router.post('/', (req, res, next) => {
        console.log('Post Middle')
        next()
    }, PostLoginController.postLogin(passport))

    return router
}

module.exports = routerPassaport