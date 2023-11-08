const user = require("../../models/user")

const handlerGetUser = async () =>{
    const userAll = await user.findAll()
    return userAll
}

module.exports = handlerGetUser