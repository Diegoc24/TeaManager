const {Router} = require("express")
const user = require("../models/user")
const multer = require("multer")
const routerUser = Router()
const path = require("path")
const handlerRegisterUser = require("../controllers/users/handlerRegisterUser")
const handlerLoginUser = require("../controllers/users/handlerLoginUser")
const handlerModificationUser = require("../controllers/users/handlerModificationUser")

//"Multer configuration is performed."
const dir_last = path.resolve(__dirname, "../");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir_last + "../../static/image");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });

routerUser.use(upload.single("profile_picture"));

routerUser.post("/register", async (req, res)=>{
    try {
        const respon = await handlerRegisterUser(req.body)
        res.status(200).json(respon)
    } catch (error) {
        
        res.status(404).json(error.message)
    }
    
   
    
})
routerUser.post("/login", async (req, res)=>{
    try {
        const login = await handlerLoginUser(req, res)
       
        res.status(200).json(login)
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
    }
})

routerUser.get("/auth", async(req, res)=>{
   
})

routerUser.put("/modification", async (req,res)=>{
    try {
        const response = await handlerModificationUser(req)
        
        res.status(200).json(response)
    } catch (error) {
        
        res.status(404).json(error.message)
    }
})



module.exports = routerUser;