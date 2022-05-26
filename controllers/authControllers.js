// Dependencies 
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/user')
const { hash, unhash } = require('../utils/security')

// Read environment variables
dotenv.config({path: './.env'})

// Register a new user controllers for the auth route
const register = async ( req, res ) => { 

    const newUser = new User({
        username: req.body.username,
        email: req.body.email, 
        password: hash(req.body.password).toString()
    })
    try {
        await newUser.save()
        res.status(201).json({"Message": "User saved successfully!"})
    } catch (error) {
        res.status(500).json({"Message": `Unable to save new user, ${error}`})
    }
}

// Login a new user controllers for the auth router 
const login = async (req, res) => {
    try {
        // var { password } = req.body
        const user = await User.findOne({username: req.body.username})
        const { password, ...others } = user._doc

        var _password = unhash(password).toString(CryptoJS.enc.Utf8)
        
        // checks if the user exists and whether the password is correct else responds with an error
        if (!user) { 
            res.status(404).json({"Error": "Invalid Credentials, try again"})
        }
        if ( _password !== req.body.password ) { 
            res.status(404).json({"Error": "Invalid Credentials, try again"})
        }

        const accessToken = jwt.sign({ 
            id: user._id, 
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "1d"}
        )
       
        const maxAge = 24 * 60 * 60
        
        res.cookie('token', accessToken, { maxAge: maxAge * 1000 })

        res.status(200).json({
            "Message": "User login successful!",
            "Info": others,
            "AccessToken": accessToken
        })

    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! Try again`})
    }
}

const logout = (req, res) => {
    res.cookie("token", "", { maxAge: "1" })

    res.status(200).json({ 
        "Message": "User loogged out successfully!"
    })
}

module.exports = { register, login, logout }