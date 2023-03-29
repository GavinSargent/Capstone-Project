require('dotenv').config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const{
    getMyQuotes

} = require('./controller')

// Dev
app.post(`/seed`, seed)

// User
app.get(`http://localhost:${SERVER_PORT}/quotes`, getMyQuotes)




app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`))