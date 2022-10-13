const bcrypt = require('bcrypt')

const getUserByName = (name) => {
    if(name == 'teste') return {id:0, name: user, age: 20, color: 'Red'}

    return null
}

const getUserPassword = async (id) => {
    if(id != 0) return null
    
    const pass = 1234
    const passHashed = await bcrypt.hash(pass, process.env.BCRYPT_SALTS)

    return passHashed
}


module.exports = {
    getUserByName
}