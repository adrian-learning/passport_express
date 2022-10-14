const express = require('express')
const { checkIsNotAuthenticated } = require('../config/passport')
const router = express.Router()
const GetLoginController = require('./controllers/getControllers')
const PostLoginController = require('./controllers/postControllers')
const passportConfig = require('../config/passport')


router.get('/', GetLoginController.getFormLogin)

router.post('/', PostLoginController.postLogin)


module.exports = router