const express = reuire("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
