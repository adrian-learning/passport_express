const bcrypt = require('bcrypt')

const users = [
    {id:0, name: 'teste', age: 20, color: 'Red'},
    {id:1, name: 'try', age: 30, color: 'Yellow'}
]

const getUserByName = (name) => users.find(usr => usr.name === name)
const getUserById = (id) => users.find(usr => usr.id === id)

const getUserPassword = async (id) => {
    if(id != 0) return null
    
    const pass = '1234'
    const passHashed = await bcrypt.hash(pass, parseInt(process.env.BCRYPT_SALTS))
    return passHashed
}


module.exports = {
    getUserByName,
    getUserPassword,
    getUserById
}