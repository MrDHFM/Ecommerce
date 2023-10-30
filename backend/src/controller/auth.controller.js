const userService = require("../services/user.service.js")
const jwtProvider = require("../config/jwtProvider.js")
const cartService = require("../services/cart.service.js")
const bcrypt = require("bcrypt")

const signUp = async (req,res) => {
    try {

        const user = await userService.createUser(req.body)

        await cartService.createCart(user)

        return res.status(200).send({message:"User created successfully"})
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const login = async (req,res) => {
    try {

        const {email,password} = req.body

        const user = await userService.getUserByEmail(email)

        if(!user){
            return res.status(404).send({message:"User not found with email :",email})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)

if(!isPasswordValid){
    res.status(401).send({message:"Invalid Password"})
}
const jwt = jwtProvider.generateToken(user._id)
return res.status(200).send({jwt,message:"Login Success"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {signUp,login}