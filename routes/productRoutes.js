// Dependencies
const express = require('express');
const router = express.Router()
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productControllers')
const { verifyTokenAndAuthorizeAdmin } = require('../utils/verifier')

router.get('/', getProducts)
router.get('/find/:id', getProduct)
router.post('/', verifyTokenAndAuthorizeAdmin, createProduct)
router.put('/:id', verifyTokenAndAuthorizeAdmin, updateProduct)
router.delete('/:id', verifyTokenAndAuthorizeAdmin, deleteProduct)

module.exports = router
