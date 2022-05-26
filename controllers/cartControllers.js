// Dependencies
const Cart= require('../models/cart')

// GET USER CART
const getUserCart = async (req, res) => { 
    try {
        // id is the user's id
        const cart = await Cart.findOne({id : req.params.id})
        res.status(200).json({"Info - Cart": cart})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// GET ALL USERS CART 
const getUsersCart = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json({"Carts": carts})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// CREATE A CART
const createCart = async (req, res) => { 
    const newCart = new Product(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json({"Cart": savedCart})
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong - ${error}`})
    }
}

// UPDATE A CART 
const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({ "Info - Updated Cart": updatedCart })
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong! - ${error}` })
    }
}

// DELETE A CART
const deleteCart = async (req, res) => { 
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({"Message": "Cart deleted successfully!"})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

module.exports = { getUserCart, getUsersCart, createCart, updateCart, deleteCart }