const dbconnection = require('../../utils/dbconnection')

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const jwtConfig = require('../../config/jwt-config')


const postLogin = async (req, res) => {
    const user = req.body.user
    const pass = req.body.pass
    console.log(req.body)

    const usr = dbconnection.getUserByName(user)

    if (usr != null || usr != undefined) {
        const hash = await dbconnection.getUserPassword(usr.id)

        if (await bcrypt.compare(pass, hash)) {
            console.log('Comparou sim')
            const token = jwt.sign(usr, jwtConfig.jwt.secret, jwtConfig.jwt.options)

            res.cookie('jwt', token, jwtConfig.jwt.cookie).status(200).redirect('/')
        }
        else {
            console.log('falhou senha')
            req.flash('message', 'Senha incorreta')
            res.render('login.ejs',{
                status: 'failed',
                message: req.flash('Senha incorreta')
            })
        }
    }

    else res.render('login.ejs',{
        status: 'failed',
        message: 'Usuario não existe'
    })
}

module.exports = {
    postLogin
}