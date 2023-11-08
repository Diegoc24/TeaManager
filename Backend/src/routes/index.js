const {Router} = require("express")
const user = require("../models/user")
const routerUser = require("../routes/users")
const routerIndex = Router()

routerIndex.use("/user", routerUser)

module.exports = routerIndex;