const jwt = require("jsonwebtoken")
require("dotenv").config()
function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "2m"})
}

module.exports = generateAccessToken;
