// Dependencies 
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// read environment variables
dotenv.config({path: './.env'})

const verifyToken = (req, res, next) => { 
    const authHeader = req.headers.token 

    if (authHeader) { 
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { 
            if (err) {
                res.status(403).json({"Error": "Token is not valid!"})
            } 
            req.user = user
            next()
        })
    } else { 
        return res.status(401).json({"Error": "Authenication error!"})
    }
}

const verifyTokenAndAuthorize = (req, res, next) => { 
    verifyToken( req, res, () => { 
        if ( req.user.id === req.params.id || req.user.isAdmin ) { 
            next()
        } else { 
            res.status(403).json({"Message": "You are not authorized!" })
        }
    })
}

const verifyTokenAndAuthorizeAdmin = (req, res, next) => { 
    verifyToken( req, res, () => { 
        if ( req.user.id === req.params.id || req.user.isAdmin ) { 
            next()
        } else { 
            res.status(403).json({"Message": "You are not authorized!" })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAuthorizeAdmin }