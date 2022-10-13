const getFormLogin = (req, res) => {
    res.render('login.ejs')
}

const getHome = (req, res) => {
    res.render('index.ejs')
}


module.exports = {
    getFormLogin,
    getHome
}