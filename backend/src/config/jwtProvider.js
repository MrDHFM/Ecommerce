const jwt = require('jsonwebtoken')

const SECRETE_KEY = "jaiBabu"

const generateToken = (userId) => {
    const token = jwt.sign({userId},SECRETE_KEY,{expiresIn:"48h"})
    return token
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token,SECRETE_KEY)
    return decodedToken.userId
}

module.exports = {generateToken,getUserIdFromToken}