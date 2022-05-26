// Dependencies
const Order = require('../models/order')

// GET USER ORDER
const getUserOrder = async (req, res) => { 
    try {
        // id is the user's id
        const orders = await Order.findOne({id : req.params.id})
        res.status(200).json({"Info - Order": orders})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// GET ALL USERS ORDER
const getUsersOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json({"All Users Order": orders})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }}},
            {
                $project: { 
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            { 
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])

        res.status(200).json({ "Income Statistics": income })
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// CREATE A USER ORDER
const createOrder = async (req, res) => { 
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json({"Order": savedOrder})
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong - ${error}`})
    }
}

// UPDATE ORDER
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({ "Info - Updated Order": updatedOrder })
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong! - ${error}` })
    }
}

// DELETE A CART
const deleteOrder = async (req, res) => { 
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({"Message": "Order deleted successfully!"})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}


module.exports = { getUserOrder, getUsersOrders, getMonthlyIncome, createOrder, updateOrder, deleteOrder }