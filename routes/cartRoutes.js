const express = require('express');
const router = express.Router()
const { getUserCart, createCart, updateCart, deleteCart, getUsersCart } = require('../controllers/cartControllers')
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAuthorizeAdmin } =  require('../utils/verifier')

router.get('/', verifyTokenAndAuthorizeAdmin, getUsersCart)
router.get('/find/:id', verifyTokenAndAuthorize, getUserCart)
router.post('/', verifyToken, createCart)
router.put('/:id', verifyTokenAndAuthorize, updateCart) 
router.delete('/:id', verifyTokenAndAuthorize, deleteCart)

module.exports = router