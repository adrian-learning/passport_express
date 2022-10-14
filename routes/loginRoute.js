const express = require('express')
const { checkIsNotAuthenticated } = require('../config/passport')
const router = express.Router()
const GetLoginController = require('./controllers/getControllers')
const PostLoginController = require('./controllers/postControllers')
const passportConfig = require('../config/passport')


const routerPassaport = (passport) => {

    router.get('/', checkIsNotAuthenticated, GetLoginController.getFormLogin)

    router.post('/', PostLoginController.postLogin(passport))

    return router
}

module.exports = routerPassaport