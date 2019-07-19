module.exports = {
    PORT: process.env.PORT || 3000,
    tokenSecret: process.env.TOKEN_SECRET || 'secret',
    jwtExpiryTime: '1 day',
    i18n: {
        locales:['en'],
        updateFiles: false,
        directory: __dirname + '/locales'
    },
    mailerSettings: {
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT || 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    },
    fromEmail: process.env.FROM_EMAIL
}