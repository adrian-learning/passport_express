module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'SetStrongSecretInDotEnv',
        options: {
            expiresIn: '1h'
        },
        cookie: {
            httpOnly: false,
            secure: false
        }
    }
};