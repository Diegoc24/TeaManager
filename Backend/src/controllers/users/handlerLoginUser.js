const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const user = require("../../models/user")
const generateAccessToken = require("../../utils/generateAccessToken")
const handlerLoginUser = async (req, res) => {


const {password, email} = req.body
console.log(req.body);
    if(!email === undefined || !password === undefined){
        throw new Error("The email or password was not sent correctly")
    }

    const comprobation = await user.findOne({
        where: {
            email
        }
    })

    if(!comprobation){
       throw new Error("The email or password was not sent correctly")
    }
    
    
      
    const comPass = await bcrypt.compare(password, comprobation.dataValues.password)
    
    if(!comPass) throw new Error("The email or password was not sent correctly")
    
    const valuesSession = {
        id: comprobation.dataValues.id,
        name: comprobation.dataValues.name,
        last_name: comprobation.dataValues.last_name,
        email: comprobation.dataValues.email,
        profile_picture: comprobation.dataValues.profile_picture
    }

    const token = generateAccessToken(valuesSession);

res.header("authorization", `Bearer ${token}`).json({
    message: "usuario autenticado",
    token: token
});
    
   
   
}

module.exports = handlerLoginUser;