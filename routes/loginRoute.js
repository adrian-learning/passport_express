const express = require('express')
const router = express.Router()
const GetLoginController = require('./controllers/getControllers')
const PostLoginController = require('./controllers/postControllers')


router.get('/', GetLoginController.getFormLogin)

router.post('/', PostLoginController.postLogin)


module.exports = router