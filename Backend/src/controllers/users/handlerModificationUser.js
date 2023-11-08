const user = require("../../models/user")
const path = require("path")


  
const handlerModificationUser = async (req) =>{

    const {originalname} = req.file
    const {id, email, name, last_name} = req.body
    const users = await user.findAll({
        where:{
            id,
            email,
            name,
            last_name
        }
    })
    
    if(users.length === 0) throw new Error("access denied")
    return "susses"

}

module.exports = handlerModificationUser

