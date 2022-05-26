// Dependencies
const express = require('express');
const router = express.Router()
const { getUser , getUserStats, getUsers ,updateUser, deleteUser } = require('../controllers/userControllers')
const { verifyTokenAndAuthorize, verifyTokenAndAuthorizeAdmin } = require('../utils/verifier')

router.get('/', verifyTokenAndAuthorizeAdmin, getUsers )
router.get('/stats', verifyTokenAndAuthorizeAdmin, getUserStats)
router.get('/find/:id', verifyTokenAndAuthorizeAdmin, getUser)
router.put("/:id", verifyTokenAndAuthorize, updateUser)
router.delete('/:id', verifyTokenAndAuthorize, deleteUser)

module.exports = router