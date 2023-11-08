const express = require("express")
const server = express()
const morgan = require("morgan")
const cors = require("cors")
const routerIndex = require("./routes/index")
server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(morgan("dev"))

server.use(cors({
    origin: "*"
}))

server.use("", routerIndex)

module.exports = server;