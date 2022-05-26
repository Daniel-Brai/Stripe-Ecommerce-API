// Dependencies
const express = require('express');
const router = express.Router()
const { getUserOrder, getUsersOrders, getMonthlyIncome, createOrder, updateOrder, deleteOrder } = require('../controllers/orderControllers')
const { verifyToken, verifyTokenAndAuthorize, verifyTokenAndAuthorizeAdmin } = require('../utils/verifier')

router.get('/', verifyTokenAndAuthorizeAdmin, getUsersOrders)
router.get('/find/:id', verifyTokenAndAuthorize, getUserOrder)
router.get('/income', verifyTokenAndAuthorizeAdmin, getMonthlyIncome)
router.post('/', verifyToken, createOrder)
router.put('/:id', verifyTokenAndAuthorizeAdmin, updateOrder) 
router.delete('/:id', verifyTokenAndAuthorizeAdmin, deleteOrder)


module.exports = router