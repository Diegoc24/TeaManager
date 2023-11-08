const user = require("../../models/user")
const bcrypt = require("bcrypt")
const handlerRegisterUser = async (req) =>{

    const {name, last_name, password, email, phone, address, is_teacher } = req
    console.log(req);
    if(!name || !last_name || !password || !email || !phone || !address || !is_teacher){
        const respo = {message: "One of the required values ​​was not sent"}
        return respo
    }
    const comprob = await user.findAll({where: {email: email}})
    
    if(comprob.length !== 0){
       throw new Error("User is exist")
    }
    let hash
    try {
      hash = await bcrypt.hash(password, 10);
            
    } catch (error) {
        console.log(`Password Error: ${error}`);
    }
   
    const createUser = await user.create({
        name,
        last_name,
        password: hash,
        email,
        address,
        phone,
        is_teacher
       
    })
    
    return createUser
    
}

module.exports = handlerRegisterUser;