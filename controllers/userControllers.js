const { hash } = require('../utils/security')
const User = require('../models/user')

// GET A USER BY ID
const getUser = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc

        res.status(200).json({"Message": others})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// GET A USER STATS
const getUserStats = async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear }}},
            {
                $project: { 
                    month: { $month: "$createdAt" }
                }
            },
            { 
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.status(200).json({ "User Statistics": data })
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! -${error}`})
    }
}

//  GET ALL USERS 
const getUsers = async (req, res) => { 
    const query = req.query.new
    try {
        const users = query ? 
            await User.find().sort({ _id: -1}).limit(1) : 
            await User.find()

        res.status(200).json({"Users": users})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// UPDATE A USER BY ID
const updateUser = async (req, res) => {
    var { password } = req.body

    if (password) {
        password = hash(password).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({ "Info": updatedUser })
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong! - ${error}` })
    }
}

// DELETE A USER BY ID
const deleteUser = async (req, res) => { 
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({"Message": "User deleted successfully!"})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}


module.exports = { getUser, getUsers, getUserStats, updateUser, deleteUser }