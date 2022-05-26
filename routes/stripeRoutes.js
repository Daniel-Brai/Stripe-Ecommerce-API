// Dependencies
const express = require('express')
const router = express.Router()
const { chargeCustomer } = require('../utils/stripe')

// routes
router.post('/pay', chargeCustomer)

module.exports = router
