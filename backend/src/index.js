const express = require("express")
const cors = require("cors")
const authRouters = require("./routes/auth.route.js")
const userRouters = require("./routes/user.route.js")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res) => {
    return res.status(200).send({message:"Welcome"})
})

app.use("/auth",authRouters)

app.use("/api/users",userRouters)

module.exports=app
