module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'SetStrongSecretInDotEnv',
        options: {
            expiresIn: '1m'
        },
        cookie: {
            httpOnly: false,
            secure: false
        }
    }
};