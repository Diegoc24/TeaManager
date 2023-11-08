const jwt = require("jsonwebtoken")


const handlerAutorization = (req) =>{

    try {
        const authorization = req.get("authorization")
        
        return authorization
    } catch (error) {
        return error
    }

}

module.exports = handlerAutorization;