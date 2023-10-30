const cart = require('../models/cart.model.js')

const createCart = async(user) => {
    try {
        const Cart = new cart({user})
        const createdCart = await Cart.save();
        return createCart; 
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {createCart}