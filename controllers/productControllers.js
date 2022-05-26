// Dependencies
const Product = require('../models/product')

// GET PRODUCT
const getProduct = async ( req, res ) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({"Info - Product": product})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// GET ALL PRODUCTS 
const getProducts = async (req, res) => { 
    const newQuery = req.query.new
    const categoryQuery = req.query.category

    try {
        let products;

        if (newQuery) { 
            products = await Product.find().sort({ createdAt: -1}).limit(1)
        } else if (categoryQuery) {
            products = await Product.find({ 
                categories : {
                    $in: [categoryQuery]
                }
            })
        } else { 
            products = await Product.find()
        }
    
        res.status(200).json({"Products": products})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

// CREATE A PRODUCT
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json({"Product": savedProduct})
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong - ${error}`})
    }
}

// UPDATE A PRODUCT
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({ "Info - Updated Product": updatedProduct })
    } catch (error) {
        res.status(500).json({ "Error": `Something went wrong! - ${error}` })
    }
}

// DELETE A PRODUCT 
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({"Message": "Product deleted successfully!"})
    } catch (error) {
        res.status(500).json({"Error": `Something went wrong! - ${error}`})
    }
}

module.exports = { getProduct, getProducts, createProduct, updateProduct, deleteProduct }