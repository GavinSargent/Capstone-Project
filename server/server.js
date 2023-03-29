const express = reuire("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const {SERVER_PORT} = process.env

const{

} = require('./controller')






app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`))