//  Dependencies
const CryptoJS = require('crypto-js')
const dotenv = require('dotenv')

//  read env variables 
dotenv.config({path: './.env'})

const hash = (password) => { 
    return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY)
}

const unhash = (password) => {
    return CryptoJS.AES.decrypt(password, process.env.PASSWORD_SECRET_KEY)
}

module.exports = { hash, unhash }